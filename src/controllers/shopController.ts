import { Request, Response } from 'express';
import { Shop } from '../models';

export const getShops = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, minRating, maxRating, page = 1, limit = 20 } = req.query;

    const filter: Record<string, unknown> = {};

    if (category) {
      filter.category = category;
    }

    if (minRating || maxRating) {
      filter.rating = {};
      if (minRating) (filter.rating as Record<string, number>).$gte = Number(minRating);
      if (maxRating) (filter.rating as Record<string, number>).$lte = Number(maxRating);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [shops, total] = await Promise.all([
      Shop.find(filter).skip(skip).limit(Number(limit)).sort({ rating: -1 }),
      Shop.countDocuments(filter)
    ]);

    res.json({
      shops,
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

export const getShopById = async (req: Request, res: Response): Promise<void> => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      res.status(404).json({ error: 'Shop not found' });
      return;
    }
    res.json(shop);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
