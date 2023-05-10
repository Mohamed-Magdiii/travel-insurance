const customerWatcher = require('./customer');
const transactionWatcher = require('./transaction');
const requestWatcher = require('./request');

module.exports = () => {
  setTimeout(() => {
    customerWatcher();
    transactionWatcher();
    requestWatcher();
  }, 3000);
};
