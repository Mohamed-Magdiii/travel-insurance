const { Schema, model, default: mongoose } = require("mongoose");

const CoverSchema = new Schema(
  {
    productId: { type: Schema.ObjectId, ref: "products" },
    parentCover: { type: Schema.ObjectId, ref: "covers" } ,
    coverCode: { type: String, required: true} ,
    coverType: { type: String,  enum:['additional', 'basic' , 'discount'], default: 'basic' },
    nameEn: { type: String, },
    nameAr: { type: String },
    shortNameEn: { type: String },
    shortNameAr: { type: String },
    longDescrEn: { type: String },
    longDescrAr: { type: String },
    from: { type: String },
    to: { type: String },
  },
  { timestamps: true }
);

module.exports.Model = model("covers", CoverSchema);
module.exports.Schema = CoverSchema;
