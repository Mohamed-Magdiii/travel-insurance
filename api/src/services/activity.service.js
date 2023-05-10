const { ActivityModel } = require('../models');
const Cruds = require('./Cruds');

class Service extends Cruds {

}

module.exports = new Service(ActivityModel.Model, ActivityModel.Schema);
