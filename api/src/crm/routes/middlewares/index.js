const jwt = require('jsonwebtoken');
const { keys, ResponseMessages, logger } = require('../../../common');
const { UserModel } = require('../../../models');
const { userService } = require('../../../services');
const { CustomError, parseJoiObject } = require('../../../utils');

const authMiddleware = (req, res, next) => {
  req.isAuth = true;
  const token = req.headers['x-access-token'] || req.headers.authorization?.split(' ')[1] ;
  if (!token) {
    return next(new CustomError({
      message: 'Access denied. No token provided.',
      code: ResponseMessages.ACCESS_DENIED.code,
    }));
  }
  try {

    const decoded = jwt.verify(token, keys.jwtKey);
    req.user = decoded;
    return next();
  } catch (ex) {
    console.log(ex);
    return res.status(400).send({
      message: 'Invalid token Access denied. No token provided.',
      status: false,
    });
  }
};
const authRole = (...allowedRoles) => {
  return async(req, res, next) => {
    if (req.user) {
      const rolesArray = [...allowedRoles]
      
     const result = rolesArray.includes(req.user.roleId.key)
      if (!result) {
        res.status(401)
        return res.send('You are not allowed to do this')
    }
    }
      next()
   
      
  }
}
validationMiddleware = (validationObject, isGet = false) => (req, res, next) => {
  req.apiParams = parseJoiObject(validationObject);
  const body = isGet ? req.query : req.body;
  const { error } = validationObject.validate(body);
  if (error) {
    return next(new CustomError({
      ...ResponseMessages.JOI_VALIDATION_ERROR,
         message: error.message, 
    }));
  }
  return next();
};

validationPathMiddleware = (validationObject) => (req, res, next) => {
  req.pathParams = parseJoiObject(validationObject);
  const body = req.params;
  console.log(req);
  const { error } = validationObject.validate(body);
  if (error) {
    return next(new CustomError({
      ...ResponseMessages.JOI_VALIDATION_ERROR,
      message: error.message,
    }));
  }
};


module.exports ={authMiddleware,validationMiddleware , validationPathMiddleware ,authRole}