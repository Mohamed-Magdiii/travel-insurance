const { TransactionModel } = require('../models');
const { CONSTANTS } = require('../common');
const Cruds = require('./Cruds');

class Service extends Cruds {
  _constructor() {
    this.defaultPopulate = [{
      path: 'accountId',
      select: 'tradingAccountId platform accountCategory',
    }, {
      path: 'accountToId',
      select: 'tradingAccountId platform accountCategory',
    }, {
      path: 'customerId',
      select: 'firstName lastName category ',
    }];
  }

  getPaginate(filter, options = {}) {
    return this.findWithPagination(filter, {
      ...options,
      populate: this.defaultPopulate,
    });
  }

  getDeposits(filter = {}, options = {}) {
    return this.findWithPagination({
      ...filter,
      type: CONSTANTS.TRANSACTIONS_TYPES.DEPOSIT,
    }, {
      ...options,
      populate: this.defaultPopulate,
    });
  }

  doDeposit(params = {}) {
    return this.create({
      ...params,
      type: CONSTANTS.TRANSACTIONS_TYPES.DEPOSIT,
    });
  }

  getWithdraws(filter = {}, options = {}) {
    return this.findWithPagination({
      ...filter,
      type: CONSTANTS.TRANSACTIONS_TYPES.WITHDRAW,
    }, {
      ...options,
      populate: this.defaultPopulate,
    });
  }

  getInternalTransfer(filter = {}, options = {}) {
    return this.findWithPagination({
      ...filter,
      type: CONSTANTS.TRANSACTIONS_TYPES.INTERNAL_TRANSFER,
    }, {
      ...options,
      populate: this.defaultPopulate,
    });
  }
}

module.exports = new Service(TransactionModel.Model, TransactionModel.Schema);
