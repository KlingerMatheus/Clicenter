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
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI não está definida');
    }
    await mongoose.connect(MONGODB_URI);
    return mongoose.connection;
  } catch (error) {
    throw error;
  }
}

export default connectDB;
