const { ResponseMessages } = require('../../common');
const { ApiResponse } = require('../../utils');

const service = require('../../services').customerService;

class CustomerController {
    async createCustomer(req,res,next) {
        try {
            const rec = await service.createCustomer(req);
            return ApiResponse(res, true, ResponseMessages.RECORD_CREATE_SUCCESS, rec);
          } catch (error) {
            return next(error);
          }
    }

    async getCustomer(req,res,next) {
        try {
         
            const rec = await service.getCustomer(req);
            return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
          } catch (error) {
            return next(error);
          }
    }
    async getCustomerById(req,res,next) {
        try {
         
            const rec = await service.getCustomerById(req);
            return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
          } catch (error) {
            return next(error);
          }
    }
    async updateCustomer(req,res,next) {
        try {
         
            const rec = await service.updateCustomer(req);
            return ApiResponse(res, true, ResponseMessages.RECORD_UPDATE_SUCCESS, rec);
          } catch (error) {
            return next(error);
          }
    }
 
}


module.exports =new  CustomerController();