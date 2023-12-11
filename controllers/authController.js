const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const sendEmail = require('./../utils/email')

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date( Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        // set it to false and then check what happens
        httpOnly: true
    };

    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

exports.signup = async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    createSendToken(newUser, 201, res);
};


exports.login = async (req, res, nxt) => {
    // make such that the user can also login with their username
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide email and password'
        })
    };

    // check if user exists and password is correct
    const user = await User.findOne({ email: email }).select('+password');

    if(!user || !(await user.correctPassword(password, user.password))){
        return res.status(401).json({
            status: 'fail',
            message: 'Incorrect email or password'
        })
    }


    // if everything ok then send token to client
    createSendToken(user, 200, res);
};


exports.protect = async (req, res, next) => {

    // 1) Getting token and checking if it's true
    let token;
    if(req.cookies.jwt){
        token = req.cookies.jwt;
    };

    if(!token){
        return res.status(401).json({
            status: 'fail',
            message: 'You are not logged in! Please log in to get access.'
        })
    };


    // 2) Verfication token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user exists
    // console.log(decoded);
    const currentUser = await User.findById(decoded.id);
    if(!currentUser){
        return res.status(401).json({
            status: 'fail',
            message: 'The user belonging to this token does no longer exist.'
        })
    };

    req.user = currentUser;
    res.locals.users = currentUser;
    next();
};


exports.forgotPassword = async (req, res, next) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError('There is no user with email address.', 404));
    }
  
    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
  
    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;
  
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        message
      });
  
      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!'
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
  
      return res.status(500).json({
        status: 'error',
        message: 'Error in sending email'
      });
    }
  };

exports.resetPassword = (req, res, next) => {

}