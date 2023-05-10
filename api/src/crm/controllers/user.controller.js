/* eslint-disable class-methods-use-this */
const { ResponseMessages } = require('../../common');
const { UserModel } = require('../../models');
const { ApiResponse } = require('../../utils');
const service = require('../../services').userService;

class UserController {
  async createRecord(req, res, next) {
    try {
      const rec = await service.createUser(req.body);
      return ApiResponse(res, true, ResponseMessages.RECORD_CREATE_SUCCESS, rec);
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
      const rec = await service.deleteById(id);
      return ApiResponse(res, true, ResponseMessages.RECORD_DELETE_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }

  async getRecords(req, res, next) {
    try {
      const rec = await UserModel.Model.find().populate('roleId customerId productId');
      console.log(rec);
      return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
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

  async getRecordById(req, res, next) {
    try {
      const rec = await UserModel.Model.findById(req.params.id).populate('roleId customerId productId');
      return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }

  async getRecordPaginated(req, res, next) {
    try {
      const rec = await service.find({});
      return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
    } catch (error) {
      return next(error);
    }
  }
 async getMeByToken(req, res, next){
  const id =req.user._id
  const rec= await UserModel.Model.findById(id).populate('roleId').select('-password')
  return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
 }
}

module.exports = new UserController();
