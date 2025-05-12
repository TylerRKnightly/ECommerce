
import Order from '../models/Order';
import { Response } from 'express';
import { AuthenticatedRequest } from '../types/express';
import Product from '../models/Product';
import mongoose, { ClientSession } from 'mongoose';


export const createOrder = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const session: ClientSession = await mongoose.startSession();
  
    try {
      const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;
  
      if (!orderItems || orderItems.length === 0) {
        res.status(400).json({ error: 'No order items' });
        return;
      }
  
      session.startTransaction();
  
      // 1. Atomically check and decrement inventory
      for (const item of orderItems) {
        const updateResult = await Product.updateOne(
          {
            _id: item.product,
            countInStock: { $gte: item.qty }, // only if enough stock
          },
          {
            $inc: { countInStock: -item.qty },
          },
          { session }
        );
  
        if (updateResult.modifiedCount === 0) {
          throw new Error(
            `Insufficient stock for product ${item.name} — please reduce quantity or try later.`
          );
        }
      }
  
      // 2. Create the order after all inventory updates succeed
      const order = new Order({
        user: req.user!._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
      });
  
      const createdOrder = await order.save({ session });
  
      await session.commitTransaction();
      session.endSession();
  
      res.status(201).json(createdOrder);
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      res.status(400).json({ error: (err as Error).message });
    }
  };
  
  export const getMyOrders = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    console.log('🛠️ getMyOrders route hit');
    try {
      console.log('🔍 getMyOrders called by user:', req.user);
  
      if (!req.user || !req.user._id) {
        console.warn('⚠️ No user found in request');
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
  
      const userId = req.user._id.toString();
      console.log('📦 Fetching orders for user ID:', userId);
  
      const orders = await Order.find({ user: userId });
  
      console.log(`✅ Found ${orders.length} orders for user ${userId}`);
      console.log('📦 Orders:', orders);
  
      res.json(orders);
    } catch (err) {
      console.error('❌ Error in getMyOrders:', err);
      res.status(500).json({ error: 'Server error fetching orders' });
    }
  };
  

  export const getOrderById = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { orderId } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        res.status(400).json({ error: 'Invalid order ID' });
        return;
      }
  
      const order = await Order.findById(orderId).populate('user', 'name email');
  
      if (!order) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }
  
      // 🛡️ Enforce ownership or admin role
      if (order.user._id.toString() !== req.user!._id.toString() && req.user!.role !== 'admin') {
        res.status(403).json({ error: 'Not authorized to view this order' });
        return;
      }
  
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ error: 'Server error fetching the order' });
    }
  };
  