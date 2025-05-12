export interface UserData {
  firstName: string;
  lastName: string;
  shippingAddress: ShippingAddress;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  enteredPassword: string;
}

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country?: string;
}