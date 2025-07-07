// Detecta se está rodando no Vercel ou localmente
const isVercel = process.env.VERCEL === '1';

// URL base da API
export const API_BASE_URL = isVercel ? '/api' : 'http://localhost:3001/api';

// Configuração do MongoDB
export const MONGODB_URI = process.env.MONGO_DB_URL || process.env.MONGODB_URI;

// JWT Secret
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
