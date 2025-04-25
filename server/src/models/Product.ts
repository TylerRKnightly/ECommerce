import mongoose, { Schema, Document } from 'mongoose';
import { Category } from './Category';
import { create } from 'domain';

export interface IProduct extends Document {
  name: string;
  description: string;
  createdDate?: Date;
  price: number;
  imageUrl: string;
  countInStock: number;
  category: Category | string; // Category can be a string or an object
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdDate: { type: Date, default: Date.now },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  countInStock: { type: Number, required: true },
  category: { 
    name: { type: String, required: true },
    tags: [{ type: String }]
  },
});

export default mongoose.model<IProduct>('Product', ProductSchema);