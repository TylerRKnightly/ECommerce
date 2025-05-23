import { Router } from 'express';
import { createOrder, getMyOrders } from '../controllers/orderController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/', protect, createOrder);
router.get('/mine', protect, getMyOrders);
router.get('/:orderId', protect, getMyOrders)

export default router;
