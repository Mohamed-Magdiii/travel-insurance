const { logger } = require('../common');
const { UserModel } = require('../models');
const { encryptPassword, comparePassword } = require('../utils');
const Cruds = require('./Cruds');

class UserService extends Cruds {
  async createUser(params) {
    const user = await this.findOne({ username: params.username });
    if (user) throw new Error('Username already existed.');

    const newUser = new UserModel.Model(params);
    newUser.password = await encryptPassword(newUser.password);
        
    const userAdded = await newUser.save();
    const token =await UserModel.Model(newUser).generateAuthToken(newUser);
    return { user: userAdded, token };
  }

  async loginCrm(username, password) {
      
    const user = await this.findOne({ username },{}, {populate:'roleId'})
    if (!user) throw new Error('Invalid credentials');
    if (!user.isActive) throw new Error('User disabled, please contact admin.');
    const passwordMatch = await comparePassword(password, user.password);
    console.log(user)

    if (!passwordMatch) throw new Error('Invalid credentials');
    if (passwordMatch) {
      console.log(passwordMatch)
      const token =await UserModel.Model(user).generateAuthToken(user);
      return {
        token,
        email: user.email,
        roleId: user.roleId,
      };
    }
    throw new Error('Invalid credentials');
  }
  

}
module.exports = new UserService(UserModel.Model, UserModel.Schema);
