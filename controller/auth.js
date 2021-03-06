const User = require('../models/User.js');
const colors = require('colors');
const mongoose = require('mongoose');
const ErrorResponse = require('../utils/erroresponse.js');
const asyncHandler = require('../middlewares/ansync.js');
const { response } = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const sendTokenBackToResponse = require('../utils/sendTokenBackToResponse.js');
const { findByIdAndUpdate } = require('../models/User.js');
// swagger setup
/*name,email,password,*/

const register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  if (!user) {
    return next(new ErrorResponse('error register failed', 500));
  }
  res.status(201).json({ success: true, data: user });
});
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = await req.body;
  console.log(email, req.body.password);

  //  is he set password and email
  let user;
  if (email === null) {
    return next(
      new ErrorResponse('verify if u have entered the password or email', 400)
    );
  }

  switch (password) {
    case undefined:
      return next(
        new ErrorResponse('verify if u have entered the password'),
        400
      );
      break;
    default:
      user = await User.findOne({ email }).select('+password');
      console.log('the user is', user);
      //   is the user exist
      //    1.check the user
      if (!user) {
        return next(new ErrorResponse('incorect email', 500));
      }

      // is the password correct
      const confirm = await user.confirmThePassword(password);
      //    1.check the user

      if (!confirm) {
        return next(new ErrorResponse('password incorrect ', 404));
      }
      break;
  }

  // this will help to sign with a token then we send it back to the client
  sendTokenBackToResponse(user, 200, res);
});

const getUsers = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorResponse('please login first', 404));
  }

  const users = await User.find();
  res.status(200).json({ success: true, count: users.length, data: users });
});

const getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorResponse('user not found', 404));
  }
  res.status(200).json({ success: true, data: user });
});

const updateUserDetails = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, email },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!user) {
    return next(new ErrorResponse('make sure u entered name and email', 404));
  }
  res.status(200).json({ success: true, data: user });
});

const deleteUsers = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new ErrorResponse('only admin can make this action', 404));
  }
  await User.remove({});

  res.status(200).json({ success: true, data: 'succefull deleted...' });
});
const whoIam = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  console.log(`${req.user}`.colors);
  res.status(200).json({ success: true, data: user });
});
const logout = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorResponse('login first', 404));
  }

  req.user = null;
  if (req.user !== null) {
    return next(new ErrorResponse('logout failed', 404));
  }

  res.status(200).json({ success: true, data: 'logout successffuly' });
  req.headers.authorization = null;
  if (req.headers.authorization !== null) {
    return next(new ErrorResponse('error update header failed', 404));
  }
});
const updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);

  const confirm = await user.confirmThePassword(currentPassword);
  if (!confirm) {
    return next(new ErrorResponse('incorrect password', 404));
  }
  user.password = newPassword;
  await user.save();
  sendTokenBackToResponse(user, 200, res);
});
module.exports = {
  register,
  login,
  getUsers,
  deleteUsers,
  getUser,
  updateUserDetails,
  whoIam,
  logout,
  updatePassword,
};
