const Joi = require('joi');

const innerPermissions = Joi.object().keys({
  key: Joi.string().required(),
  status: Joi.boolean().required(),
});

const permissions = Joi.object().keys({
  key: Joi.string().required(),
  status: Joi.boolean().required(),
  permissions: Joi.array().items(innerPermissions),
});

module.exports.create = Joi.object({
  title: Joi.string().required(),
  key: Joi.string().required(),
  permissions: Joi.array().required().items(permissions),
});

module.exports.update = Joi.object({
  title: Joi.string().allow(''),
  key:Joi.string(),
  permissions: Joi.array(),
});
