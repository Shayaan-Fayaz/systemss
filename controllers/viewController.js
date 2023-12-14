const { users } = require("systeminformation");
const System = require("./../models/systemModel");
const User = require("./../models/userModel");

const client = require("./../utils/redisClient");

exports.getSystemInfoPage = async (req, res, next) => {
  const userId = req.user._id;
  const userSystem = await System.findOne({ user: userId });

  res.status(200).render("index", {
    title: "System Info",
    system: userSystem,
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
  const cacheValue = await client.get("cpuDataRender");

  if (cacheValue) {
    // console.log(JSON.parse(cacheValue));
    return res.status(200).render("cpu", {
      title: "CPU",
      system: JSON.parse(cacheValue),
    });
    // return res.status(200).json({
    //   status: "success",
    //   data: {
    //     data: JSON.parse(cacheValue),
    //   },
    // });
  }
  const userId = req.user._id;

  const userSystem = await System.findOne({ user: userId });
  client.set("cpuDataRender", JSON.stringify(userSystem));
  res.status(200).render("cpu", {
    title: "CPU",
    system: userSystem,
  });
};

exports.getDeviceInfo = async (req, res, next) => {
  const cacheValue = await client.get("deviceDataRender");

  if (cacheValue) {
    console.log("Im here");
    return res.status(200).render("device", {
      title: "System",
      system: JSON.parse(cacheValue),
    });
  }
  const userId = req.user._id;

  const userSystem = await System.findOne({ user: userId });
  client.set("deviceDataRender", JSON.stringify(userSystem));

  res.status(200).render("device", {
    title: "System Info",
    system: userSystem,
  });
};

exports.getMemoryInfo = async (req, res, next) => {
  // const userId = req.user._id;

  // const userSystem = await Syste

  res.status(200).render("memory", {
    title: "Memory",
  });
};

exports.getBatteryInfo = async (req, res, next) => {
  res.status(200).render("battery", {
    title: "Battery",
  });
};

exports.getOSInfo = async (req, res, next) => {
  const cacheValue = await client.get("OSDataRender");

  if (cacheValue) {
    return res.status(200).render("os", {
      title: "OS Info",
      system: JSON.parse(cacheValue),
    });
  }
  const userId = req.user._id;

  const userSystem = await System.findOne({ user: userId });
  client.set("OSDataRender", JSON.stringify(userSystem));

  res.status(200).render("os", {
    title: "OS Info",
    system: userSystem,
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

  //   console.log(req.user);

  //   const userInfo = await User.findOne({ user: userId });
  //   console.log(userInfo);

  //   res.status(200).render("profile", {
  //     title: "My Profile",
  //     user: userInfo,
  //   });
};
