const { Schema, model, default: mongoose } = require("mongoose");

const PriceSchema = new Schema(
  {
    productId: { type: Schema.ObjectId, ref: "products" },
    coverType: { type: Schema.ObjectId, ref:"covers"} ,
    ageFrom: { type: String, },
    ageTo: { type: String },
    planTime: { type: Number },
    netPremium: { type: Number },
    grossPremium: { type: Number },
    ourShow: { type: Number },
  },
  { timestamps: true }
);

module.exports.Model = model("prices", PriceSchema);
module.exports.Schema = PriceSchema;
