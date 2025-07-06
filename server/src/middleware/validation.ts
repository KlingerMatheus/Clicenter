import { Request, Response, NextFunction } from 'express';

export const validateUserData = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { name, email, role, password } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    res.status(400).json({
      success: false,
      message: 'Nome é obrigatório e deve ser uma string válida',
    });
    return;
  }

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    res.status(400).json({
      success: false,
      message: 'Email é obrigatório e deve ser uma string válida',
    });
    return;
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      message: 'Email deve ter um formato válido',
    });
    return;
  }

  if (role && !['medico', 'paciente'].includes(role)) {
    res.status(400).json({
      success: false,
      message: 'Role deve ser "medico" ou "paciente"',
    });
    return;
  }

  // Senha obrigatória apenas na criação
  if (req.method === 'POST') {
    if (!password || typeof password !== 'string' || password.length < 4) {
      if (!(role === 'admin' && !password)) {
        // admin pode ser padrão
        res.status(400).json({
          success: false,
          message: 'Senha é obrigatória e deve ter pelo menos 4 caracteres',
        });
        return;
      }
    }
  }

  next();
};

export const validateUserId = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { id } = req.params;

  if (!id || id.trim().length === 0) {
    res.status(400).json({
      success: false,
      message: 'ID do usuário é obrigatório',
    });
    return;
  }

  next();
};
