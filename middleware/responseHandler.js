
const messageCodes = {
    1000: 'Access Denied : Invalid data provided',
    1001: 'Invalid user password.',
    1002: 'Bad Request : Invalid data provided.',
    1003: 'User not created.',
    1004: 'The email or password do not match.',
    1005: 'User not found',
    1006: 'Cannot identify device',
    1007: 'Email or Mobile number already exists',
    1008: 'Something went wrong, unable to send email.',
    1009: 'Kindly verify your mobile number.',
    1010: 'Invalid mobile number.',
    1011: 'Invalid Mobile OTP',
    1012: 'Mobile number verified successfully',
    1013: 'Mobile OTP sent successfully.',
    1014: 'Mobile number already registered',
    1015: 'Updated successfully',
    1016: 'Update failed.',
    1017: 'No account is found with this mobile number.',
    1018: 'Token is invalid',
    1019: 'Bad Request : Validation failed.',
};

module.exports.responsetxt = messageCodes;

module.exports.success = function (data, message, res) {
    return res.status(200).json({
        data,
        message
    });
};

module.exports.created = function (data, message, res) {
    return res.status(201).json({
        data,
        message
    });
};

module.exports.notFound = function (message, res) {
    return res.status(500).json({
        message
    });
};

module.exports.badRequest = function (message, res) {
    return res.status(400).json({
        message
    });
};

module.exports.unauthorized = function (errmessage, res) {
    return res.status(401).json({
        message: errmessage
    });
};

module.exports.forbidden = function (message, res) {
    return res.status(403).json({
        message
    });
};


