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

module.exports = router;