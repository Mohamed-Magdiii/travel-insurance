const express = require('express');
const { ROLE } = require("../../common/constants");
const router = express.Router();
const { userValidations } = require('./validations');
const { validationMiddleware ,authMiddleware ,authRole} = require('./middlewares');
const { UserController } = require('../controllers');

// for adding record
router.post('/', validationMiddleware(userValidations.create), UserController.createRecord);

// for paginate records
router.get('/paginate', UserController.getPaginate);

// for get records
router.get('/',authMiddleware,authRole(ROLE.ADMIN) , UserController.getRecords);

// for get record  by id
router.get('/find/:id', UserController.getRecordById);

//
router.get('/me', authMiddleware, UserController.getMeByToken);

// for updating record by id
router.patch('/:id',authMiddleware,authRole(ROLE.USER,ROLE.ADMIN) ,validationMiddleware(userValidations.update), UserController.updateRecordById);

// for deleting record by id
// router.delete('/:id', UserController.deleteRecordById);

module.exports = router;
