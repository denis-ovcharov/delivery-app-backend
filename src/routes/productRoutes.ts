import { Router } from 'express';
import { getProducts, getProductById } from '../controllers/productController';
import { getProductsSchema } from '../validations/productValidation';
import { celebrate } from 'celebrate';

const router = Router();

router.get('/', celebrate(getProductsSchema), getProducts);
router.get('/:id', getProductById);

export default router;
