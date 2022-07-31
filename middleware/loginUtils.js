const jwtHelper = require("../v1/utils/jwtHelper");
const apiResponse = require('../v1/helpers/apiResponse')

module.exports = {
    validateAccessToken: async (req, res, next) => {
        const authorizationHeader = req.headers.authorization;
        let data;

        if (authorizationHeader) {
            const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
            console.log("validateAccessToken", token);
            try {
                data = jwtHelper.verifyAccessToken(token);
                req.decoded = data;

                console.log(data);
                
                next()
            } catch (err) {
                console.log(err);
                apiResponse.accessTokenExpired(res, [err.message], []);
                return
            }
        } else {
            apiResponse.unauthorizedResponse(res, [`Authentication error. Token required.`], []);
            return;
        }
    },
    validateRefreshToken: async (req, res, next) => {

        const { token } = req.body;
        console.log("validateRefreshToken", token);
        if (token) {
            try {
                data = jwtHelper.verifyRefreshToken(token);
                req.decoded = data;
                next();
            } catch (err) {
                console.log(err);
                apiResponse.unauthorizedResponse(res, [err.message], []);
                return
            }
        } else {
            apiResponse.unauthorizedResponse(res, [`Authentication error. Token required.`], []);
            return;
        }
    },
};