import { Router } from 'express';
import { getCoupons, validateCoupon } from '../controllers/couponController';
import { validateCouponSchema } from '../validations/couponValidation';
import { celebrate } from 'celebrate';

const router = Router();

router.get('/', getCoupons);
router.post('/validate', celebrate(validateCouponSchema), validateCoupon);

export default router;
