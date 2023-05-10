const { Model,Schema } = require('../models/customer');
const Cruds = require('./Cruds');
const { comparePassword } = require('../utils');

class CustomerService extends Cruds {
  // async login(email, password) {
  //   const customer = await this.findOne({ email });

  //   if (!customer) throw new Error('Invalid credentials');
  //   if (!customer.isActive) throw new Error('User disabled, please contact admin.');
  //   const passwordMatch = await comparePassword(password, customer.password);
  //   if (!passwordMatch) throw new Error('Invalid credentials');

  //   if (passwordMatch) {
  //     const token = CustomerModel.Model(customer).generateAuthToken();
  //     return {
  //       token,
  //       firstName: customer.firstName,
  //       lastName: customer.lastName,
  //       email: customer.email,
  //     };
  //   }
  //   throw new Error('Invalid credentials');
  // }

  // async saveTradingAccount(customerId, id, number, platform) {
  //   const customer = await this.findById(customerId, null, false);
  //   customer.tradingAccounts.push({
  //     tradingAccountId: id,
  //     tradingAccount: number,
  //     platform,
  //   });
  //   return customer.save();
  // }

  async createCustomer(req){
    const result = await this.create(req.body)
    return result
  }
  async getCustomer(req) {
      const limit = parseInt(req.query.limit);
   const products = await Model.find(req.query).populate('productId parentBroker').limit(limit)
   return products
  }
  async updateCustomer(req){
    
    const {id} =req.params
    const result = await this.updateById(id, req.body)
    return result
  }
  async getCustomerById(req){
    
    const {id} =req.params
    const result = await Model.findById(id).populate('productId parentBroker')
    return result
  }
}

module.exports = new CustomerService(Model, Schema);
