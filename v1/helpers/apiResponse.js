exports.successResponse = function (res, msg, data) {
    var data = {
        status: true,
        message: msg,
        data,
    };
    return res.status(200).json(data);
};

exports.successResponseWithData = function (res, msg, data) {
    var resData = {
        status: true,
        message: msg,
        data,
    };
    return res.status(200).json(resData);
};

exports.errorResponse = function (res, msg, data) {
    var data = {
        status: false,
        message: msg,
        data,
    };
    return res.status(200).json(data);
};

exports.internalServerError = function (res, msg, data) {
    var data = {
        status: false,
        message: msg,
        data,
    };
    return res.status(500).json(data);
};

exports.notFoundResponse = function (res, msg, data) {
    var data = {
        status: false,
        message: msg,
        data,
    };
    return res.status(404).json(data);
};

exports.validationErrorWithData = function (res, msg, data) {
    var resData = {
        status: false,
        message: msg,
        data,
    };
    return res.status(200).json(resData);
};

exports.accessTokenExpired = function (res, msg, data) {
    var data = {
        status: false,
        message: msg,
        data,
    };
    return res.status(401).json(data);
};

exports.unauthorizedResponse = function (res, msg) {
    var data = {
        status: false,
        message: msg,
    };
    return res.status(403).json(data);
};