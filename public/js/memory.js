const memoryChart = document.getElementById('memoryChart');
console.log(memoryChart);

var label = [];

for(i = 0; i<60; i++){
  label.push(i);
}


var memoryData = [0];

async function getMemory(){
  try{
    const data = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/system/memory'
    });

    // console.log(data);

    const usedMemory = data.data.data.memoryData.used;
    // console.log(usedMemory)
    const memInGB = (usedMemory)/(1024*1024*1024);
    // console.log(memoryData)
    
    memoryData.unshift(memInGB);
    memoryUsage.options.animation.duration = 0;
    memoryUsage.update();    
  }catch(err){
    console.log(err)
  }
};

setInterval(getMemory, 1000);

let totalMemGB;
async function getTotalMemory() {
  try{
    const data = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/system/memory'
    });

    const totalMemory = data.data.data.memoryData.total;
    totalMemGB = ((totalMemory)/(1024*1024*1024)).toFixed(2);
    console.log(totalMemGB)
  }catch(err){
    console.log(err)
  }

}
getTotalMemory();

const memoryUsage = new Chart(memoryChart, {
  type: 'line',
  data:{
    labels: label,
    datasets: [{
      label: 'Memory Usage',
      data: memoryData,
      fill: false,
      borderColor: '#9400D3'
    }]
  },
  options:{
    scales:{
      y: {
        max: totalMemGB,
        min: 0,
        position: 'right'
      },
      x:{
        reverse: true,
        display: false
      }
    }
  }
})
