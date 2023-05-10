/* eslint-disable indent */
const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const BankAccountSchema = new Schema({
    recordId: { type: String },
    accountHolderName: {
        type: String,
        required: true,
    },
    bankName: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
    },
    swiftCode: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    iban: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'customers',
        required: true,
    },
}, { timestamps: true });

BankAccountSchema.plugin(mongoosePaginate);
// BankAccountSchema.index({ rec: 1 });
module.exports.Model = model('bank-accounts', BankAccountSchema);
module.exports.Schema = BankAccountSchema;
