const { ResponseMessages } = require('../../common');
const { ApiResponse } = require('../../utils');

const service = require('../../services').codeService;

class CodeController {
    async createCode(req,res,next) {
        try {
            const rec = await service.createCode(req);
            return ApiResponse(res, true, ResponseMessages.RECORD_CREATE_SUCCESS, rec);
          } catch (error) {
            return next(error);
          }
    }

    async getCode(req,res,next) {
        try {
         
            const rec = await service.getCode(req);
            return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
          } catch (error) {
            return next(error);
          }
    }
    async getparentCode(req,res,next) {
        try {
         
            const rec = await service.getCodeParent(req);
            return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
          } catch (error) {
            return next(error);
          }
    }
    async updateCodeById(req,res,next) {
        try {
            const rec = await service.updateCode(req);
            return ApiResponse(res, true, ResponseMessages.RECORD_UPDATE_SUCCESS, rec);
          } catch (error) {
            return next(error);
          }
    }
    async getCodeById(req,res,next){
        try {
          
            const rec = await service.getCodeById(req);
            return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
          } catch (error) {
            return next(error);
          }
    }
}


module.exports =new  CodeController();