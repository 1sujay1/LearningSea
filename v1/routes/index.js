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
const country = require('../controllers/countryController');
const aws = require('../controllers/awsController');
const upload = require('../controllers/uploadController');

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

// router.get('/yes',(req,res)=>{
//     return res.send("yes")
// })

/**Upload Controller */
router.get('/uploads/images/:key',authorize(null,false),upload.awsGetS3File)
router.delete('/uploads/images/:key',authorize(null,false),upload.deleteFileFromAWS)
router.post('/uploads/file', authorize(null, false), upload.awsSingleUpload);
router.post('/uploads/files', upload.awsMultiUpload);

router.post('/account/signin', authorize(null, false), account.login);
router.get('/home',authorize(null,false),account.testRun)

/**COUNTRY */
router.post('/country',authorize(null,false),country.createCountry)
router.get('/country',authorize(null,false),country.getCountry)

/**CITY */
router.post('/city',authorize(null,false),country.createCity)
router.get('/city',authorize(null,false),country.getCity)

module.exports = router;