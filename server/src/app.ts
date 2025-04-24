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
app.use('/api/products', productRoutes);
app.use(errorHandler);
app.use('/api/auth', authRoutes);
app.use(errorHandler);
app.use('api/orders', orderRoutes);
app.use(errorHandler);
app.use('/api/cart', cartRoutes);
app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
    );
  }

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
    );
  }

export default app;