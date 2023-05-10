const Joi = require('joi');

module.exports.addBankAccount = Joi.object({
  accountHolderName: Joi.string().required(),
  bankName: Joi.string().required(),
  address: Joi.string().required(),
  iban: Joi.string().required().length(16),
  currency: Joi.string().required(),
  accountNumber: Joi.string().required(),
  swiftCode: Joi.string().required(),
});
