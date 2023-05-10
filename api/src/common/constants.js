module.exports.ROLES = [
    {
  title: 'Admin',
  key: 'admin',
  permissions: [],
}

];
module.exports.ROLE ={
  ADMIN : 'admin',
  USER:"user",
  MANAGER:"manager",
}
module.exports.USERS = [{
  firstName: 'admin',
  lastName: 'Use`r',
  email: 'admin@admin.com',
  password: 'admin123',
}];

module.exports.REQUESTS_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

module.exports.REQUESTS_TYPES = {
  PARTNERSHIP: 'PARTNERSHIP',
};

module.exports.TRANSACTIONS_TYPES = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAW: 'WITHDRAW',
  INTERNAL_TRANSFER: 'INTERNAL_TRANSFER',
};

module.exports.TRANSACTIONS_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

module.exports.TRANSACTIONS_GATEWAYS = {
  WIRE_TRANSFER: 'WIRE_TRANSFER',
  '': '',
};

module.exports.DCOUMENTS_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

module.exports.CUSTOMER_TYPES = {
  DEMO: 'DEMO',
  LIVE_INDIVIDUAL: 'LIVE_INDIVIDUAL',
};

module.exports.CUSTOMER_SOURCES = {
  REGISTER_DEMO: 'REGISTER_DEMO',
  REGISTER_LIVE_INDIVIDUAL: 'REGISTER_LIVE_INDIVIDUAL',
  REGISTER_CRM: 'REGISTER_CRM',
};


// module.exports.TRADING_ACCOUNT_GROUPS{
  
// }