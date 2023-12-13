const express = require("express");
const authController = require("./../controllers/authController");
const viewController = require("./../controllers/viewController");

router = express.Router();

router
  .route("/me")
  .get(authController.protect, viewController.getSystemInfoPage);
router.route("/signup").get(viewController.getSignUpPage);
router.route("/login").get(viewController.getLoginPage);
router.route("/cpu").get(authController.protect, viewController.getCpuInfo);
router
  .route("/device")
  .get(authController.protect, viewController.getDeviceInfo);
router
  .route("/memory")
  .get(authController.protect, viewController.getMemoryInfo);
router
  .route("/battery")
  .get(authController.protect, viewController.getBatteryInfo);
router.route("/os").get(authController.protect, viewController.getOSInfo);
router
  .route("/profile")
  .get(authController.protect, viewController.getMyProfile);

module.exports = router;
