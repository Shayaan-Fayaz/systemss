const loginForm = document.querySelector('.login__form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    try{
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/user/login',
            data:{
                email: email,
                password: password
            }
        });

        console.log(res);
    }catch(err){
        console.log(err);
    }
})