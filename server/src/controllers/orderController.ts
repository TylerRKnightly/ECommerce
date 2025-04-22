import { RequestHandler } from 'express';
import Order from '../models/Order';
import { IOrder } from '../models/Order';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/express';


export const createOrder = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;
  
      if (!orderItems || orderItems.length === 0) {
        res.status(400).json({ error: 'No order items' });
        return;
      }
  
      const order = new Order({
        user: req.user!._id, // non-null assertion since it's behind protected middleware
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
      });
  
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } catch (err) {
      res.status(500).json({ error: 'Server error creating order' });
    }
  };
  
  export const getMyOrders = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const orders = await Order.find({ user: req.user!._id });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: 'Server error fetching orders' });
    }
  };