/* eslint-disable class-methods-use-this */
const { ResponseMessages, logger } = require('../../common');
const { ApiResponse } = require('../../utils');
const service = require('../../services').documentService;
// service.deleteById('5feef943595c4a2186eeff62')
class DocumentController {
  async addDocument(req, res, next) {
    try {
      const { files } = req;
      const values = Object.keys(files).map((obj) => ({
        files: files[obj],
        customerId: req.user._id,
        title: obj,
      }));
      const rec = await service.updateDocuments(values, req.user._id);
      return ApiResponse(res, true, ResponseMessages.RECORD_CREATE_SUCCESS, rec);
    } catch (error) {
      logger.error('sdfsd fsdf ', error);
      return next(error);
    }
  }

  async getMyDocuments(req, res, next) {
    try {
      const rec = await service.find({
        customerId: req.user._id,
      });
      return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new DocumentController();
