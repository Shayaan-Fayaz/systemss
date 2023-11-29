const System = require('./../models/systemModel');

exports.getSystemInfoPage = async (req, res, next) => {
    const userId = req.user._id;
    const userSystem = await System.findOne({ user: userId});
    
    res.status(200).render('index', {
        title: 'System Info',
        system: userSystem
    });
};

exports.getSignUpPage = (req, res, next) => {
    res.status(200).render('signup', {
        title: 'Sign Up'
    });
};

exports.getLoginPage = (req, res, next) => {
    res.status(200).render('login', {
        title: 'Log In'
    })
}