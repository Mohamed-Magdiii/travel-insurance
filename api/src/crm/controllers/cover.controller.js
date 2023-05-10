const { ResponseMessages } = require('../../common');
const { ApiResponse } = require('../../utils');

const service = require('../../services').coverService;

class CoverController {
    async createCover(req,res,next) {
        try {
            const rec = await service.createCover(req);
            return ApiResponse(res, true, ResponseMessages.RECORD_CREATE_SUCCESS, rec);
          } catch (error) {
            return next(error);
          }
    }

    async getCover(req,res,next) {
        try {
         
            const rec = await service.getCover(req);
            return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
          } catch (error) {
            return next(error);
          }
    }
    async getparentCover(req,res,next) {
        try {
         
            const rec = await service.getCoverParent(req);
            return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
          } catch (error) {
            return next(error);
          }
    }
    async updateCoverById(req,res,next) {
        try {
            const rec = await service.updateCover(req);
            return ApiResponse(res, true, ResponseMessages.RECORD_UPDATE_SUCCESS, rec);
          } catch (error) {
            return next(error);
          }
    }
    async getCoverById(req,res,next){
        try {
          
            const rec = await service.getCoverById(req);
            return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
          } catch (error) {
            return next(error);
          }
    }
}


module.exports =new  CoverController();