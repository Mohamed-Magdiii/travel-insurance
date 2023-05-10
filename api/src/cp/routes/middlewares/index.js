const jwt = require('jsonwebtoken');
const { keys, ResponseMessages } = require('../../../common');
const { CustomError, parseJoiObject } = require('../../../utils');

module.exports.auMW = (req, res, next) => {
  try {
    req.isAuth = true;
    const token = req.headers['x-access-token'] || req.headers.authorization;
    
    if (!token) {
      return next(new CustomError({
        ...ResponseMessages.ACCESS_DENIED,
        message: 'Access denied. No token provided.',
      }));
    }
    const decoded = jwt.verify(token, keys.jwtKey);
    console.log(decoded);
    req.user = decoded;
    return next();
  } catch (ex) {
    return next(new CustomError({
      ...ResponseMessages.ACCESS_DENIED,
      message: 'Access denied. No token provided.',
    }));
  }
};
// module.exports.authRole = async (role) => {
//   return (req, res, next) => {
//     const user = await 
//       if (req.user) {
//           res.status(401)
//           return res.send('Not allowed')
//       }

//       next()
//   }
// }
module.exports.vlMW = (validationObject, isGet = false) => (req, res, next) => {
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
