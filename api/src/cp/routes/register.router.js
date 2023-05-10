const express = require('express');

const router = express.Router();
const vldtns = require('./validations').customerValidations;
const { vlMW } = require('./middlewares');
const ctr = require('../controllers').CustomerController;

router.post('/demo', vlMW(vldtns.registerDemo), ctr.registerDemo);
router.post('/live', vlMW(vldtns.registerLive), ctr.registerLive);

module.exports = router;
