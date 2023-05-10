// exporting all validations

const customerValidations = require('./customer');
const authValidations = require('./auth');
const transactionValidations = require('./transaction');
const bankAccountValidations = require('./bank-account');

module.exports = {
  customerValidations,
  authValidations,
  transactionValidations,
  bankAccountValidations,
};
