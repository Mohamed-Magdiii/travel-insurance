const express = require('express');
const { ROLE } = require("../../common/constants");
const router = express.Router();
const { validationMiddleware,authMiddleware ,authRole } = require('./middlewares');
const { CoverController } = require('../controllers');
const {create}= require('./validations').coversValidations;

// for adding record
router.post('/' ,authMiddleware,authRole(ROLE.ADMIN),validationMiddleware(create), CoverController.createCover);
// router.get('/paginate', ProductController.getPaginate);


// // for get records
router.get('/', CoverController.getCover);
router.get('/parentCover', CoverController.getparentCover);

// // for get record  by id
router.get('/find/:id', CoverController.getCoverById);


// // for updating record by id
router.patch('/:id', CoverController.updateCoverById);

// // for deleting record by id
// router.delete('/:id', CoverController.deleteRecordById);

module.exports = router;
