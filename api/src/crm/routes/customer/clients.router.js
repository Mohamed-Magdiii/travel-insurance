const express = require('express');

const router = express.Router();
const vldtns = require('../validations').customerValidations;
const { validationMiddleware } = require('../middlewares');
const ctr = require('../../controllers').ClientController;

router.post('/', ctr.createClient);
router.get('/', ctr.getPaginate);
router.get('/:id', ctr.getRecordById);  // validationPathMiddleware
router.patch('/:id', ctr.updateRecordById);
router.delete('/:id', ctr.deleteRecordById);

module.exports = router;
