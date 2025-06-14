import { Request, Response } from 'express';
import * as ProductModel from '../models/product.model';
import { z } from 'zod';

const ProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
});

export const getProducts = async (_req: Request, res: Response) => {
  const products = await ProductModel.getAllProducts();
  res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const parsed = ProductSchema.parse(req.body);
    const newProduct = await ProductModel.createProduct(parsed.name, parsed.price);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: 'Datos inválidos', details: error });
  }
};
