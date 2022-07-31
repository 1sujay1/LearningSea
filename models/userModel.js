const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    mobile: { type: String, unique: true },
    password: String,
    provider: { type: String, enum: ['HOMEZBAY', 'GOOGLE', 'APPLE'], default: "HOMEZBAY" },
    roles: [String],
    initialized: Boolean,
    apple_id: String,
    mobileVerified: Boolean,
    img_url: String
},{
    timestamps:true
});

module.exports = mongoose.model('users', UsersSchema);
