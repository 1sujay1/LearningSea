

const jwt = require('jsonwebtoken');
const accessTokenExpiresIn = process.env.ACCESS_TOKEN_EXPIRE_TIME;
const refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRE_TIME;

const signAccessToken = (payload) => {
    let privateKey="HOMEZKEY_SECRET";
    return jwt.sign(payload, privateKey, { algorithm: 'HS256', expiresIn: accessTokenExpiresIn });
}

const signRefreshToken = (payload) => {
    let privateKey="HOMEZKEY_SECRET";
    return jwt.sign(payload, privateKey, { algorithm: 'HS256', expiresIn: refreshTokenExpiresIn });
}

const verifyAccessToken = (token) => {
    let privateKey="HOMEZKEY_SECRET";
    return jwt.verify(token, privateKey);

}

const verifyRefreshToken = (token) => {
    let privateKey="HOMEZKEY_SECRET";
    return jwt.verify(token, privateKey);
}


module.exports = {
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}