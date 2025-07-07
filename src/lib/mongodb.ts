import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_DB_URL;

if (!MONGODB_URI) {
  throw new Error('MONGO_DB_URL não está definida');
}

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(MONGODB_URI!);
    console.log('Conectado ao MongoDB');
    return mongoose.connection;
  } catch (error) {
    console.error('Erro de conexão MongoDB:', error);
    throw error;
  }
}

export default connectDB;
