import mongoose from 'mongoose';
import { seedDatabase } from '../utils/seed';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/book_ecommerce';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB conectado');

    await seedDatabase();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro de conexão no MongoDb:', error.message);
    } else {
      console.error('Erro de conexão no MongoDb:', error);
    }
    process.exit(1);
  }
};
