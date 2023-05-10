const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const RoleSchema = new Schema(
  {
    recordId: { type: String },
    title: {
      type: String,
      unique: true,
    },
    key: { type: String },
    permissions: {},
  },
  { timestamps: true },
);

RoleSchema.index({
  title: 1,
  key: 1,
  createdAt: 1,
});

RoleSchema.plugin(mongoosePaginate);

module.exports.Model = model('Role', RoleSchema);
module.exports.Schema = RoleSchema;
