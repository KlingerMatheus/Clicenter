// Detecta se está rodando no Vercel ou localmente
const isVercel = process.env.VERCEL === '1';
const isLocal = process.env.NODE_ENV === 'development';

// URL base da API
export const API_BASE_URL = isVercel ? '/api' : 'http://localhost:3001/api';

// Configuração do MongoDB
export const MONGODB_URI = process.env.MONGO_DB_URL || process.env.MONGODB_URI;

// JWT Secret
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';

console.log('🔧 Configuração da API:', {
  environment: isVercel ? 'Vercel' : isLocal ? 'Local' : 'Production',
  apiBaseUrl: API_BASE_URL,
  hasMongoDB: !!MONGODB_URI,
  hasJWTSecret: !!JWT_SECRET,
});
