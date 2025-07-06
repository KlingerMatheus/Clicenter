import { Request, Response } from 'express';
import UserService from '../services/UserService';

export class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      // Verificar se está tentando criar um admin
      if (req.body.role === 'admin') {
        res.status(403).json({
          success: false,
          message: 'Não é permitido criar usuários administradores',
        });
        return;
      }

      const user = await UserService.createUser(req.body);
      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error ? error.message : 'Erro interno do servidor',
      });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();

      // Filtrar usuários admin da lista
      const filteredUsers = users.filter((user) => user.role !== 'admin');

      res.status(200).json({
        success: true,
        data: filteredUsers,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : 'Erro interno do servidor',
      });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Usuário não encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : 'Erro interno do servidor',
      });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Verificar se está tentando alterar para admin
      if (req.body.role === 'admin') {
        res.status(403).json({
          success: false,
          message: 'Não é permitido alterar usuários para administradores',
        });
        return;
      }

      // Verificar se o usuário que está sendo editado é admin
      const existingUser = await UserService.getUserById(id);
      if (existingUser && existingUser.role === 'admin') {
        res.status(403).json({
          success: false,
          message: 'Não é permitido editar usuários administradores',
        });
        return;
      }

      const user = await UserService.updateUser(id, req.body);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Usuário não encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error ? error.message : 'Erro interno do servidor',
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Verificar se o usuário que está sendo deletado é admin
      const existingUser = await UserService.getUserById(id);
      if (existingUser && existingUser.role === 'admin') {
        res.status(403).json({
          success: false,
          message: 'Não é permitido deletar usuários administradores',
        });
        return;
      }

      const deleted = await UserService.deleteUser(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Usuário não encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Usuário deletado com sucesso',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : 'Erro interno do servidor',
      });
    }
  }

  async toggleUserStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Verificar se o usuário que está sendo alterado é admin
      const existingUser = await UserService.getUserById(id);
      if (existingUser && existingUser.role === 'admin') {
        res.status(403).json({
          success: false,
          message:
            'Não é permitido alterar o status de usuários administradores',
        });
        return;
      }

      const user = await UserService.toggleUserStatus(id);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Usuário não encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : 'Erro interno do servidor',
      });
    }
  }
}

export default new UserController();
