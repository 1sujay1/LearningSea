
const jwtHelper = require("../utils/jwtHelper");
const redisAndToken = async (user_id, device_id, ip, type) => {
    let payload = { user_id, device_id, ip, type };
    const accessToken =await jwtHelper.signAccessToken(payload);
    const refreshToken =await jwtHelper.signRefreshToken(payload);

    console.log(payload);
    const tokens = {
        accessToken,
        refreshToken,
    };
    return tokens;

}


const renewTokesAndRedis = async (user_id, device_id, ip, type, token) => {
    const accessToken = jwtHelper.signAccessToken({ user_id, device_id, ip, type });
    const refreshToken = jwtHelper.signRefreshToken({ user_id, device_id, ip, type });
    const data = { accessToken, refreshToken };
    return data;
}


module.exports = {
    redisAndToken,
    renewTokesAndRedis
}