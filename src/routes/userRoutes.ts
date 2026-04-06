import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getProfile, updateProfile } from '../controllers';
import { auth } from '../middleware';
import { updateProfileSchema } from '../validations/userValidation';

const router = Router();

router.get('/me', auth, getProfile);
router.put('/me', auth, celebrate(updateProfileSchema), updateProfile);

export default router;
