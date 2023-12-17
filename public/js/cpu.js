const ctx = document.getElementById("myChart");

var label = [];

for (i = 0; i < 60; i++) {
  label.push(i);
}

var cpuUsageData = [];

async function fetchCPUUsage() {
  try {
    const { data } = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/api/v1/system/cpu-usage",
    });
    const currentLoad = data.data.data.currentLoad;
    //   console.log(currentLoad);
    cpuUsageData.unshift(currentLoad);
    //   console.log(cpuUsageData)
    //   label.push(currentLoad);
    chart.options.animation.duration = 0;
    chart.update();
  } catch (err) {
    console.log(err);
  }
}

window.setInterval(fetchCPUUsage, 1000);

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: label,
    datasets: [
      {
        label: "% CPU Utilization",
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
