const express = require('express');
const authRouter = require('./auth');
const registerRouter = require('./register.router');
const requestRouter = require('./request.router');
const myRouter = require('./my.router');
const bankAccountRouter = require('./bank-account.router');

const router = express.Router();

router.use('/register', registerRouter);
router.use('/auth', authRouter);
router.use('/requests', requestRouter);
router.use('/my', myRouter);
router.use('/bank-accounts', bankAccountRouter);

module.exports = (app) => {
  app.use('/api/v1/cp', router);
};
