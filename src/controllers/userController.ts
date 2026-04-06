import { Response } from 'express';
import { User } from '../models';
import { AuthRequest } from '../middleware';

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.userId).select('-password');

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        defaultAddress: user.defaultAddress,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, defaultAddress } = req.body;

    const user = await User.findById(req.user?.userId);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (defaultAddress !== undefined) {
      user.defaultAddress = defaultAddress;
    }

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        defaultAddress: user.defaultAddress,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
