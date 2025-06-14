import { Router } from 'express';
import { register } from '../controllers/user.controller';
import { requireAdmin } from '../middleware/role.middleware';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
router.post('/register', authenticate, requireAdmin, register);
export default router;