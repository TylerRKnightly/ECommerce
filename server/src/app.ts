import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';
import path from 'path';
import cartRoutes from './routes/cartRoutes';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorMiddleware';

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
console.log('Mounting /api/products');
app.use('/api/products', productRoutes);

console.log('Mounting /api/auth');
app.use('/api/auth', authRoutes);

console.log('Mounting /api/orders');
app.use('/api/orders', orderRoutes);

console.log('Mounting /api/cart');
app.use('/api/cart', cartRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
    );
  }

export default app;