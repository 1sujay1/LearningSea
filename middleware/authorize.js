
const jwtHelper = require("../v1/utils/jwtHelper");
const response = require('./responseHandler')
const apiResponse = require('../v1/helpers/apiResponse');

const validateSchema = async (req, res, next, schema) => {
    try {
        await schema.validateAsync(req.body, { convert: false });
    } catch (err) {
        if (err.details[0].type === 'object.allowUnknown') {
            const message = err.details[0].message.split(/(?=[A-Z])/u).join(' ');
            return res.status(500).send({ message });
        }
        const message = err.details[0].context.label;
        return apiResponse.validationErrorWithData(res, [message], []);
    }
    return next();
};


// eslint-disable-next-line max-lines-per-function
const verifyToken = async function (req, res, next, schema, accessRole) {

    if (!req.headers.authorization) {
        apiResponse.unauthorizedResponse(res, [response.responsetxt[1002]], []);
    }
    const authorizationHeader = req.headers.authorization;
    let data;

    if (authorizationHeader) {
        const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
        try {
            data = jwtHelper.verifyAccessToken(token);
            req.decoded = data;
          
                console.log(accessRole, '----roles---', data.type);
                if (accessRole && accessRole.length !== 0 && !accessRole.includes(data.type)) {
                    console.log('--Mid-- Access Denied --', data.type, '\n');
                    apiResponse.internalServerError(res, [response.responsetxt[1002]], []);
                } else {
                    if (schema) {
                        return validateSchema(req, res, next, schema);
                    }
                    next();
                }
          
        } catch (err) {
            console.log(err);
            apiResponse.accessTokenExpired(res, [err.message], []);
            return
        }
    } else {
        apiResponse.errorResponse(res, [response.responsetxt[1002]], []);
    }
};

module.exports.validate = function (req, res, next, schema, tokenVerify, accessRole) {
    tokenVerify !== false ? verifyToken(req, res, next, schema, accessRole) : schema ? validateSchema(req, res, next, schema) : next();
};
