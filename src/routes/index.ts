import { Router } from 'express';
import authRoutes from './authRoutes';
import shopRoutes from './shopRoutes';
import productRoutes from './productRoutes';
import orderRoutes from './orderRoutes';
import couponRoutes from './couponRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/shops', shopRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/coupons', couponRoutes);

export default router;
