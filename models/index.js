const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./userModel");
db.MobileOTP = require('./otpModel');
db.subscription = require('./subscriptionModel');
db.fcmUser = require('./fcmModel');
db.properties = require('./propertiesModel');
db.country = require('./countryModel');
db.city = require('./cityModel');

module.exports = db;