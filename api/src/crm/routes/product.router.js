const express = require('express');
const { ROLE } = require("../../common/constants");
const router = express.Router();
const { validationMiddleware,authMiddleware ,authRole } = require('./middlewares');
const { ProductController } = require('../controllers');
const {create}= require('./validations').productValidations;

// for adding record
router.post('/',authMiddleware,authRole(ROLE.ADMIN),validationMiddleware(create), ProductController.createRecord);
// router.get('/paginate', ProductController.getPaginate);


// // for get records
router.get('/', ProductController.getRecords);

// // for get record  by id
router.get('/:id', ProductController.getRecordById);

// // for updating record by id
router.patch('/:id', ProductController.updateRecordById);

// // for deleting record by id
// router.delete('/:id', ProductController.deleteRecordById);

module.exports = router;
