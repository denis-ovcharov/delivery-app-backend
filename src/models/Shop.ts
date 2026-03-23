import mongoose, { Document, Schema } from 'mongoose';

export interface IShop extends Document {
  name: string;
  description: string;
  rating: number;
  image: string;
  category: string;
  createdAt: Date;
}

const shopSchema = new Schema<IShop>({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  rating: { type: Number, required: true, min: 0, max: 5 },
  image: { type: String, default: '' },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

shopSchema.index({ rating: 1 });
shopSchema.index({ category: 1 });

const Shop = mongoose.model<IShop>('Shop', shopSchema);

export default Shop;
