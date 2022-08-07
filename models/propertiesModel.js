const mongoose = require("mongoose");

const PropertiesSchema = mongoose.Schema({
    name: { type: String, required: true },
    builder: { type: String, required: true },
    address: { type: String },
    addressHeading: String ,
    description: String,
    shortDescription: String,
    RERA: String,
    projectArea: String,
    size: String,
    flat: String,
    avgPrice: String,
    totalBlocks: String,
    propertyVideo: String,
    status: {type:String,enum: ['FEATURED', 'LAUNCHED'], default: "LAUNCHED"},
    propertyStatus: {type:String,enum: ['SALE', 'RENT','BUY','COMMERCIAL_SPACE']},
    propertyType: {type:String,enum: ['APARTMENT','VILLAS','COMMERCIAL','INDIVIDUAL_HOME','CO_WORK_SPACE']},
    propertyLocation: String,
    propertyBHK: {type:String},
    isTopProperty: {type:Boolean,default:false},
    isExclusiveProperty: {type:Boolean,default:false},
    isPopularProperty: {type:Boolean,default:false},
    propertyAmenities: [String],
    isDeleted: {type:Boolean,default:false},
    img_url: [String]
},{
    timestamps:true
});

module.exports = mongoose.model('properties', PropertiesSchema);
