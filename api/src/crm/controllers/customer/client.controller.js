/* eslint-disable class-methods-use-this */
const { ResponseMessages, CONSTANTS, logger } = require('../../../common');
const { ApiResponse, encryptPassword } = require('../../../utils');
const service = require('../../../services').customerService;

class CustomerController {
  async createClient(req, res, next) {
    try {
      const params = {
        ...req.body,
        category: CONSTANTS.CUSTOMER_TYPES.LIVE_INDIVIDUAL,
        password: req.body.password ? await encryptPassword(req.body.password) : null,
      };
      const rec = await service.create(params);
      return ApiResponse(res, true, ResponseMessages.RECORD_CREATE_SUCCESS,rec);
    } catch (error) {
      return next(error);
    }
  }

  async getPaginate(req, res, next) {
    try {
      const rec = await service.findWithPagination({
        category: CONSTANTS.CUSTOMER_TYPES.LIVE_INDIVIDUAL,
      });
      return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }

  async updateRecordById(req, res, next) {
    try {
      const { id } = req.params;
      const rec = await service.updateById(id, req.body);
      return ApiResponse(res, true, ResponseMessages.RECORD_UPDATE_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }

  async deleteRecordById(req, res, next) {
    try {
      const { id } = req.params;
      const rec = await service.updateById(id, { isDeleted: true });
      return ApiResponse(res, true, ResponseMessages.RECORD_DELETE_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }

  async getRecords(req, res, next) {
    try {
      const rec = await service.find();
      return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }

  async getRecordById(req, res, next) {
    try {
      logger.info('jaja ', req.params, req.query);
      const rec = await service.findById(req.params.id);
      return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }

  async registerLive(req, res, next) {
    try {
      const params = {
        ...req.body,
        password: await encryptPassword(req.body.password),
        category: CONSTANTS.CUSTOMER_TYPES.LIVE_INDIVIDUAL,
        source: CONSTANTS.CUSTOMER_SOURCES.REGISTER_LIVE_INDIVIDUAL,
      };
      const rec = await service.create(params);
      return ApiResponse(res, true, ResponseMessages.RECORD_CREATE_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new CustomerController();
