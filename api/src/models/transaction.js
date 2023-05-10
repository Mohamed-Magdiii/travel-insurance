const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { CONSTANTS } = require('../common');

const TransactionSchema = new Schema(
  {
    recordId: { type: String },
    type: {
      type: String,
      enum: Object.keys(CONSTANTS.TRANSACTIONS_TYPES),
    },
    gateway: {
      type: String,
      enum: Object.keys(CONSTANTS.TRANSACTIONS_GATEWAYS),
    },
    status: {
      type: String,
      enum: Object.keys(CONSTANTS.TRANSACTIONS_STATUS),
      default: CONSTANTS.TRANSACTIONS_STATUS.PENDING,
    },
    customerId: { type: Schema.Types.ObjectId, ref: 'customers' },
    processedBy: { type: Schema.Types.ObjectId, ref: 'users' },

    amount: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },

    comments: [{ type: String }],
  },
  { timestamps: true },
);

TransactionSchema.index({
  type: 1,
  amount: 1,
  status: 1,
  customerId: 1,
  createdAt: 1,
});

TransactionSchema.plugin(mongoosePaginate);

module.exports.Model = model('transaction', TransactionSchema);
module.exports.Schema = TransactionSchema;
