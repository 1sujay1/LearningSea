const mongoose = require("mongoose");

const MobileOTP = mongoose.model(
    "MobileOTP",
    new mongoose.Schema({
        mobile: Number,
        isVerified: Boolean,
    },{timestamps:true}),
    "mobile_otp"
);

module.exports = MobileOTP;
