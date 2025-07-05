import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_DB_URL;
    
    if (!mongoURI) {
      throw new Error('MONGO_DB_URL não está definida no arquivo .env');
    }

    await mongoose.connect(mongoURI);
    console.log('MongoDB conectado com sucesso');
  } catch (error) {
    console.error('Erro ao conectar com MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB; 