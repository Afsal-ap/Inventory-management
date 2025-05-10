import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  mobile: { type: String, required: true }
}, { timestamps: true });

export const CustomerModel = mongoose.model('Customer', customerSchema);
