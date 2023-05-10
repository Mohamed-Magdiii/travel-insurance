const { Schema, model, default: mongoose } = require("mongoose");

const CodeSchema = new Schema(
  {
    productId: { type: Schema.ObjectId, ref: "products" },
    codeType: { type: Schema.ObjectId, ref:"codes"} ,
    coverType: { type: String},
    desc: { type: String, },
    descAr: { type: String },
    serialNumber: { type: String },
    valueFrom: { type: String },
    valueTo: { type: String },
  },
  { timestamps: true }
);

module.exports.Model = model("codes", CodeSchema);
module.exports.Schema = CodeSchema;
