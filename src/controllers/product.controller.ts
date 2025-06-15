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

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = ProductSchema.parse(req.body);

    const isProduct = await ProductModel.verifyProduct(parsed.name);
    if (isProduct.rows.length > 0) {
      res.status(400).json({ error: 'El producto ya fue creado' });
      return;
    }

    const newProduct = await ProductModel.createProduct(parsed.name, parsed.price);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: 'Datos inválidos', details: error });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, price } = req.body;

  if (!name || price === undefined) {
    res.status(400).json({ error: 'Datos inválidos' });
    return;
  }

  const updated = await ProductModel.editProduct(Number(id), name, price);
  if (!updated) {
    res.status(404).json({ error: 'Producto no encontrado' });
    return;
  }

  res.json(updated);
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const deleted = await ProductModel.deleteProduct(Number(id));
  if (!deleted) {
    res.status(404).json({ error: 'Producto no encontrado' });
    return;
  }

  res.json(deleted);
};

export const listPaginatedProducts = async (req: Request, res: Response): Promise<void> => {
  const limit = parseInt(req.query.limit as string) || 5;
  const page = parseInt(req.query.page as string) || 1;
  const offset = (page - 1) * limit;

  const result = await ProductModel.getPaginatedProducts(limit, offset);

  res.json({
    products: result.data,
    total: result.total,
    page,
    limit,
    totalPages: Math.ceil(result.total / limit),
  });
};
