const Joi = require('joi');

module.exports.testValidation = Joi.object({
  num: Joi.number().required(),
});

module.exports.create = Joi.object({
 productId: Joi.string().required(),
 nameEn: Joi.string().required(),
 coverCode:Joi.string().required(),
 

}).options({ allowUnknown: true });

module.exports.update = Joi.object({
  
});

module.exports.changePassword = Joi.object({
  
});

module.exports.loginUser = Joi.object({
  
});

module.exports.salesAgent = Joi.object({
});
