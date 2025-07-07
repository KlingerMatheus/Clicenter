import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_DB_URL || process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGO_DB_URL ou MONGODB_URI não está definida');
}

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(MONGODB_URI!);
    return mongoose.connection;
  } catch (error) {
    console.error('Erro de conexão MongoDB:', error);
    throw error;
  }
}

export default connectDB;
