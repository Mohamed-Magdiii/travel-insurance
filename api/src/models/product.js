const {Schema, model} = require("mongoose");

const ProductSchema = new Schema({
  code: { type: Number, required: true },
  desc: { type: String },
  descBl: { type: String },
  shortDesc: { type: String },
  shortDescBl: { type: String },
  classCode: { type: String },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
}, {timestamps: true});


module.exports.Model = model('products', ProductSchema);
module.exports.Schema = ProductSchema;