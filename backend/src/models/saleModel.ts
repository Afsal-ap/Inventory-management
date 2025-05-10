import mongoose from 'mongoose';
const saleSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  quantity: { type: Number, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', default: null },
  isCash: { type: Boolean, required: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export const SaleModel = mongoose.model('Sale', saleSchema);
