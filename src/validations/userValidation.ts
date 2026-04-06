import Joi from 'joi';

export const updateProfileSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(100),
    email: Joi.string().email(),
    phone: Joi.string().max(20),
    defaultAddress: Joi.string().max(500),
  }).min(1),
};
