import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { registerSchema, loginSchema } from '../validations/authValidation';
import { celebrate } from 'celebrate';

const router = Router();

router.post('/register', celebrate(registerSchema), register);
router.post('/login', celebrate(loginSchema), login);

export default router;
