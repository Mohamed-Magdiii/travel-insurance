const Cruds = require('./Cruds');
const {ProductModel} = require('../models')
class ProductService extends Cruds{
 async createProduct(req){
    req.body.userId = req.user._id
    const rec  =await this.create(req.body)
    return rec
 }
    async getProducts(req){
        const limit = parseInt(req.query.limit);
     const products = await ProductModel.Model.find(req.query).populate('userId').limit(limit)
     return products
    }
}

module.exports =new ProductService(ProductModel.Model , ProductModel.Schema)