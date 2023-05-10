const Joi = require('joi');
const { CONSTANTS } = require('../../../common');

module.exports.doDeposit = Joi.object({
  accountId: Joi.string().required(),
  amount: Joi.number().required(),
  gateway: Joi.string().required(),
});
// .valid(Object.keys(CONSTANTS.TRANSACTIONS_GATEWAYS))
// .valid(Object.keys(CONSTANTS.TRANSACTIONS_GATEWAYS))
module.exports.doWithdraw = Joi.object({
  accountId: Joi.string().required(),
  amount: Joi.number().required(),
  gateway: Joi.string().required(),
});

module.exports.doInternalTransfer = Joi.object({
  accountId: Joi.string().required(),
  accountToId: Joi.string().required().disallow(Joi.ref('accountId')).required(),
  amount: Joi.number().required(),
});
