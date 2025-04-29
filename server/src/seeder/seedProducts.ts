import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected for seeding.');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
};

const products = [
    {
      name: 'Classic Coffee Mug',
      description: 'White ceramic mug with a clean, minimal design.',
      price: 999,
      imageUrl: 'https://via.placeholder.com/300x300.png?text=Coffee+Mug',
      countInStock: 25,
      category: {
        name: 'kitchen',
        tags: ['mug', 'ceramic', 'drinkware']
      }
    },
    {
      name: 'Notebook Set',
      description: '3-pack of A5 grid notebooks, ideal for journaling or sketching.',
      price: 1250,
      imageUrl: 'https://via.placeholder.com/300x300.png?text=Notebooks',
      countInStock: 50,
      category: {
        name: 'stationery',
        tags: ['notebook', 'paper', 'stationery']
      }
    },
    {
      name: 'Wireless Mouse',
      description: 'Ergonomic mouse with Bluetooth and USB receiver.',
      price: 2499,
      imageUrl: 'https://via.placeholder.com/300x300.png?text=Mouse',
      countInStock: 15,
      category: {
        name: 'electronics',
        tags: ['mouse', 'wireless', 'accessory']
      }
    }
  ];

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    console.log('Existing products cleared.');

    await Product.insertMany(products);
    console.log('Sample products inserted.');

    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedProducts();
