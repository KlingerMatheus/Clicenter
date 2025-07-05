import { Router } from 'express';
import UserController from '../controllers/UserController';
import { validateUserData, validateUserId } from '../middleware/validation';
import { adminAuth } from '../middleware/auth';

const router = Router();

// Rotas para gerenciamento de usuários (protegidas por admin)
router.post('/users', adminAuth, validateUserData, UserController.createUser);
router.get('/users', adminAuth, UserController.getAllUsers);
router.get('/users/:id', adminAuth, validateUserId, UserController.getUserById);
router.put('/users/:id', adminAuth, validateUserId, validateUserData, UserController.updateUser);
router.delete('/users/:id', adminAuth, validateUserId, UserController.deleteUser);
router.patch('/users/:id/toggle-status', adminAuth, validateUserId, UserController.toggleUserStatus);

export default router; 