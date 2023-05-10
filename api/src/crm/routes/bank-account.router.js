const express = require('express');

const router = express.Router();
const vldtns = require('./validations').bankAccountValidations;
const { validationMiddleware } = require('./middlewares');
const ctr = require('../controllers').BankAccountController;

router.get('/:customerId', ctr.getRecords);
router.post('/', validationMiddleware(vldtns.create), ctr.createRecord);
router.patch('/:id', validationMiddleware(vldtns.update), ctr.updateRecordById);
router.delete('/:id', ctr.deleteRecordById);

module.exports = router;
