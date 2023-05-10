const Cruds = require('./Cruds');
const {CoverModel} = require('../models');
class CoverService extends Cruds{

    async createCover(req){
        req.body.user=req.user._id
        const result = await this.create(req.body)
        return result
    }
    async getCover(req){
        const {limit} = req.query
        const result = await CoverModel.Model.find().populate('productId parentCover').limit(limit)
        return result
    }
    async getCoverParent(req){
        const {limit} = req.query
        const result = await CoverModel.Model.find({parentCover:{$ne:null}}).limit(limit)
        return result
    }
    async updateCover(req){
        const {id} = req.params
        const result = await this.updateById(id , req.body)
        return result
    }
    async getCoverById(req){
        const {id} =req.params
    const result = await CoverModel.Model.findById(id).populate('productId parentCover')
    return result
    }
}


module.exports =new CoverService(CoverModel.Model , CoverModel.Schema);