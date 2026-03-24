import mongoose from 'mongoose';
import { Response } from 'express';
import { Order, Coupon, Product } from '../models';
import { AuthRequest } from '../middleware/auth';

interface CreateOrderItemInput {
  product: string;
  quantity: number;
}

interface CreateOrderBody {
  items: CreateOrderItemInput[];
  email: string;
  phone: string;
  address: string;
  couponCode?: string;
}

interface HttpError extends Error {
  statusCode?: number;
}

const createHttpError = (statusCode: number, message: string): HttpError => {
  const error = new Error(message) as HttpError;
  error.statusCode = statusCode;
  return error;
};

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  const session = await mongoose.startSession();

  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { items, email, phone, address, couponCode } = req.body as CreateOrderBody;
    let createdOrder = null;

    await session.withTransaction(async () => {
      const uniqueProductIds = [...new Set(items.map((item) => item.product))];
      const products = await Product.find({ _id: { $in: uniqueProductIds } })
        .select('_id name price')
        .session(session);

      if (products.length !== uniqueProductIds.length) {
        throw createHttpError(400, 'One or more products do not exist');
      }

      const productMap = new Map(products.map((product) => [product._id.toString(), product]));
      const orderItems = items.map((item) => {
        const product = productMap.get(item.product);
        if (!product) {
          throw createHttpError(400, `Product not found: ${item.product}`);
        }

        return {
          product: product._id,
          name: product.name,
          price: product.price,
          quantity: item.quantity
        };
      });

      const totalAmount = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      let discount = 0;
      let normalizedCouponCode: string | undefined;

      if (couponCode) {
        const now = new Date();
        normalizedCouponCode = couponCode.toUpperCase();
        const appliedCoupon = await Coupon.findOne({
          code: normalizedCouponCode,
          isActive: true
        }).session(session);

        if (!appliedCoupon) {
          throw createHttpError(404, 'Coupon not found');
        }

        if (appliedCoupon.expiresAt && now > appliedCoupon.expiresAt) {
          throw createHttpError(400, 'Coupon has expired');
        }

        if (totalAmount < (appliedCoupon.minOrderAmount || 0)) {
          throw createHttpError(
            400,
            `Minimum order amount for this coupon is ${appliedCoupon.minOrderAmount}`
          );
        }

        if (appliedCoupon.discountType === 'percentage') {
          discount = (totalAmount * appliedCoupon.discountValue) / 100;
        } else {
          discount = appliedCoupon.discountValue;
        }

        discount = Math.min(discount, totalAmount);

        const couponUpdateResult = await Coupon.updateOne(
          {
            _id: appliedCoupon._id,
            isActive: true,
            usedCount: { $lt: appliedCoupon.maxUses },
            $or: [
              { expiresAt: { $exists: false } },
              { expiresAt: null },
              { expiresAt: { $gt: now } }
            ]
          },
          { $inc: { usedCount: 1 } },
          { session }
        );

        if (couponUpdateResult.modifiedCount === 0) {
          throw createHttpError(409, 'Coupon usage limit reached');
        }
      }

      const finalAmount = Math.max(totalAmount - discount, 0);

      const order = new Order({
        user: userId,
        items: orderItems,
        totalAmount,
        discount,
        finalAmount,
        email,
        phone,
        address,
        couponCode: normalizedCouponCode
      });

      createdOrder = await order.save({ session });
    });

    res.status(201).json({
      message: 'Order created successfully',
      order: createdOrder
    });
  } catch (error) {
    const statusCode = (error as HttpError).statusCode || 500;
    console.error('Create order error:', error);
    res.status(statusCode).json({
      error: statusCode === 500 ? 'Server error' : (error as Error).message
    });
  } finally {
    await session.endSession();
  }
};

export const getOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { email, phone, orderId, page = 1, limit = 10 } = req.query;

    const filter: Record<string, unknown> = { user: userId };

    if (email) filter.email = email;
    if (phone) filter.phone = phone;
    if (orderId) filter._id = orderId;

    const skip = (Number(page) - 1) * Number(limit);

    const [orders, total] = await Promise.all([
      Order.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      Order.countDocuments(filter)
    ]);

    res.json({
      orders,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const order = await Order.findOne({ _id: req.params.id, user: userId });
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const reorder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const order = await Order.findOne({ _id: req.params.id, user: userId });
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    const currentProducts = await Product.find({ _id: { $in: order.items.map(i => i.product) } })
      .populate('shop', 'name');
    const currentProductMap = new Map(
      currentProducts.map((product) => [product._id.toString(), product])
    );

    const availableItems = order.items
      .map((item) => {
        const product = currentProductMap.get(item.product.toString());
        if (!product) {
          return null;
        }

        return {
          product,
          quantity: item.quantity
        };
      })
      .filter((item): item is { product: (typeof currentProducts)[number]; quantity: number } => Boolean(item));

    if (availableItems.length === 0) {
      res.status(400).json({ error: 'No products available for reorder' });
      return;
    }

    res.json({
      message: 'Products added to cart',
      items: availableItems,
      originalItemsCount: order.items.length,
      availableItemsCount: availableItems.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
