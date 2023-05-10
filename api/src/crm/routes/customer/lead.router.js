const express = require('express');

const router = express.Router();
const vldtns = require('../validations').customerValidations;
const { validationMiddleware } = require('../middlewares');
const ctr = require('../../controllers').LeadController;

router.post('/',  ctr.createLead);
router.get('/',  ctr.getPaginate);
router.get('/:id', ctr.getRecordById);
router.patch('/:id',  ctr.updateRecordById);
router.delete('/:id', ctr.deleteRecordById);

module.exports = router;
