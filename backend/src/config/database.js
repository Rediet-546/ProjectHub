// src/database.js or config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // <<< MUST be called before using process.env

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in .env file');
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
