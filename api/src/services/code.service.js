const Cruds = require('./Cruds');
const {CodeModel} = require('../models');
class CodeService extends Cruds{

    async createCode(req){
        req.body.user=req.user._id
        const result = await this.create(req.body)
        return result
    }
    async getCode(req){
        const {limit} = req.query
        const result = await CodeModel.Model.find().populate('productId codeType').limit(limit)
        return result
    }
    async getCodeParent(req){
        const {limit} = req.query
        const result = await CodeModel.Model.find({parentCode:{$ne:null}}).limit(limit)
        return result
    }
    async updateCode(req){
        const {id} = req.params
        const result = await this.updateById(id , req.body)
        return result
    }
    async getCodeById(req){
        const {id} =req.params
    const result = await CodeModel.Model.findById(id)
    return result
    }
}


module.exports =new CodeService(CodeModel.Model , CodeModel.Schema);