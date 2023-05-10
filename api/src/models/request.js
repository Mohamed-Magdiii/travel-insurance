const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { CONSTANTS } = require('../common');

const RequestSchema = new Schema(
  {
    recordId: { type: String },
    type: {
      type: String,
      enum: Object.keys(CONSTANTS.REQUESTS_TYPES),
      default: CONSTANTS.REQUESTS_TYPES.PARTNERSHIP,
    },
    status: {
      type: String,
      enum: Object.keys(CONSTANTS.REQUESTS_STATUS),
      default: CONSTANTS.REQUESTS_STATUS.PENDING,
    },
    customerId: { type: Schema.Types.ObjectId, ref: 'customers' },
    processedBy: { type: Schema.Types.ObjectId, ref: 'users' },
    content: {
      type: Schema.Types.Mixed,
    },
  },
  { timestamps: true },
);

RequestSchema.index({
  type: 1,
  status: 1,
  customerId: 1,
  createdAt: 1,
});

RequestSchema.plugin(mongoosePaginate);

module.exports.Model = model('request', RequestSchema);
module.exports.Schema = RequestSchema;
