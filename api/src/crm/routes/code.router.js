const express = require('express');
const { ROLE } = require("../../common/constants");
const router = express.Router();
const { validationMiddleware,authMiddleware ,authRole } = require('./middlewares');
const { CodeController } = require('../controllers');

// for adding record
router.post('/' ,authMiddleware, CodeController.createCode);
// router.get('/paginate', ProductController.getPaginate);


// // for get records
router.get('/', CodeController.getCode);
// router.get('/parentCover', CodeController.getparentCover);

// // for get record  by id
router.get('/find/:id', CodeController.getCodeById);


// // for updating record by id
router.patch('/:id', CodeController.updateCodeById);

// // for deleting record by id
// router.delete('/:id', CodeController.deleteRecordById);

module.exports = router;
