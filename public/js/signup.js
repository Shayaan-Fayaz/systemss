const signupForm = document.querySelector('.signup__form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const passwordConfirm = document.querySelector('#passwordConfirm').value;

    try{
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/user/signup',
            data: {
                name: name,
                email: email,
                password: password,
                passwordConfirm: passwordConfirm
            }
        });


        const userId = res.data.data.user._id;
        // console.log(res.data.data.user._id);

        
        const systemInfo = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:3000/api/v1/system/system-info'
        });

        const systemInfoData = systemInfo.data.data.data;

        const cpuInfo = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:3000/api/v1/system/cpu-data'
        });

        const cpuInfoData = cpuInfo.data.data.data;
        

        const createSystemInfo = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/system/',
            data: {
                manufacturer: systemInfoData.manufacturer,
                model: systemInfoData.model,
                serial: systemInfoData.serial,
                cpuManufacturer: cpuInfoData.manufacturer,
                cpuBrand: cpuInfoData.brand,
                cpu_physicalCore: cpuInfoData.physicalCores,
                cpu_logicalCore: cpuInfoData.performanceCores,
                user: userId
            }
        });
        
    }catch(err){
        console.log(err);
    }
});