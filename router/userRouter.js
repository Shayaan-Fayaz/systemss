const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/forgotPassword").post(authController.forgotPassword);
router
  .route("/updateMe")
  .patch(
    authController.protect,
    userController.uploadUserPhoto,
    userController.updateMe
  );
// router.route('/resetPassword').patch(authController.resetPa)

module.exports = router;
