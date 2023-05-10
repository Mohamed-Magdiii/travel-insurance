const { RoleModel } = require('../models');
const Cruds = require('./Cruds');
const { permissionsGroup, logger } = require('../common');

class Role extends Cruds {
  createNewRole(params) {
   const key = params.key.toLowerCase()
   const title=params.title.toLowerCase()
 const allparams = {...params, key , title}
    return this.create(allparams);
  }
}

module.exports = new Role(RoleModel.Model, RoleModel.Schema);
