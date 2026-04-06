import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  defaultAddress: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, minlength: 2 },
  email: { type: String, required: true, lowercase: true, trim: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  phone: { type: String, default: '' },
  defaultAddress: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
