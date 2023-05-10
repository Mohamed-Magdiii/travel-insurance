const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ActivitySchema = new Schema(
  {
    recordId: { type: String },
    log: {
      type: String,
    },
    time: {
      type: Date,
      default: Date.now(),
    },
    details: {
      type: String,
    },
    type: {
      type: String,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'customers',
      required: true,
    },
  },
  { timestamps: true },
);

ActivitySchema.index({
  type: 1,
  customerId: 1,
  createdAt: 1,
});

ActivitySchema.plugin(mongoosePaginate);

// ActivitySchema.index({ rec: 1 });
module.exports.Model = model('Activity', ActivitySchema);
module.exports.Schema = ActivitySchema;
