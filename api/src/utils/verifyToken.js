const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
// const User = require("../models/Users");
const ctr = require("../crm/controllers").UserController;
dotenv.config();


const verifytoken = (req, res, next) => {
    console.log(req);
  const token = req.header("x-access-token") || req.headers.authorization;
  try {
    if (!token) {
        return next(new CustomError('Access denied. No token provided.'));
    } else {
      const decode = jwt.verify(token, process.env.JWT_SEC);
      req.user = decode;
      next();
    }
  } catch (error) {
      console.log(error);
    return res.status(400).send({
        message: 'Invalid token.Access denied. No token provided',
        status: false,
      });
  }
};


const verifyAuthorization = (req, res, next) => {
  try {
    verifytoken(req, res, async () => {
      let user = await ctr.getRecordById(req.user._id);
      console.log(user);
      if (req.user._id === req.params.id || user.roleId === "admin") {
        next();
      } else {
        res.status(401).json("You are not allowed to do that");
      }
    });
  } catch (error) {
      console.log(error);
    res.status(500).json({ msg: "Error from server !!", error });
  }
};
const verifyTokenAndAdmin = (req, res, next) => {
  try {
    verifyAuthorization(req, res, async () => {
      let user = await User.findById(req.user._id);
      if (user.role === "admin") {
        next();
      } else {
        res.status(401).json("You are not allowed to do that");
      }
    });
  } catch (error) {
    res.status(500).json({ msg: "Error from server !!", error });
  }
};

// const verifyAdminOrVendor = (req, res, next) => {
//   try {
//     verifytoken(req, res, async () => {
//       let user = await User.findById(req.user._id);
//       if (user.role === "admin" || user.role === "vendor") {
//         next();
//       } else {
//         res.status(401).json("You are not allowed to do that");
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ msg: "Error from server !!", error });
//   }
// };

module.exports = {
  verifytoken,
  verifyAuthorization,
//   verifyTokenAndAdmin,
//   verifyAdminOrVendor,
};
