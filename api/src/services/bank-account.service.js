const { BankAccountModel } = require('../models');
const Cruds = require('./Cruds');

class BankAccountService extends Cruds {

}

module.exports = new BankAccountService(BankAccountModel.Model, BankAccountModel.Schema);
