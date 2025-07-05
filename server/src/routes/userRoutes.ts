import { Router } from 'express';
import UserController from '../controllers/UserController';
import { validateUserData, validateUserId } from '../middleware/validation';

const router = Router();

// Rotas para gerenciamento de usuários
router.post('/users', validateUserData, UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', validateUserId, UserController.getUserById);
router.put('/users/:id', validateUserId, validateUserData, UserController.updateUser);
router.delete('/users/:id', validateUserId, UserController.deleteUser);
router.patch('/users/:id/toggle-status', validateUserId, UserController.toggleUserStatus);

export default router; 