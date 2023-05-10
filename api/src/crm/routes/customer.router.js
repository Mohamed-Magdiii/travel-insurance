const express = require('express');
const { ROLE } = require("../../common/constants");
const router = express.Router();
const { validationMiddleware,authMiddleware ,authRole } = require('./middlewares');
const { CustomerController } = require('../controllers');
const {create}= require('./validations').customerValidations;

// for adding record
router.post('/' ,authMiddleware,authRole(ROLE.ADMIN),validationMiddleware(create), CustomerController.createCustomer);
// router.get('/paginate', ProductController.getPaginate);


// // for get records
router.get('/', CustomerController.getCustomer);
// router.get('/parentCover', CoverController.getparentCover);

// for get record  by id
router.get('/find/:id', CustomerController.getCustomerById);


// // for updating record by id
router.patch('/:id', CustomerController.updateCustomer);

// // for deleting record by id
// router.delete('/:id', CoverController.deleteRecordById);

module.exports = router;
