import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoUrl: string = process.env.MONGO_URL || '127.0.0.1';

mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .catch(e => {
    console.error('Connection error', e.message)
  });

export const db = mongoose.connection;
