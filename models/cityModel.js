const mongoose = require("mongoose");

const CitySchema = mongoose.model(
    "city",
    new mongoose.Schema({
        name: String,
        country:String,
        isDeleted: {type:Boolean,default:false},
    },{timestamps:true}),
    "city"
);

module.exports = CitySchema;
