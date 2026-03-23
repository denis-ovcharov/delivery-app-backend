import Joi from 'joi';

const orderItemSchema = Joi.object({
  product: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().integer().min(1).required()
});

export const createOrderSchema = {
  body: Joi.object({
    items: Joi.array().items(orderItemSchema).min(1).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\+?[\d\s\-()]{10,}$/).required(),
    address: Joi.string().min(5).max(500).required(),
    couponCode: Joi.string().uppercase().max(20).optional()
  })
};

export const getOrdersSchema = {
  query: Joi.object({
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    orderId: Joi.string().optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(10)
  })
};

export const getOrderByIdSchema = {
  params: Joi.object({
    id: Joi.string().required()
  })
};

export const reorderSchema = {
  params: Joi.object({
    id: Joi.string().required()
  })
};
