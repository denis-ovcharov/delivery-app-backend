import Joi from 'joi';

export const validateCouponSchema = {
  body: Joi.object({
    code: Joi.string().uppercase().min(3).max(20).required()
  })
};
