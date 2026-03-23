import { Request, Response } from 'express';
import { Order, Coupon, Product } from '../models';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items, email, phone, address, couponCode } = req.body;

    let discount = 0;
    let appliedCoupon = null;

    if (couponCode) {
      appliedCoupon = await Coupon.findOne({ 
        code: couponCode.toUpperCase(), 
        isActive: true 
      });

      if (appliedCoupon) {
        if (appliedCoupon.expiresAt && new Date() > appliedCoupon.expiresAt) {
          res.status(400).json({ error: 'Coupon has expired' });
          return;
        }

        if (appliedCoupon.usedCount >= appliedCoupon.maxUses) {
          res.status(400).json({ error: 'Coupon usage limit reached' });
          return;
        }
      }
    }

    const totalAmount = items.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
      0
    );

    if (appliedCoupon && totalAmount >= (appliedCoupon.minOrderAmount || 0)) {
      if (appliedCoupon.discountType === 'percentage') {
        discount = (totalAmount * appliedCoupon.discountValue) / 100;
      } else {
        discount = appliedCoupon.discountValue;
      }
      await Coupon.updateOne({ _id: appliedCoupon._id }, { $inc: { usedCount: 1 } });
    }

    const finalAmount = totalAmount - discount;

    const order = new Order({
      user: (req as any).user?.userId,
      items,
      totalAmount,
      discount,
      finalAmount,
      email,
      phone,
      address,
      couponCode: couponCode?.toUpperCase()
    });

    await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, phone, orderId, page = 1, limit = 10 } = req.query;
    const userId = (req as any).user?.userId;

    const filter: Record<string, unknown> = {};

    if (userId) {
      filter.user = userId;
    }

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

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const reorder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    const currentProducts = await Product.find({ _id: { $in: order.items.map(i => i.product) } });
    const availableProductIds = new Set(currentProducts.map(p => p._id.toString()));

    const availableItems = order.items
      .filter(item => availableProductIds.has(item.product.toString()))
      .map(item => ({
        product: item.product,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));

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
