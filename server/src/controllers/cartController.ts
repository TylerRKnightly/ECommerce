import { RequestHandler } from 'express';
import Cart from '../models/Cart';
import Product from '../models/Product';
import { AuthenticatedRequest } from '../types/express';

export const getCart: RequestHandler = async (
  req: AuthenticatedRequest,
  res
): Promise<void> => {
  try {
    const cart = await Cart.findOne({ user: req.user!._id }).populate('items.product');
    res.status(200).json(cart || { user: req.user!._id, items: [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

export const updateCart: RequestHandler = async (
  req: AuthenticatedRequest,
  res
): Promise<void> => {
  try {
    const items = req.body.items;

    if (!Array.isArray(items) || items.some(item => !item.product || item.qty < 1)) {
      res.status(400).json({ error: 'Invalid cart format' });
      return;
    }

    const updatedCart = await Cart.findOneAndUpdate(
      { user: req.user!._id },
      { items },
      { upsert: true, new: true }
    );

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
};

export const clearCart: RequestHandler = async (
  req: AuthenticatedRequest,
  res
): Promise<void> => {
  try {
    await Cart.findOneAndDelete({ user: req.user!._id });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};
