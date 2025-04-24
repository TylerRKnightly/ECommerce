import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('api/orders', orderRoutes);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
    );
  }

export default app;