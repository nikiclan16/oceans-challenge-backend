import { Router } from 'express';
import * as ProductController from '../controllers/product.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/all', ProductController.getProducts);
router.post('/', ProductController.createProduct);
router.put('/:id',ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/', authenticate, ProductController.listPaginatedProducts);

export default router;
