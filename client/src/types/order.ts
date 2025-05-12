import { ProductData } from "./product";
import { UserData } from "./user";

interface OrderItem {
    name: string;
    qty: number;
    price: number;
    product: ProductData;
}

interface ShippingAddress {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country?: string;
}

export interface OrderData {
    _id: string;
    user: UserData;
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