const Joi = require('joi');
const { CONSTANTS } = require('../../../common');

module.exports.create = Joi.object({
  type: Joi.string().required(),
  transactionGateway: Joi.string().required(),
  // customerId: Joi.string().required(),
  content: Joi.any(),
  amount: Joi.number().required(),
  // currency: Joi.string().required(),
  tradingAccountId: Joi.string(),
  tradingAccountFromId: Joi.string(),
  tradingAccountToId: Joi.string(),
});
//.valid(CONSTANTS.TRANSACTIONS_TYPES)
//.valid(CONSTANTS.TRANSACTIONS_GATEWAYS)

module.exports.update = Joi.object({
  content: Joi.any(),
});
