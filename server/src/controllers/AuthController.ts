import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Email e senha são obrigatórios',
        });
        return;
      }

      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Email ou senha inválidos',
        });
        return;
      }

      if (!user.isActive) {
        res.status(401).json({
          success: false,
          message: 'Usuário inativo',
        });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: 'Email ou senha inválidos',
        });
        return;
      }

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      };

      res.status(200).json({
        success: true,
        data: {
          user: userResponse,
          token,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  }

  async me(req: Request, res: Response): Promise<void> {
    try {
      // O usuário já está disponível através do middleware de auth
      const user = (req as any).user;

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as any).user;
      const { name, email, currentPassword, newPassword } = req.body;

      // Validar dados obrigatórios
      if (!name || !email) {
        res.status(400).json({
          success: false,
          message: 'Nome e email são obrigatórios',
        });
        return;
      }

      // Verificar se o email já está em uso por outro usuário
      const existingUser = await User.findOne({
        email,
        _id: { $ne: user._id },
      });
      if (existingUser) {
        res.status(400).json({
          success: false,
          message: 'Este email já está em uso',
        });
        return;
      }

      // Preparar dados para atualização
      const updateData: any = { name, email };

      // Se uma nova senha foi fornecida, validar a senha atual
      if (newPassword) {
        if (!currentPassword) {
          res.status(400).json({
            success: false,
            message: 'Senha atual é obrigatória para alterar a senha',
          });
          return;
        }

        const currentUser = await User.findById(user._id).select('+password');
        const isCurrentPasswordValid = await bcrypt.compare(
          currentPassword,
          currentUser!.password
        );

        if (!isCurrentPasswordValid) {
          res.status(400).json({
            success: false,
            message: 'Senha atual incorreta',
          });
          return;
        }

        updateData.password = await bcrypt.hash(newPassword, 10);
      }

      // Atualizar usuário
      const updatedUser = await User.findByIdAndUpdate(user._id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedUser) {
        res.status(404).json({
          success: false,
          message: 'Usuário não encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: updatedUser,
        message: 'Perfil atualizado com sucesso',
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

export default new AuthController();
