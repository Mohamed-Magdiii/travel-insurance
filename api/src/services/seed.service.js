const { CONSTANTS } = require('../common');
const { userService, roleService, dictService } = require('.');

const addRoles = async () => {
  for (let index = 0; index < CONSTANTS.ROLES.length; index++) {
    const role = CONSTANTS.ROLES[index];
    const checkRole = await roleService.findOne({ key: role.key });
    if (!checkRole) {
      await roleService.create(role);
    }
  }
};

const addUsers = async () => {
  const adminUser = CONSTANTS.USERS[0];
  
  const adminRole = await roleService.findOne({ key: CONSTANTS.ROLES[0].key });
  const adminUserCheck = await userService.findOne({ email: adminUser.email });
  if (adminRole && !adminUserCheck) {
    await userService.createUser({
      ...CONSTANTS.USERS[0],
      roleId: adminRole._id,
     
    });
  }
};

// const addTradingAccountGroups = async () => {
//   console.log(CONSTANTS);
//   for (let index = 0; index < CONSTANTS.TRADING_ACCOUNT_GROUPS.length; index++) {
//     const group = CONSTANTS.TRADING_ACCOUNT_GROUPS[index];
//     const checkGroup = await dictService.getTradingAccountGroup({ title: group.title });
//     if (!checkGroup) {
//       await dictService.addTradingAccountGroup(group);
//     }
//   }
// };

const seeder = async () => {
  // await addRoles();
  // await addUsers();
  // await addTradingAccountGroups();
};

module.exports = seeder;
