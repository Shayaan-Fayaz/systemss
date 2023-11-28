const express = require('express');
const authController = require('./../controllers/authController');
const viewController = require('./../controllers/viewController');

router= express.Router();

router.route('/me').get(authController.protect, viewController.getSystemInfoPage);
router.route('/signup').get(viewController.getSignUpPage);
router.route('/login').get(viewController.getLoginPage);

module.exports = router;