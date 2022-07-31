const bcrypt = require("bcryptjs");
const db = require("../../models");
const ROLES = require("../../config/config");
const UserModel = db.user;
const FCMUserModel = db.fcmUser;
const MobileOTPModel = db.MobileOTP;
const subscriptionModel = db.subscription;
const apiResponse = require('../helpers/apiResponse');
const { redisAndToken, renewTokesAndRedis } = require("../utils/redis_token");
const response = require('../../middleware/responseHandler')



const login = async function (req, res, next) {

    //Convert to lowercase
    if (req.body.email)
        req.body.email = req.body.email.toLowerCase().trim();

    const { email, password, fcm_token, device_id, ip } = req.body;

    try {

        await UserModel.findOne({
            email: email

        }).exec(async (err, user) => {

            if (!device_id && !ip) {
                apiResponse.validationErrorWithData(res, [response.responsetxt[1006]], []);
                return;
            }

            if (err) {
                apiResponse.validationErrorWithData(res, [err], []);
                return;
            }

            if (!user) {
                apiResponse.validationErrorWithData(res, [response.responsetxt[1005]], []);
                return;
            }

            if (user && !user.password) {
                apiResponse.validationErrorWithData(res, [response.responsetxt[1001]], []);
                return;
            }

            var passwordIsValid = bcrypt.compareSync(
                password,
                user.password
            );

            if (!passwordIsValid) {
                apiResponse.validationErrorWithData(res, [response.responsetxt[1001]], []);
                return;
            }

            if (user) {
                if (device_id && fcm_token) {
                    //Delete FCM Token on login
                    await FCMUserModel.deleteOne({ user_id: user.id });

                    await FCMUserModel.create({ user_id: user.id, fcm_token, device_id });
                }

                const plan = await subscriptionModel.findOne({ user_id: user.id }, { plan_id: 1, start_date: 1, end_date: 1 });
                let userType = user.roles[0];

                const tokens = await redisAndToken(user.id, device_id, ip, userType);

                let data = { tokens };
                data.user = { ...user._doc };
                data.user.plan = plan;
                delete data.user.password;

                apiResponse.successResponseWithData(res, [], [data]);
            }

        });

    } catch (err) {
        apiResponse.internalServerError(res, [err.message], []);
    }
}

const logout = async function (req, res, next) {
    const { user_id, device_id, ip } = req.body;
    try {
        if (!device_id && !ip) {
            apiResponse.validationErrorWithData(res, ["Invalid device"], []);
            return;
        }

        return res.json({
            status: true,
            msg: ["Logout Successfull"]
        });
    } catch (err) {
        apiResponse.internalServerError(res, [err.message], []);
    }
}

const renewAccessToken = async (req, res) => {
    try {
        const { decoded: { user_id, device_id, type, ip }, body: { token } } = req;

        const tokens = await renewTokesAndRedis(user_id, device_id, ip, type, token);
        if (tokens) {
            const data = { ...tokens };
            apiResponse.successResponse(res, [], data);
        }
        else {
            apiResponse.unauthorizedResponse(res, [response.responsetxt[1002]], {});
        }
    }
    catch (e) {
        apiResponse.internalServerError(res, [e.message], {});
    }


}

const signup = async function (req, res, next) {

    try {

        //Convert to lowercase
        if (req.body.email)
            req.body.email = req.body.email.toLowerCase().trim();

        const { name, email, mobile, password, roles, initialized, mobileVerified } = req.body;

        const arrayRoles = roles && roles.split(",") || [ROLES.USER_ROLES.CUSTOMER];

        // const newUser = new UserModel(user);

        const existsUser = await UserModel.findOne({
            $or: [{ email: email }, { mobile: mobile }]
        });


        if (existsUser) {
            res.status(200).json({ "status": false, message: [response.responsetxt[1007]], data: [] });
            return;
        }
        const user = {
            name,
            email: email,
            mobile,
            initialized: initialized || true,
            mobileVerified: mobileVerified || false,
            'password': bcrypt.hashSync(password, 8),
            'roles': arrayRoles
        }
        const createdUser = await UserModel.create(user);

        if (createdUser) {

            login(req, res, next);
        } else {
            apiResponse.errorResponse(res, [response.responsetxt[1003]], []);
        }

    } catch (err) {
        return next(err)
    }
}


const checkMobileNumber = async function (req, res, next) {

    const { mobile } = req.body;

    try {

        if (!mobile) {
            return res.json({ status: false, data: [], message: [response.responsetxt[1011]] });
        }

        const user = await UserModel.findOne({ mobile });


        if (!user) {
            return res.json({ status: false, data: {}, message: [response.responsetxt[1017]] });
        }

        if (user) {
            res.json({ status: true, data: {}, message: [] });
        }

    }
    catch (err) {
        return next(err)
    }
}

const testRun = async function (req, res, next) {

    try {
        return res.json({
            status: true,
            msg: ["Running ..."]
        })

    }
    catch (err) {
        return next(err)
    }
}

const profileUpdate = async function (req, res, next) {

    const { password, name, img_url } = req.body;

    try {

        const payload = req.decoded;

        var updateQuery = {};

        if (name)
            updateQuery.name = name;
        if (img_url)
            updateQuery.img_url = img_url;
        if (password)
            updateQuery.password = bcrypt.hashSync(password, 8);

        const updatePassword = await UserModel.updateOne(
            { _id: payload.user_id },
            updateQuery
        );

        if (updatePassword) {
            res.json({ status: true, data: [], message: [response.responsetxt[1015]] });
        } else {
            res.json({ status: false, data: [], message: [response.responsetxt[1016]] });
        }

    }
    catch (err) {
        return next(err)
    }
}


module.exports = {
    login,
    logout,
    signup,
    checkMobileNumber,
    profileUpdate,
    renewAccessToken,
    testRun
}