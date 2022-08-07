const db = require("../../models");
const ROLES = require("../../config/config");
const UserModel = db.user;
const FCMUserModel = db.fcmUser;
const subscriptionModel = db.subscription;
const propertiesModel = db.properties;
const CountryModel = db.country;
const CityModel = db.city;
const apiResponse = require('../helpers/apiResponse');
const response = require('../../middleware/responseHandler')


const createCountry = async function (req, res) {
    const { name } = req.body;
    try {
        let createResp = await CountryModel.create({name})
        return res.json({
            status: true,
            msg: ["Country created successfully"],
            data: createResp
        });
    } catch (err) {
        apiResponse.internalServerError(res, [err.message], []);
    }
}
const createCity = async function (req, res) {
    const { name,country } = req.body;
    try {
        let createResp = await CityModel.create({name,country})
        return res.json({
            status: true,
            msg: ["City created successfully"],
            data: createResp
        });
    } catch (err) {
        apiResponse.internalServerError(res, [err.message], []);
    }
}
const getCountry = async function (req, res) {
    try {
        let findResp = await CountryModel.find({isDeleted:true})
        return res.json({
            status: true,
            msg: ["Property fetched successfully"],
            data: findResp
        });
    } catch (err) {
        apiResponse.internalServerError(res, [err.message], []);
    }
}
const getCity = async function (req, res) {
    try {
        const {country} =req.body;
        let findResp = await CityModel.find({country,isDeleted:true})
        return res.json({
            status: true,
            msg: ["City fetched successfully"],
            data: findResp
        });
    } catch (err) {
        apiResponse.internalServerError(res, [err.message], []);
    }
}


module.exports = {
    createCountry,
    getCountry,
    createCity,
    getCity
}