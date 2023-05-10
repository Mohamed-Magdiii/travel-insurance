const express = require('express');

const router = express.Router();
const vldtns = require('./validations').bankAccountValidations;
const { auMW, vlMW } = require('./middlewares');
const ctr = require('../controllers').BankAccountController;

router.post('/', auMW, vlMW(vldtns.addBankAccount), ctr.addBankAccount);
router.get('/paginate', auMW, ctr.getMyBankAccounts);
// router.get('/', ctr.getRecords);
// router.get('/:id', ctr.getRecordById);
// router.patch('/:id', vlMW(vldtns.update), ctr.updateRecordById);
// router.delete('/:id', ctr.deleteRecordById);

module.exports = router;
