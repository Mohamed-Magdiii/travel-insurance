/* eslint-disable linebreak-style */
const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const jwt = require("jsonwebtoken");
const { keys } = require("../common");

const UserSchema = new Schema(
  {
    // recordId: { type: String },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    roleId: {
        type: Schema.ObjectId,
        ref: "Role",
      },
    password: {
      type: String,
    },
    productId: {
      type: Schema.ObjectId,
      ref: "products",
    },
    customerId: { type: Schema.ObjectId, ref: "customers"},
    nameEn: {
      type: String,
    },
    nameAr: {
      type: String,
    },
    
    isActive: {
      type: Boolean,
      default: true,
    },
    from: String,
    to:String,
    issuing: {
      type: Boolean,
      default: false,
    },
    incentive: String,
    incentiveAmount: String,
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = async (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
    is_active: user.isActive,
    roleId: user.roleId,
  };

  const token = jwt.sign(payload, keys.jwtKey, { expiresIn: "1h" });
  return token;
};

UserSchema.index({
  username: 1,
  product: 1,
  email: 1,
  phone: 1,
  createdAt: 1,
});

UserSchema.plugin(mongoosePaginate);
// UserSchema.index({ rec: 1 });

module.exports.Model = model("users", UserSchema);
module.exports.Schema = UserSchema;
