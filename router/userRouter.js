const express = require('express');
const authController =require('./../controllers/authController');


router = express.Router();


router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/forgotPassword').post(authController.forgotPassword);
// router.route('/resetPassword').patch(authController.resetPa)

module.exports = router;