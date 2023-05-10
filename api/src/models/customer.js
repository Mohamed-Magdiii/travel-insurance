const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const jwt = require('jsonwebtoken');
const { keys, CONSTANTS } = require('../common');

const CustomerSchema = new Schema(
  {
    customerCode: { type: String  },
    parentBroker: {  type: Schema.ObjectId, ref: 'customers' , default:null },
    nameEn: { type: String, },
    nameAr: { type: String, },
    shortNameEn: { type: String, },
    shortNameAr: { type: String, },
    customerType: { type: String},
    productId: { type: Schema.ObjectId ,ref:'products' },
    from: { type: String, },
    to: { type: String, },
    bookFees: { type: String },
    policyAbbreviation: { type: String },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);



CustomerSchema.index({
  customerCode: 1,
  parentBroker: 1,
  nameEn: 1,
  shortNameEn: 1,
  customerType: 1,
  nationality: 1,
  productId: 1,
  bookFees: 1,
  createdAt: -1,
});

CustomerSchema.plugin(mongoosePaginate);

// CustomerSchema.index({ rec: 1 });

module.exports.Model = model('customers', CustomerSchema);
module.exports.Schema = CustomerSchema;
