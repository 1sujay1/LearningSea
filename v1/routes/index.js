const express = require('express');
const router = express.Router();

/**
 * Roles for route access
 */
const roles = {
    customerAffiliateAdmin: ['teacher', 'affiliate', 'admin'],
    customerAdmin: ['customer', 'admin'],
    affiliateAdmin: ['affiliate', 'admin'],
    affiliate: ['affiliate'],
    customer: ['customer'],
    admin: ['admin'],
};

/**
 * Import controllers
 */
const account = require('../controllers/accountController');
const property = require('../controllers/propertiesController');
const country = require('../controllers/countryController');

/**
 * Middlewares
 */
const { validateRefreshToken } = require('../../middleware/loginUtils');
const middleware = require('../../middleware/authorize');

/**
 * Will Check Schema validation and token validation
 * @param {*} schema check scheam fields and types are valid or not.
 * @param {*} tokenVerify [true] [false] based on boolean it will check token vaild or not.
 */
var authorize = function (schema, tokenVerify, role) {
    return function (req, res, next) {
        middleware.validate(req, res, next, schema, tokenVerify, role);
    };
};

router.post('/account/signin', authorize(null, false), account.login);
router.get('/home',authorize(null,false),account.testRun)


/**PROPERTIES */
router.post('/property',authorize(null,false),property.createProperties)
router.get('/property',authorize(null,false),property.getProperties)
router.put('/property',authorize(null,false),property.updateProperties)
router.delete('/property',authorize(null,false),property.deleteProperties)

/**COUNTRY */
router.post('/country',authorize(null,false),country.createCountry)
router.get('/country',authorize(null,false),country.getCountry)


/**CITY */
router.post('/city',authorize(null,false),country.createCity)
router.get('/city',authorize(null,false),country.getCity)


module.exports = router;