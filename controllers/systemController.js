const systemInformation = require("systeminformation");
const System = require("./../models/systemModel");
const moment = require("moment");
const ms = require("ms");
const os = require("os");

const client = require("./../utils/redisClient");

exports.getCPUUsage = async (req, res, next) => {
  const CPUusage = await systemInformation.currentLoad();

  res.status(200).json({
    status: "success",
    data: {
      data: CPUusage,
    },
  });
};

exports.getCPUdata = async (req, res, next) => {
  const cacheValue = await client.get("cpuData");

  if (cacheValue) {
    return res.status(200).json({
      status: "success",
      data: {
        data: JSON.parse(cacheValue),
      },
    });
  }
  const data = await systemInformation.cpu();
  client.set("cpuData", JSON.stringify(data));

  res.status(200).json({
    status: "success",
    data: {
      data: data,
    },
  });
};

// exports.systemUptime = (req, res, next) => {
//     const uptimeSeconds = os.uptime();
//     console.log(uptimeSeconds);

//     const totalMinutes = Math.floor(uptimeSeconds / 60);

//     const seconds = uptimeSeconds % 60;
//     const hours = Math.floor(totalMinutes / 60);
//   const minutes = totalMinutes % 60;

//   return { h: hours, m: minutes, s: seconds };
//     let formattedUptime = '';

//     if (days > 0) {
//         formattedUptime += `${days} days `;
//     }

//     if (hours > 0 || (days > 0 && hours === 0)) {
//         formattedUptime += `${hours} hours `;
//     }

//     if (minutes > 0 || (hours > 0 && minutes === 0)) {
//         formattedUptime += `${minutes} minutes`;
//     }

//     console.log(formattedUptime.trim());

//     res.status(200).json({
//         data: 'success',
//         data:{
//             data: formattedUptime
//         }
//     })
// }

exports.getSystemInfo = async (req, res, next) => {
  const cacheValue = await client.get("systemData");

  if (cacheValue) {
    const jsonStringArray = cacheValue.match(/({.*?})/g);

    const cleanedJsonStringArray = jsonStringArray.map((jsonString) =>
      jsonString.replace(/\\/g, "")
    );

    const jsonObjectArray = cleanedJsonStringArray.map((e) => JSON.parse(e));
    // console.log(jsonObjectArray);
    const system = jsonObjectArray[0];
    const bios = jsonObjectArray[1];

    return res.status(200).json({
      status: "success",
      data: {
        system: system,
        bios: bios,
      },
    });
  }
  const systemInfo = await systemInformation.system();
  const biosInfo = await systemInformation.bios();

  const systemString = JSON.stringify(systemInfo);
  const biosString = JSON.stringify(biosInfo);

  const combinedString = systemString + biosString;
  client.set("systemData", JSON.stringify(combinedString));

  res.status(200).json({
    status: "success",
    data: {
      system: systemInfo,
      bios: biosInfo,
    },
  });
};

exports.getBIOSdata = async (req, res, next) => {
  const BIOSdata = await systemInformation.bios();

  res.status(200).json({
    status: "success",
    data: {
      data: BIOSdata,
    },
  });
};

exports.getBatteryData = async (req, res, next) => {
  const batteryData = await systemInformation.battery();

  res.status(200).json({
    status: "success",
    data: {
      batteryData,
    },
  });
};

exports.getCPUTemp = async (req, res, next) => {
  const tempData = await systemInformation.cpuTemperature();

  res.status(200).json({
    status: "success",
    data: {
      tempData,
    },
  });
};

exports.getMemory = async (req, res, next) => {
  const memoryData = await systemInformation.mem();
  const memLayoutData = await systemInformation.memLayout();

  // console.log(memLayoutData);

  res.status(200).json({
    status: "success",
    data: {
      memoryData,
    },
  });
};

exports.createSystem = async (req, res, next) => {
  const manufacturer = req.body.manufacturer;
  const model = req.body.model;
  const serial = req.body.serial;
  const biosVendor = req.body.biosVendor;
  const biosVersion = req.body.biosVersion;
  const biosReleaseDate = req.body.biosReleaseDate;
  const biosSerial = req.body.biosSerial;
  const cpuManufacturer = req.body.cpuManufacturer;
  const cpuBrand = req.body.cpuBrand;
  const cpu_physicalCore = req.body.cpu_physicalCore;
  const cpu_logicalCore = req.body.cpu_logicalCore;
  const osPlatform = req.body.osPlatform;
  const osDistro = req.body.osDistro;
  const osArch = req.body.osArch;
  const osHost = req.body.osHost;
  const userId = req.body.user;

  const userData = await System.create({
    manufacturer: manufacturer,
    model: model,
    serial: serial,
    biosVendor: biosVendor,
    biosVersion: biosVersion,
    biosReleaseDate: biosReleaseDate,
    biosSerial: biosSerial,
    cpuManufacturer: cpuManufacturer,
    cpuBrand: cpuBrand,
    cpu_physicalCore: cpu_physicalCore,
    cpu_logicalCore: cpu_logicalCore,
    osPlatform: osPlatform,
    osDistro: osDistro,
    osArch: osArch,
    osHost: osHost,
    user: userId,
  });

  res.status(201).json({
    status: "success",
    data: {
      userData,
    },
  });
};

exports.getAllSystem = async (req, res, next) => {
  const allSystem = await System.find();

  res.status(200).json({
    status: "success",
    data: {
      allSystem,
    },
  });
};

// exports.updateSystem = async (req, res, next) => {
//     const userSystem = await System.findOneAndUpdate({ user: req.body.userId}, {
//         manufacturer: req.body.manufacturer,
//         model: req.body.model,
//         serial: req.body.serial,
//         cpuManufacturer: req.body.cpuManufacturer,
//         cpuBrand: req.body.cpuBrand,
//         cpu_physicalCore: req.body.cpu_physicalCore,
//         cpu_logicalCore: req.body.cpu_logicalCore
//     },
//     {
//         new: true
//     });

//     res.status(200).json({
//         status: 'success',
//         data:{
//             userSystem
//         }
//     })

// }

exports.updateSystem = async (req, res, next) => {
  const user = req.body.userId;
  const cpuData = await systemInformation.cpu();
  const systemData = await systemInformation.system();

  const udpatedSystem = await System.findOneAndUpdate(
    { user: user },
    {
      manufacturer: systemData.manufacturer,
      brand: systemData.brand,
      serail: systemData.serial,
      cpuManufacturer: cpuData.manufacturer,
      cpuBrand: cpuData.brand,
      cpu_physicalCore: cpuData.physicalCores,
      cpu_logicalCore: cpuData.performanceCores,
      changed: true,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      udpatedSystem,
    },
  });
};

exports.updateLaptopName = async (req, res, next) => {
  const userId = req.user.id;
  // console.log(userId);
  // console.log(userId);
  const laptopName = req.body.laptopName;
  // console.log(laptopName);

  const updatedLaptop = await System.findOneAndUpdate(
    { user: userId },
    {
      laptopName: laptopName,
    },
    {
      new: true,
    }
  );

  // console.log(updatedLaptop);

  res.status(200).json({
    status: "success",
    data: {
      data: updatedLaptop,
    },
  });

  //   const updatedLaptop = System.findByIdAndUpdate;
};

exports.getOSInfo = async (req, res, next) => {
  const os = await systemInformation.osInfo();

  res.status(200).json({
    status: "success",
    data: {
      data: os,
    },
  });
};
