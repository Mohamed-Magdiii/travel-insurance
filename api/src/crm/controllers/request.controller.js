/* eslint-disable class-methods-use-this */
const { ResponseMessages } = require('../../common');
const { ApiResponse } = require('../../utils');
const service = require('../../services').requestService;

class Controller {
  async createRecord(req, res, next) {
    try {
      const params = req.body;
      const rec = await service.create(params);
      return ApiResponse(res, true, ResponseMessages.RECORD_CREATE_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }

  async getPartnerships(req, res, next) {
    try {
      const rec = await service.getPartnerships({});
      return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }

  async getNewAccounts(req, res, next) {
    try {
      const rec = await service.getNewAccounts({});
      return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }

  async getChangeLeverages(req, res, next) {
    try {
      const rec = await service.getChangeLeverages({});
      return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }

  async getRecords(req, res, next) {
    try {
      const rec = await service.findWithPagination({
        customerId: req.params.customerId,
      });
      return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new Controller();
