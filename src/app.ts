import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { authenticate } from './middleware/auth.middleware';

import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';
import authRoutes from './routes/auth.routes';




dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);

app.use('/orders', authenticate, orderRoutes);

app.use('/auth', authRoutes);

export default app;
