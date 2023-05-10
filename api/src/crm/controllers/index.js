const RoleController = require('./role.controller');
const UserController = require('./user.controller');

const BankAccountController = require('./bank-account.controller');
const ClientController = require('./customer/client.controller');
const LeadController = require('./customer/lead.controller');

const RequestController = require('./request.controller');
const ProductController = require('./product.controller');
const CoverController = require('./cover.controller');
const CustomerController = require('./customers.controller');
const CodeController = require('./code.controller');

module.exports = {
  RoleController,
  UserController,

  // customer controllers
  BankAccountController,

  ClientController,
  LeadController,

  RequestController,


  ProductController,
  CoverController,
  CustomerController,
  CodeController
};
