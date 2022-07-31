const mongoose = require("mongoose");

const FCMUser = mongoose.model(
    "FCM_USER",
    new mongoose.Schema({
        user_id: String,
        fcm_token: String,
        device_id: String,
    }),
    "fcm_user"
);

module.exports = FCMUser;
