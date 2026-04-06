import Joi from 'joi';

export const updateProfileSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(100),
    defaultAddress: Joi.string().max(500),
  }).min(1),
};
