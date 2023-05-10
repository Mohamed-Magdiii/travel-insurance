const { ResponseMessages } = require('../../common');
const { ApiResponse } = require('../../utils');

let service;

function Base(ser) {
  service = ser;
}

// Base.prototype.run = function (req, res, next) {};
Base.prototype.createRecord = async (req, res, next) => {
  try {
    const rec = await service.create(req.body);
    return ApiResponse(res, true, ResponseMessages.RECORD_CREATE_SUCCESS, rec);
  } catch (error) {
    return next(error);
  }
};

Base.prototype.updateRecordById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rec = await service.updateById(id, req.body);
    return ApiResponse(res, true, ResponseMessages.RECORD_UPDATE_SUCCESS, rec);
  } catch (error) {
    return next(error);
  }
};

Base.prototype.deleteRecordById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rec = await service.deleteById(id);
    return ApiResponse(res, true, ResponseMessages.RECORD_DELETE_SUCCESS, rec);
  } catch (error) {
    return next(error);
  }
};

Base.prototype.getRecords = async (req, res, next) => {
  try {
    const rec = await service.find();
    return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
  } catch (error) {
    return next(error);
  }
};

Base.prototype.getRecordById = async (req, res, next) => {
  try {
    const rec = await service.findById(req.params.id);
    return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
  } catch (error) {
    return next(error);
  }
};

Base.prototype.getRecordPaginated = async (req, res, next) => {
  try {
    const rec = await service.find({});
    return ApiResponse(res, true, ResponseMessages.RECORD_FETCH_SUCCESS, rec);
  } catch (error) {
    return next(error);
  }
};

module.exports = Base;
