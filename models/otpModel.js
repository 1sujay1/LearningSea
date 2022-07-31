const mongoose = require("mongoose");

const MobileOTP = mongoose.model(
    "MobileOTP",
    new mongoose.Schema({
        mobile: Number,
        isVerified: Boolean,
    }),
    "mobile_otp"
);

module.exports = MobileOTP;
