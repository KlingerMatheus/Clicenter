import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { auth } from '../middleware/auth';

const router = Router();

// Rotas públicas
router.post('/login', AuthController.login);

// Rotas protegidas
router.get('/me', auth, AuthController.me);
router.put('/profile', auth, AuthController.updateProfile);

export default router; 