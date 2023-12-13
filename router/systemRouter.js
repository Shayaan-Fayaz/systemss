const express = require("express");
const systemController = require("./../controllers/systemController");
const authController = require("./../controllers/authController");
const { system } = require("systeminformation");

router = express.Router();

router.route("/").post(systemController.createSystem);
router.route("/").patch(systemController.updateSystem);

router.route("/cpu-usage").get(systemController.getCPUUsage); // used
router.route("/cpu-data").get(systemController.getCPUdata); // used
router.route("/system-info").get(systemController.getSystemInfo); // used
router.route("/bios-data").get(systemController.getBIOSdata); //used
router.route("/battery-data").get(systemController.getBatteryData); //used
router.route("/cpu-temperature").get(systemController.getCPUTemp);
router.route("/memory").get(systemController.getMemory); //used
router.route("/os").get(systemController.getOSInfo);

router
  .route("/laptop-name")
  .patch(authController.protect, systemController.updateLaptopName);
// router.route('/uptime').get(systemController.systemUptime);

router.route("/").get(systemController.getAllSystem); //only for testing purposes

module.exports = router;
