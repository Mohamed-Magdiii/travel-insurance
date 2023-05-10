/* eslint-disable object-property-newline */
// Exporting all schemas
const UserModel = require('./user');
const RoleModel = require('./role');
const BankAccountModel = require('./bank-account');
const CustomerModel = require('./customer');
const RequestModel = require('./request');
const ActivityModel = require('./activity');
const TransactionModel = require('./transaction');
const Dictionary = require('./dictionary');
const ProductModel = require('./product');
const CoverModel = require('./covers');
const CodeModel = require('./codes');
const PriceModel = require('./price-setup');

module.exports = {
  UserModel,
  RoleModel,
  CustomerModel,
  RequestModel,
  BankAccountModel,
  ActivityModel,
  TransactionModel,
  Dictionary,
  ProductModel,
  CoverModel,
  CodeModel,
  PriceModel
};
