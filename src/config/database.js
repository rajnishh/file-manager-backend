import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import logger from './logger.js';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    if (!mongoUri && (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development')) {
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      logger.info('Using in-memory MongoDB for development/test');
    }

    if (!mongoUri) {
      throw new Error('Mongo URI is undefined');
    }

    await mongoose.connect(mongoUri);
    logger.info('MongoDB connected...');
  } catch (err) {
    logger.error('Database connection failed:', err);
    process.exit(1);
  }
};

export default connectDB;
