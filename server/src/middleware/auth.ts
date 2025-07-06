import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface AuthRequest extends Request {
  user?: any;
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de acesso não fornecido',
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key',
    ) as any;
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Usuário inativo',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `Token inválido ${error}`,
    });
  }
};

export const adminAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    await auth(req, res, () => {});

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message:
          'Acesso negado. Apenas administradores podem acessar este recurso.',
      });
    }

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `Erro na autenticação ${error}`,
    });
  }
};
