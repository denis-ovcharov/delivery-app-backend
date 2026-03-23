import { Request, Response } from 'express';
import { Coupon } from '../models';

export const getCoupons = async (_req: Request, res: Response): Promise<void> => {
  try {
    const coupons = await Coupon.find({ isActive: true }).select('-usedCount');
    res.json({ coupons });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const validateCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code } = req.body;

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      res.status(404).json({ valid: false, error: 'Coupon not found' });
      return;
    }

    if (!coupon.isActive) {
      res.status(400).json({ valid: false, error: 'Coupon is not active' });
      return;
    }

    if (coupon.expiresAt && new Date() > coupon.expiresAt) {
      res.status(400).json({ valid: false, error: 'Coupon has expired' });
      return;
    }

    if (coupon.usedCount >= coupon.maxUses) {
      res.status(400).json({ valid: false, error: 'Coupon usage limit reached' });
      return;
    }

    res.json({
      valid: true,
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        minOrderAmount: coupon.minOrderAmount
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
