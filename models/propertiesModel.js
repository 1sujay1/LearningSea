const mongoose = require("mongoose");

const PropertiesSchema = mongoose.Schema({
    name: { type: String, required: true },
    builder: { type: String, required: true },
    address: { type: String },
    addressHeading: String ,
    countryCode: String ,
    countryName: String ,
    city: String ,
    description: String,
    shortDescription: String,
    RERA: String,
    propertyAreaLen: String,
    propertyAreaBre: String,
    propertyAreaSqFt: String,
    propertyAreaAcre: String,
    flat_or_bhk: [String],
    avgPricePerSqft: String,
    totalPriceSQft: Number,
    quotePrice: Number,
    totalBlocks: String,
    status: {type:String,enum: ['FEATURED', 'LAUNCHED',"SOLD OUT"], default: "LAUNCHED"},
    propertyStatus: {type:String,enum: ['SALE', 'RENT','BUY']},
    propertyType: {type:String,enum: ['APARTMENT','VILLAS','INDIVIDUAL_HOME','COMMERCIAL_SPACE']},
    isTopProperty: {type:Boolean,default:true},
    isExclusiveProperty: {type:Boolean,default:false},
    isPopularProperty: {type:Boolean,default:true},
    isCommercialProperty: {type:Boolean,default:false},
    propertyAmenities: [String],
    isDeleted: {type:Boolean,default:false},
    page_url:String,
    mapLink:String,
    img_url: [String],
    propertyVideo: [String]
},{
    timestamps:true
});

module.exports = mongoose.model('properties', PropertiesSchema);
