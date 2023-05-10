const express = require('express');

const authRouter = require('./auth');

const roleRouter = require('./role.router');
const userRouter = require('./user.router');

const bankAccountRouter = require('./bank-account.router');
const clientsRouter = require('./customer/clients.router');
const leadssRouter = require('./customer/lead.router');
const requestRouter = require('./request.router');
const productRouter = require('./product.router');
const coverRouter = require('./cover.router');
const customerRouter = require('./customer.router');
const codeRouter = require('./code.router');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/roles', roleRouter);
router.use('/users', userRouter);

// customer routes
router.use('/bank-accounts', bankAccountRouter);
router.use('/clients', clientsRouter);
router.use('/leads', leadssRouter);
router.use('/requests', requestRouter);
router.use('/product', productRouter);
router.use('/cover', coverRouter);
router.use('/customer', customerRouter);
router.use('/code', codeRouter);

module.exports = (app) => {
  app.use('/api/v1/crm', router);
};
