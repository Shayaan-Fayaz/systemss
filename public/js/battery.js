const batteryChart = document.getElementById('batteryData');

var batteryData = []; 

const batteryUsage = new Chart(batteryChart, {
    type: 'doughnut',
    data:{
      labels: [
        'Remaining Battery',
        'Used Battery'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: batteryData,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        hoverOffset: 10
        // offset: 50,
        // borderRadius: 10,
        // cutout: 500
        // circumference: 100
      }],
    },
    options: {
      cutout: '70%',
      plugins: {
        legend: {
          labels:{
            color: '#000',
            padding: 50,
            font:{
              size: 20,
            }
          }
          }
        }
      }
    }
  )


async function fetchBatteryData() {
  try{
    const data = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/api/v1/system/battery-data"
    })

    console.log(data.data.data)

    const percentage = data.data.data.batteryData.percent;
    const usedBattery = 100 - percentage;
    batteryData.unshift(percentage);
    batteryData.push(usedBattery);

    batteryUsage.update();
    
    // console.log(usedBattery)
    // console.log(data)
  }catch(err){
    console.log(err)
  }
};

fetchBatteryData();
