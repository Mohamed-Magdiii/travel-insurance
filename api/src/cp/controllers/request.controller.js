/* eslint-disable class-methods-use-this */
const { ResponseMessages, CONSTANTS } = require('../../common');
const { ApiResponse } = require('../../utils');
const service = require('../../services').requestService;

class RequestController {
  async doPartnership(req, res, next) {
    try {
      const parReq = await service.findOne({
        customerId: req.user._id,
        type: CONSTANTS.REQUESTS_TYPES.PARTNERSHIP,
      });
      if (parReq) {
        return ApiResponse(res, true, ResponseMessages.RECORD_CREATE_SUCCESS, parReq);
      }
      const rec = await service.createPartnershipRequest(req.user._id);
      return ApiResponse(res, true, ResponseMessages.RECORD_CREATE_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }

  async getPartnerships(req, res, next) {
    try {
      const rec = await service.find({ customerId: req.user._id, type: 'PARTNERSHIP' });
      return ApiResponse(res, true, ResponseMessages.RECORD_CREATE_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }

  async requestLiveAccount(req, res, next) {
    try {
      const rec = await service.createLiveAccountRequest(req.user._id, req.body);
      return ApiResponse(res, true, ResponseMessages.RECORD_CREATE_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new RequestController();
