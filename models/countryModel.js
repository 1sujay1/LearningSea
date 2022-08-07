const mongoose = require("mongoose");

const CountrySchema = mongoose.model(
    "country",
    new mongoose.Schema({
        name: String,
        isDeleted: {type:Boolean,default:false},
    },{timestamps:true}),
    "country"
);

module.exports = CountrySchema;
