import { Request, RequestHandler, Response } from 'express';
import Product from '../models/Product';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export const getProductById: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ error: 'Invalid product ID format' });
      return;
    }

    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Invalid Product Data' });
  }
};