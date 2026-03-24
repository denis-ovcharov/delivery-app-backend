import mongoose, { Document, Schema } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderAmount?: number;
  maxUses: number;
  usedCount: number;
  expiresAt?: Date;
  isActive: boolean;
  createdAt: Date;
}

const couponSchema = new Schema<ICoupon>({
  code: { type: String, required: true, uppercase: true },
  discountType: { type: String, enum: ["percentage", "fixed"], required: true },
  discountValue: { type: Number, required: true, min: 0 },
  minOrderAmount: { type: Number, default: 0 },
  maxUses: { type: Number, default: 1000 },
  usedCount: { type: Number, default: 0 },
  expiresAt: { type: Date },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

couponSchema.index({ code: 1 });
couponSchema.index({ isActive: 1 });

const Coupon = mongoose.model<ICoupon>("Coupon", couponSchema);

export default Coupon;
