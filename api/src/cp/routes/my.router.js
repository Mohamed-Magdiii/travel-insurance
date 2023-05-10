const express = require('express');

const router = express.Router();
const { auMW } = require('./middlewares');
const ctr = require('../controllers').CustomerController;

router.get('/profile', auMW, ctr.getMyProfile);
router.get('/activities', auMW, ctr.getActivities);
module.exports = router;
