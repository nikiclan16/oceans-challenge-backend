import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';




dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);

app.use('/orders', orderRoutes);

export default app;
