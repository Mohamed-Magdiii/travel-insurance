const Joi = require('joi');

module.exports.testValidation = Joi.object({
  num: Joi.number().required(),
});

module.exports.create = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  customerId: Joi.required(),
  nameEn: Joi.string(),
  nameAr: Joi.string(),
  email: Joi.string().email(),
 
}).options({ allowUnknown: true });

module.exports.update = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  nameEn: Joi.string().allow(''),
  nameAr: Joi.string(),
  isActive: Joi.boolean(),
}).options({ allowUnknown: true });

module.exports.changePassword = Joi.object({
  oldPassword: Joi.string().required().label('Old Password'),
  newPassword: Joi.string().required().label('Password'),
  cnfPassword: Joi.any().equal(Joi.ref('newPassword')).required().label('Confirm password'),
});

module.exports.loginUser = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports.salesAgent = Joi.object({
  assignedTo: Joi.string().required(),
});
