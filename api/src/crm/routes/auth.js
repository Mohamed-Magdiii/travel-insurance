const express = require("express");

const router = express.Router();
const { ApiResponse } = require("../../utils");
const { ResponseMessages } = require("../../common");

const { userService } = require("../../services");
const { validationMiddleware } = require("./middlewares");
const { login } = require("./validations").authValidations;

// router.post('/cp/login', async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const user = await userService.loginUser(email, password);
//     return res.json({ status: 'login', data: user });
//   } catch (error) {
//     return next(error);
//   }
// });

const LoginCtrl = async (req, res, next) => {
  try {
    const {username, password} =req.body
    const user = await userService.loginCrm(username, password);
    if (!user) {
      return ApiResponse(res, false, ResponseMessages.LOGIN_FAIL, {});
    }
    return ApiResponse(res, true, ResponseMessages.LOGIN_SUCCESS, user);
  } catch (error) {
    return next(error);
  }
};

router.post("/login", validationMiddleware(login), LoginCtrl);

module.exports = router;
