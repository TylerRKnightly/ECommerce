import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import OrderModel, { IOrder } from '../../src/models/Order';

let mongoServer: MongoMemoryServer;

describe('Order Model', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });
  
  afterEach(async () => {
    await OrderModel.deleteMany({});
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  const validOrderData = {
    user: new mongoose.Types.ObjectId(),
    orderItems: [
      {
        name: 'Test Product',
        qty: 2,
        price: 50,
        product: new mongoose.Types.ObjectId(),
      },
    ],
    shippingAddress: {
      fullName: 'John Doe',
      address: '123 Main St',
      city: 'Orlando',
      postalCode: '32801',
      country: 'USA',
    },
    paymentMethod: 'Credit Card',
    totalPrice: 100,
  };

  it('should create and save an order successfully', async () => {
    const order = new OrderModel(validOrderData);
    const savedOrder = await order.save();

    expect(savedOrder._id).toBeDefined();
    expect(savedOrder.isPaid).toBe(false);
    expect(savedOrder.isDelivered).toBe(false);
    expect(savedOrder.createdAt).toBeInstanceOf(Date);
  });

  it('should fail to create an order without required fields', async () => {
    const invalidOrder = new OrderModel({});

    let error: any;
    try {
      await invalidOrder.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.name).toBe('ValidationError');
    expect(error.errors['user']).toBeDefined();
    expect(error.errors['orderItems']).toBeDefined();
    expect(error.errors['shippingAddress']).toBeDefined();
    expect(error.errors['paymentMethod']).toBeDefined();
    expect(error.errors['totalPrice']).toBeDefined();
  });

  it('should allow optional fields paidAt and deliveredAt to be undefined', async () => {
    const order = new OrderModel(validOrderData);
    const savedOrder = await order.save();

    expect(savedOrder.paidAt).toBeUndefined();
    expect(savedOrder.deliveredAt).toBeUndefined();
  });

  it('should save paidAt and deliveredAt when provided', async () => {
    const now = new Date();
    const order = new OrderModel({
      ...validOrderData,
      isPaid: true,
      paidAt: now,
      isDelivered: true,
      deliveredAt: now,
    });
    const savedOrder = await order.save();

    expect(savedOrder.isPaid).toBe(true);
    expect(savedOrder.isDelivered).toBe(true);
    expect(savedOrder.paidAt).toEqual(now);
    expect(savedOrder.deliveredAt).toEqual(now);
  });

  it('should fail if orderItem is missing required fields', async () => {
    const invalidOrderData = {
      ...validOrderData,
      orderItems: [
        {
          name: 'Incomplete Product',
          qty: 2,
        },
      ],
    };

    const order = new OrderModel(invalidOrderData);

    let error: any;
    try {
      await order.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.name).toBe('ValidationError');
    expect(error.errors['orderItems.0.price']).toBeDefined();
    expect(error.errors['orderItems.0.product']).toBeDefined();
  });
});
