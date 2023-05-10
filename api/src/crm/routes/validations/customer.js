const Joi = require('joi');

module.exports.create = Joi.object({
  customerCode: Joi.string().required(),
  nameEn: Joi.string().required(),
  nameAr: Joi.string().required(),
  shortNameEn: Joi.string().required(),
  shortNameAr: Joi.string().required(),
  customerType: Joi.string().required(),
  productId: Joi.string().required(),
  from: Joi.string().required(),
  to: Joi.string().required(),
  policyAbbreviation: Joi.string().required(),
}).options({allowUnknown: true});


