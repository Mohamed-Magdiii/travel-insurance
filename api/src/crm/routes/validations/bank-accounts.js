const Joi = require('joi');

module.exports.create = Joi.object({
  accountHolderName: Joi.string().required(),
  bankName: Joi.string().required(),
  accountNumber: Joi.string().required(),
  swiftCode: Joi.string().required(),
  address: Joi.string().required(),
  iban: Joi.string().required(),
  currency: Joi.string().required(),
  customerId: Joi.string().required(),
});

module.exports.update = Joi.object({
  accountHolderName: Joi.string(),
  bankName: Joi.string(),
  accountNumber: Joi.string(),
  swiftCode: Joi.string(),
  beneficiaryBankAddress: Joi.string(),
  iban: Joi.string(),
  currency: Joi.string(),
});
