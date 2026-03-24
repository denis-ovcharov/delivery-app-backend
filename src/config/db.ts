import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoConnectionString = process.env.MONGODB_URL;
    if (!mongoConnectionString) {
      throw new Error("MongoDB connection string is missing. Set MONGODB_URL.");
    }

    const connection = await mongoose.connect(mongoConnectionString);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
