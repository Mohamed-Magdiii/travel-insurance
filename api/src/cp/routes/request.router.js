const express = require('express');

const router = express.Router();
const { auMW } = require('./middlewares');

const ctr = require('../controllers').RequestController;

router.post('/partnership', auMW, ctr.doPartnership);
router.get('/partnership', auMW, ctr.getPartnerships);
router.post('/live-account', auMW, ctr.requestLiveAccount);

module.exports = router;
