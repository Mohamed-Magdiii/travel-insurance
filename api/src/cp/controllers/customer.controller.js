/* eslint-disable class-methods-use-this */
const { ResponseMessages, CONSTANTS } = require('../../common');
const { ApiResponse, encryptPassword } = require('../../utils');
const service = require('../../services').customerService;
const { activityService } = require('../../services');

class CustomerController {
  async registerDemo(req, res, next) {
    try {
      const params = {
        ...req.body,
        password: await encryptPassword(req.body.password),
        category: CONSTANTS.CUSTOMER_TYPES.DEMO,
        source: CONSTANTS.CUSTOMER_SOURCES.REGISTER_DEMO,
      };
      const rec = await service.create(params);
      const user = service.login(rec.email, rec.password);
      return ApiResponse(res, true, ResponseMessages.RECORD_CREATE_SUCCESS, user);
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

  async getMyProfile(req, res, next) {
    try {
      const rec = await service.findById(req.user._id, { password: 0, source: 0 });
      return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }

  async getActivities(req, res, next) {
    try {
      const rec = await activityService.find({ customerId: req.user._id });
      return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new CustomerController();
