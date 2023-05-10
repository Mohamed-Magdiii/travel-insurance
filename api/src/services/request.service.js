const { RequestModel } = require('../models');
const Cruds = require('./Cruds');
const { CONSTANTS } = require('../common');

class Service extends Cruds {
  _constructor() {
    this.defaultPopulate = [{
      path: 'customerId',
      select: 'firstName lastName category ',
    }];
  }

  createPartnershipRequest(customerId) {
    return this.create({
      customerId,
      type: CONSTANTS.REQUESTS_TYPES.PARTNERSHIP,
    });
  }

  createLiveAccountRequest(customerId, params) {
    return this.create({
      customerId,
      type: CONSTANTS.REQUESTS_TYPES.LIVE_ACCOUNT,
      content: params,
    });
  }

  getPartnerships(filter = {}, options = {}) {
    return this.findWithPagination({
      ...filter,
      type: CONSTANTS.REQUESTS_TYPES.PARTNERSHIP,
    }, {
      ...options,
      populate: this.defaultPopulate,
    });
  }

  getChangeLeverages(filter = {}, options = {}) {
    return this.findWithPagination({
      ...filter,
      type: CONSTANTS.REQUESTS_TYPES.CHANGE_LEVERAGE,
    }, {
      ...options,
      populate: this.defaultPopulate,
    });
  }

  getNewAccounts(filter = {}, options = {}) {
    return this.findWithPagination({
      ...filter,
      type: CONSTANTS.REQUESTS_TYPES.LIVE_ACCOUNT,
    }, {
      ...options,
      populate: this.defaultPopulate,
    });
  }
}

module.exports = new Service(RequestModel.Model, RequestModel.Schema);
