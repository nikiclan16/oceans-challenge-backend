import { Request, Response } from 'express';
import * as OrderModel from '../models/order.model';
import { z } from 'zod';

const OrderSchema = z.object({
  products: z.array(
    z.object({
      productId: z.number().int().positive(),
    })
  ).min(1),
});

export const createOrder = async (req: Request, res: Response) => {
  try {
    const parsed = OrderSchema.parse(req.body);
    const order = await OrderModel.createOrder(parsed.products);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear orden', details: err });
  }
};

export const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await OrderModel.getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const deleted = await OrderModel.deleteOrder(Number(id));
  if (!deleted) {
    res.status(404).json({ error: 'Orden no encontrada' });
    return;
  }

  res.json({ message: 'Orden eliminada correctamente' });
};
