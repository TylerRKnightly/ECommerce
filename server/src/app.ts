import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';
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

export default app;