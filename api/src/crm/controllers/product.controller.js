/* eslint-disable class-methods-use-this */
const { ResponseMessages } = require('../../common');
const { ProductModel } = require('../../models');
const { ApiResponse } = require('../../utils');
const service = require('../../services').productService;

class ProductController  {
  async createRecord(req, res, next) {
    try {
      const rec = await service.createProduct(req);
      return ApiResponse(res, true, ResponseMessages.RECORD_CREATE_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }

  async getPaginate(req, res, next) {
    try {
      const rec = await service.findWithPagination();
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

  async getRecordById(req, res, next) {
    try {
      const { id } = req.params;
      const rec = await service.findById(id);
      return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }
  // async deleteRecordById(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     const rec = await service.deleteById(id);
  //     return ApiResponse(res, true, ResponseMessages.RECORD_DELETE_SUCCESS, rec);
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  async getRecords(req, res, next) {
    try {
      const rec = await service.getProducts(req);
      return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }

  // async getRecordById(req, res, next) {
  //   try {
  //     const rec = await service.findById(req.params.id);
  //     return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  // async getRecordPaginated(req, res, next) {
  //   try {
  //     const rec = await service.find({});
  //     return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
  //   } catch (error) {
  //     return next(error);
  //   }
  // }
}

module.exports = new ProductController();
