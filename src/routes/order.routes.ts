import { Router } from 'express';
import * as OrderController from '../controllers/order.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', OrderController.getOrders);
router.post('/', OrderController.createOrder);
router.delete('/:id', authenticate, OrderController.deleteOrder);

export default router;
