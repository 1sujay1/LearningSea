const db = require("../../models");
const ROLES = require("../../config/config");
const UserModel = db.user;
const FCMUserModel = db.fcmUser;
const subscriptionModel = db.subscription;
const propertiesModel = db.properties;
const apiResponse = require('../helpers/apiResponse');
const response = require('../../middleware/responseHandler')
var fs = require('fs');
const path = require("path");

const createProperties = async function (req, res) {
    // const { name, builder, address, addressHeading, description, shortDescription, RERA, projectArea, size, flat, avgPrice, totalBlocks, propertyVideo, status, propertyLocation, propertyStatus, propertyType, propertyBHK, isTopProperty, isExclusiveProperty, isPopularProperty, propertyAmenities, img_url } = req.body;
    let {
        name,
        builder,
        address,
        addressHeading,
        country,
        city,
        description,
        RERA,
        propertyAreaLen,
        propertyAreaBre,
        propertyAreaSqFt,
        propertyAreaAcre,
        flat_or_bhk,
        avgPricePerSqft,
        totalPriceSQft,
        quotePrice,
        totalBlocks,
        status,
        propertyStatus,
        propertyType,
        p_category,
        propertyAmenities,
        img_url,
        propertyVideo,
        page_url,
        mapLink
    } =req.body
let propCat = req.body.p_category
    if(propCat.length){
        if(propCat.includes("POPULAR")){
            req.body.isPopularProperty=true
        }
        if(propCat.includes("EXCLUSIVE")){
            req.body.isExclusiveProperty=true
        }
        if(propCat.includes("TOP")){
            req.body.isTopProperty=true
        }
        if(propCat.includes("COMMERCIAL")){
            req.body.isCommercialProperty=true
        }
    }
delete req.body.p_category;
    try {
        let createResp = await propertiesModel.create(req.body)
        return res.json({
            status: true,
            msg: ["Property created successfully"],
            data: createResp
        });
    } catch (err) {
        apiResponse.internalServerError(res, [err.message], []);
    }
}
const deleteProperties = async function (req, res) {
    const { _id } = req.body;
    try {
        let deleteResp = await propertiesModel.updateOne({_id},{isDeleted:true})
        return res.json({
            status: true,
            msg: ["Property deleted successfully"],
            data: deleteResp
        });
    } catch (err) {
        apiResponse.internalServerError(res, [err.message], []);
    }
}
const getProperties = async function (req, res) {
    await propertiesModel.updateOne({_id:"6318c1440c3c9e15f31e9819"},{propertyVideo:["https://www.youtube.com/embed/vggW2Lss92w"]})
    // await propertiesModel.updateOne({_id:"6318c1440c3c9e15f31e9819"},{page_url:"sattva-aeropolis"})
    // let resp = await propertiesModel.find({page_url:"sattva-aeropolis"})
    console.log("reqbody",req.body);
    console.log("reqQuery",req.query);
    let { search, status, propertyStatus, propertyType, propertyLocation, propertyBHK, avgPrice } = req.body;
   
    try {
        let filter = { isDeleted: false }
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { shortDescription: { $regex: search, $options: "i" } },
                { status: { $regex: search, $options: "i" } },
                { propertyStatus: { $regex: search, $options: "i" } },
                { propertyType: { $regex: search, $options: "i" } },
                { propertyLocation: { $regex: search, $options: "i" } },
                { address: { $regex: search, $options: "i" } },
            ]
        } else {
            if (status) filter.status = status;
            if (propertyStatus) filter.propertyStatus = propertyStatus;
            if (propertyType) filter.propertyType = propertyType;
            if (propertyLocation) filter.propertyLocation = propertyLocation;
            if (propertyBHK) filter.propertyBHK = propertyBHK;
            if (req.query.page_url) filter.page_url = req.query.page_url;
            if (avgPrice) {
                filter.avgPrice = { $lte: avgPrice };
            }
        }
        console.log("filter",filter);
        let foundResp = await propertiesModel.find(filter);
        return res.json({
            status: true,
            msg: ["Property found successfully"],
            data: foundResp
        });
    } catch (err) {
        apiResponse.internalServerError(res, [err.message], []);
    }
}
const updateProperties = async function (req, res) {
    const { _id, name, builder, address, addressHeading, description, shortDescription, RERA, projectArea, size, flat, avgPrice, totalBlocks, propertyVideo, status, propertyLocation, propertyStatus, propertyType, propertyBHK, isTopProperty, isExclusiveProperty, isPopularProperty, propertyAmenities, img_url } = req.body;
    try {
        let postData = {}
        if (name) { postData.name = name }
        if (builder) { postData.builder = builder }
        if (address) { postData.address = address }
        if (addressHeading) { postData.addressHeading = addressHeading }
        if (description) { postData.description = description }
        if (shortDescription) { postData.shortDescription = shortDescription }
        if (RERA) { postData.RERA = RERA }
        if (projectArea) { postData.projectArea = projectArea }
        if (size) { postData.size = size }
        if (flat) { postData.flat = flat }
        if (avgPrice) { postData.avgPrice = avgPrice }
        if (totalBlocks) { postData.totalBlocks = totalBlocks }
        if (propertyVideo) { postData.propertyVideo = propertyVideo }
        if (status) { postData.status = status }
        if (propertyLocation) { postData.propertyLocation = propertyLocation }
        if (propertyStatus) { postData.propertyStatus = propertyStatus }
        if (propertyType) { postData.propertyType = propertyType }
        if (propertyBHK) { postData.propertyBHK = propertyBHK }
        if (isTopProperty) { postData.isTopProperty = isTopProperty }
        if (isExclusiveProperty) { postData.isExclusiveProperty = isExclusiveProperty }
        if (isPopularProperty) { postData.isPopularProperty = isPopularProperty }
        if (propertyAmenities) { postData.propertyAmenities = propertyAmenities }
        if (img_url) { postData.img_url = img_url }

        let updateResp = await propertiesModel.updateOne({ _id }, postData)

        return res.json({
            status: true,
            msg: ["Property" + name + "updated successfully"],
            data: updateResp
        });
    } catch (err) {
        apiResponse.internalServerError(res, [err.message], []);
    }
}

const propertyFileCreate = async function (req, res) {
    try {
        let fileName = req.query.name;
        console.log("__dirname",__dirname);
        console.log("fileName",fileName);
      
        const file = fs.readFileSync(path.resolve(__dirname, "../../public/sattva-aeropolis.html"));
        console.log("file",file);
        fs.writeFileSync(path.resolve(__dirname, `../../public/${fileName}.html`),Buffer.from(file).toString())
        return res.json({
            status: true,
            msg: ["File created successfully"],
        });
    } catch (err) {
        apiResponse.internalServerError(res, [err.message], []);
    }
}
module.exports = {
    createProperties,
    updateProperties,
    getProperties,
    deleteProperties,
    propertyFileCreate
}