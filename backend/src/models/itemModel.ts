import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
}, { timestamps: true });

export const ItemModel = mongoose.model('Item', itemSchema);
