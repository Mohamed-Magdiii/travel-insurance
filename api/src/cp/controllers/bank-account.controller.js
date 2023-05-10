/* eslint-disable class-methods-use-this */
const { ResponseMessages } = require('../../common');
const { ApiResponse } = require('../../utils');
const service = require('../../services').bankAccountService;

class BankAccountController {
  async addBankAccount(req, res, next) {
    try {
      const params = req.body;
      const rec = await service.create({
        ...params,
        customerId: req.user._id,
      });
      return ApiResponse(res, true, ResponseMessages.RECORD_CREATE_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }

  async getMyBankAccounts(req, res, next) {
    try {
      const rec = await service.findWithPagination({
        customerId: req.user._id,
      });
      return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new BankAccountController();
