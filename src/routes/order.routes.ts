import { Router } from 'express';
import * as OrderController from '../controllers/order.controller';

const router = Router();

router.get('/', OrderController.getOrders);
router.post('/', OrderController.createOrder);

export default router;
