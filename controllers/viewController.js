const { users } = require("systeminformation");
const System = require("./../models/systemModel");
const User = require("./../models/userModel");

const client = require("./../utils/redisClient");

exports.getSystemInfoPage = async (req, res, next) => {
  const userId = req.user._id;
  const userSystem = await System.findOne({ user: userId });
  const user = req.user;

  res.status(200).render("index", {
    title: "System Info",
    system: userSystem,
    user: user,
  });
};

exports.getSignUpPage = (req, res, next) => {
  res.status(200).render("signup", {
    title: "Sign Up",
  });
};

exports.getLoginPage = (req, res, next) => {
  res.status(200).render("login", {
    title: "Log In",
  });
};

exports.getCpuInfo = async (req, res, next) => {
  const user = req.user;

  const cacheValue = await client.get("userData");

  if (cacheValue) {
    return res.status(200).render("cpu", {
      title: "CPU",
      system: JSON.parse(cacheValue),
      user: user,
    });
  }
  const userId = req.user._id;

  const userSystem = await System.findOne({ user: userId });
  client.set("userData", JSON.stringify(userSystem));
  res.status(200).render("cpu", {
    title: "CPU",
    system: userSystem,
    user: user,
  });
};

exports.getDeviceInfo = async (req, res, next) => {
  const user = req.user;
  const cacheValue = await client.get("userData");

  if (cacheValue) {
    return res.status(200).render("device", {
      title: "System",
      system: JSON.parse(cacheValue),
      user: user,
    });
  }
  const userId = req.user._id;

  const userSystem = await System.findOne({ user: userId });
  client.set("userData", JSON.stringify(userSystem));

  res.status(200).render("device", {
    title: "System Info",
    system: userSystem,
    user: user,
  });
};

exports.getMemoryInfo = async (req, res, next) => {
  const user = req.user;
  // const userId = req.user._id;

  // const userSystem = await Syste

  res.status(200).render("memory", {
    title: "Memory",
    user: user,
  });
};

exports.getBatteryInfo = async (req, res, next) => {
  const user = req.user;

  res.status(200).render("battery", {
    title: "Battery",
    user: user,
  });
};

exports.getOSInfo = async (req, res, next) => {
  const user = req.user;
  const cacheValue = await client.get("userData");

  if (cacheValue) {
    return res.status(200).render("os", {
      title: "OS Info",
      system: JSON.parse(cacheValue),
      user: user,
    });
  }
  const userId = req.user._id;

  const userSystem = await System.findOne({ user: userId });
  client.set("userData", JSON.stringify(userSystem));

  res.status(200).render("os", {
    title: "OS Info",
    system: userSystem,
    user: user,
  });
};

exports.getMyProfile = async (req, res, next) => {
  //   const userId = req.user._id;
  const user = req.user;

  //   res.status(200).res({
  //     status: "success",
  //     user: user,
  //   });

  res.status(200).render("profile", {
    title: "My Profile",
    user: user,
  });
};
