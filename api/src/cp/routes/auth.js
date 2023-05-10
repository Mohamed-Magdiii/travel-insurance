const express = require('express');

const router = express.Router();
const { ApiResponse } = require('../../utils');
const { ResponseMessages } = require('../../common');

const { customerService } = require('../../services');
const { vlMW } = require('./middlewares');
const { login } = require('./validations').authValidations;

const LoginCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await customerService.login(email, password);
    return ApiResponse(res, true, ResponseMessages.LOGIN_SUCCESS, user);
  } catch (error) {
    return next(error);
  }
};

router.post('/login', vlMW(login), LoginCtrl);

module.exports = router;
