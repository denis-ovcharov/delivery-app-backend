import { Router } from 'express';
import { getShops, getShopById } from '../controllers/shopController';
import { getShopsSchema, getShopByIdSchema } from '../validations/productValidation';
import { celebrate } from 'celebrate';

const router = Router();

router.get('/', celebrate(getShopsSchema), getShops);
router.get('/:id', celebrate(getShopByIdSchema), getShopById);

export default router;
