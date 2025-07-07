import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();
    
    res.status(200).json({
      success: true,
      message: 'Conexão com MongoDB estabelecida com sucesso',
      environment: {
        nodeEnv: process.env.NODE_ENV,
        isVercel: process.env.VERCEL === '1',
        hasMongoDB: !!process.env.MONGO_DB_URL || !!process.env.MONGODB_URI,
      }
    });
  } catch (error) {
    console.error('Erro no teste:', error);
    res.status(500).json({
      success: false,
      message: 'Erro na conexão',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
} 