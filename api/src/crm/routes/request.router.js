const express = require('express');

const router = express.Router();
const vldtns = require('./validations').requestValidations;
const { validationMiddleware } = require('./middlewares');
const ctr = require('../controllers').RequestController;

// router.post('/', validationMiddleware(vldtns.create), ctr.createRecord);
// router.get('/', ctr.getPaginate);

router.get('/partnerships', ctr.getPartnerships);
router.get('/new-accounts', ctr.getNewAccounts);
router.get('/change-leverages', ctr.getChangeLeverages);

// router.post('/approve', ctr.createRecord);
// router.post('/reject', ctr.createRecord);

router.post('/', validationMiddleware(vldtns.create), ctr.createRecord);
router.get('/:customerId', ctr.getRecords);

module.exports = router;
