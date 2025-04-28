import mongoose, { Schema, Document } from 'mongoose';

interface OrderItem {
  name: string;
  qty: number;
  price: number;
  product: mongoose.Types.ObjectId;
}

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  createdAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: {
      type: [
        {
          name: { type: String, required: true },
          qty: { type: Number, required: true },
          price: { type: Number, required: true },
          product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        },
      ],
      validate: [(val: any[]) => val.length > 0, 'Order must have at least one item'],
    },
    shippingAddress: {
      type: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
      },
      required: true,
      validate: {
        validator: function (value: any) {
          // Ensure the object is not empty and all required fields are present
          return (
            value &&
            typeof value === 'object' &&
            Object.keys(value).length > 0 &&
            value.fullName &&
            value.address &&
            value.city &&
            value.postalCode &&
            value.country
          );
        },
        message: 'Shipping address must be a non-empty object with all required fields',
      },
    },
    paymentMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>('Order', OrderSchema);
