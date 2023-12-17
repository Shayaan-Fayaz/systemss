const socket = io();

const ctx = document.getElementById("myChart");
const batteryChart = document.getElementById("batteryData");
const memoryChart = document.getElementById("memoryChart");

var label = [];

for (i = 0; i < 60; i++) {
  label.push(i);
}

socket.on("message", (msg) => {
  console.log(msg);
});

var cpuUsageData = [];

async function fetchCPUUsage() {
  try {
    const usageData = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/api/v1/system/cpu-usage",
    });
    const currentLoad = usageData.data.data.data.currentLoad;
    socket.emit("cpuUsageFetched", currentLoad);
  } catch (err) {
    console.log(err);
  }
}

// fetchCPUUsage();

window.setInterval(fetchCPUUsage, 1000);

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: label,
    datasets: [
      {
        label: "% Utilization",
        data: cpuUsageData,
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        max: 100,
        min: 0,
        position: "right",
      },
      x: {
        reverse: true,
        display: false,
      },
    },
  },
});

/* this is the chart to represent the data of battery percentage*/
var batteryData = [];
(async function fetchBatteryData() {
  try {
    const data = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/api/v1/system/battery-data",
    });

    const percentage = data.data.data.batteryData.percent;
    const usedBattery = 100 - percentage;
    batteryData.unshift(percentage);
    batteryData.push(usedBattery);

    batteryUsage.update();

    // console.log(usedBattery)
    // console.log(data)
  } catch (err) {
    console.log(err);
  }
})();
const batteryUsage = new Chart(batteryChart, {
  type: "doughnut",
  data: {
    labels: ["Remaining Battery", "Used Battery"],
    datasets: [
      {
        label: "My First Dataset",
        data: batteryData,
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 10,
        // offset: 50,
        // borderRadius: 10,
        // cutout: 500
        // circumference: 100
      },
    ],
  },
  options: {
    cutout: "70%",
    plugins: {
      legend: {
        labels: {
          color: "#000",
          padding: 50,
          font: {
            size: 20,
          },
        },
      },
    },
  },
});

socket.on("cpuDataUpdate", (data) => {
  cpuUsageData.unshift(data);
  chart.options.animation.duration = 0;
  chart.update();
});

var memoryData = [0];

async function getMemory() {
  try {
    const data = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/api/v1/system/memory",
    });

    // console.log(data);

    const usedMemory = data.data.data.memoryData.used;
    // console.log(usedMemory)
    const memInGB = usedMemory / (1024 * 1024 * 1024);
    // console.log(memoryData)

    memoryData.unshift(memInGB);
    memoryUsage.options.animation.duration = 0;
    memoryUsage.update();
  } catch (err) {
    console.log(err);
  }
}

setInterval(getMemory, 1000);

let totalMemGB;
async function getTotalMemory() {
  try {
    const data = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/api/v1/system/memory",
    });

    const totalMemory = data.data.data.memoryData.total;
    totalMemGB = (totalMemory / (1024 * 1024 * 1024)).toFixed(2);
    console.log(totalMemGB);
  } catch (err) {
    console.log(err);
  }
}
getTotalMemory();

const memoryUsage = new Chart(memoryChart, {
  type: "line",
  data: {
    labels: label,
    datasets: [
      {
        label: "Memory Usage",
        data: memoryData,
        fill: false,
        borderColor: "#9400D3",
      },
    ],
  },
  options: {
    scales: {
      y: {
        max: totalMemGB,
        min: 0,
        position: "right",
      },
      x: {
        reverse: true,
        display: false,
      },
    },
  },
});

// the below code will be for the system update

document
  .querySelector(".btn__update_system")
  .addEventListener("click", async (event) => {
    const userId = event.target.value;

    try {
      const res = await axios({
        method: "PATCH",
        url: "http://127.0.0.1:3000/api/v1/system",
        data: {
          userId,
        },
      });

      location.reload();
    } catch (err) {
      console.log(err);
    }

    // const systemInfo = await axios({
    //   method: 'GET',
    //   url: 'http://127.0.0.1:3000/api/v1/system/system-info'
    // });

    // const systemData = systemInfo.data.data.data;

    // const cpuInfo = await axios({
    //   method: 'GET',
    //   url: 'http://127.0.0.1:3000/api/v1/system/cpu-data'
    // });

    // const cpuData = cpuInfo.data.data.data;

    // try{
    //   const userSystem = await axios({
    //     method: 'PATCH',
    //     url: 'http://127.0.0.1:3000/api/v1/system',
    //     data:{
    //       manufacturer:
    //     }
    //   })
    // }
  });
