import { Router } from 'express';
import { createOrder, getOrders, getOrderById, reorder } from '../controllers/orderController';
import { createOrderSchema, getOrdersSchema, getOrderByIdSchema, reorderSchema } from '../validations/orderValidation';
import { celebrate } from 'celebrate';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/', auth, celebrate(createOrderSchema), createOrder);
router.get('/', auth, celebrate(getOrdersSchema), getOrders);
router.get('/:id', celebrate(getOrderByIdSchema), getOrderById);
router.post('/:id/reorder', auth, celebrate(reorderSchema), reorder);

export default router;
