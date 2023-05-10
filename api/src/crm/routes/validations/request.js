const Joi = require('joi');
const { CONSTANTS } = require('../../../common');

module.exports.deposit = Joi.object({
  type: Joi.string().required(),
  amount: Joi.number().required(),
  customerId: Joi.string().required(),

});

module.exports.withdraw = Joi.object({
  type: Joi.string().required(),
  amount: Joi.number().required(),
  customerId: Joi.string().required(),
});
// data: Joi.string().valid('deposit'),

module.exports.create = Joi.object({
  type: Joi.string().required(),
  content: Joi.any(),
});
//.valid(CONSTANTS.REQUESTS_TYPES)
module.exports.update = Joi.object({
  content: Joi.any(),
});
