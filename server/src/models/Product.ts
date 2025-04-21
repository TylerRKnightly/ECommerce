import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  countInStock: number;
  category: string;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  countInStock: { type: Number, required: true },
  category: { type: String },
});

export default mongoose.model<IProduct>('Product', ProductSchema);