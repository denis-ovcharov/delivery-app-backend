import Joi from 'joi';

export const getProductsSchema = {
  query: Joi.object({
    shopId: Joi.string().optional(),
    category: Joi.string().optional(),
    search: Joi.string().optional(),
    sortBy: Joi.string().valid('price', 'name', 'createdAt').default('createdAt'),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(20)
  })
};

export const getShopsSchema = {
  query: Joi.object({
    category: Joi.string().optional(),
    minRating: Joi.number().min(0).max(5).optional(),
    maxRating: Joi.number().min(0).max(5).optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(20)
  })
};
