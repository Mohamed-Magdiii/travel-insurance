/* eslint-disable prefer-rest-params */
/* eslint-disable linebreak-style */
/**
 * General cruds class
 */
const { ObjectId } = require('mongoose').Types;
const { generateReferenceForModel } = require('../utils');

class Cruds {
  constructor(Model, Schema = {}) {
    this.Model = Model;
    this.keys = Object.keys(Schema);
    if (this._constructor) this._constructor(...arguments);
}
async create(params, returnOnlyId = false) {
    const recordId = generateReferenceForModel(10, this.Model.modelName);
    const newObj = new this.Model({ ...params, recordId });
    if (!returnOnlyId) {
      return newObj.save();
    }
    const result = await newObj.save();
    return { _id: result.id };
}
async createBulk(paramsArr) {
    const modelObj = [];
    paramsArr.forEach((element) => {
      modelObj.push(new this.Model(element));
    });
    return this.Model.insertMany(modelObj);
  }
async find(params = {}, projection = {}, options = {}) {
    let findRes = this.Model.find(params, projection, { ...options, lean: true });
    
    if (options.populate) findRes = findRes.populate(options.populate);
    return findRes;
  }

  async count(params = {}) {
    return this.Model.find(params).count();
  }

  async findOne(params = {}, projection = {}, options = {}) {
    return this.Model.findOne(params, projection, { ...options, lean: true });
  }

  async findById(id, projection, lean = true) {
    if (projection) return this.Model.findById(id, projection, { lean });
    return this.Model.findById(id, null, { lean });
  }

  async deleteById(id) {
    return this.Model.deleteOne({ _id: ObjectId(id) });
  }

  async updateById(id, params = {}) {
    return this.Model.findOneAndUpdate({ _id: ObjectId(id) }, { $set: params }, { new: true });
  }

  async update(query, params = {}, option) {
    if (option) {
      return this.Model.update(query, { $set: params }, { new: true, ...option });
    }
    return this.Model.findOneAndUpdate(query, { $set: params }, { new: true });
  }

  async findWithPagination(params = {}, options = {}) {
    const limit = process.env.PAGINATION_LIMIT || 10;
    return this.Model.paginate(params, {
      limit, ...options, lean: true, sort: { createdAt: -1 },
    });
  }

  async updateByIdWithPull(id ,params ={} ){
    return this.Model.findOneAndUpdate({ _id: ObjectId(id) }, { $pull: params }, { new: true }); 
  }

  async findOneWithPopulate(params, populateObj) {
    return this.Model.findOne( params ).populate(populateObj);
  }

  async aggregate(pipeline = []) {
    return this.Model.aggregate(pipeline);
  }
}

module.exports = Cruds;
