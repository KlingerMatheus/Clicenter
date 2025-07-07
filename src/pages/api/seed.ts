import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/mongodb';
import User from '../../lib/models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ success: false, message: 'Método não permitido' });
  }

  try {
    await connectDB();

    // Verificar se já existem usuários
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      return res
        .status(400)
        .json({ success: false, message: 'Já existem usuários no banco' });
    }

    // Criar usuários de teste
    const testUsers = [
      {
        name: 'Administrador',
        email: 'admin@clicenter.com',
        password: 'admin123',
        role: 'admin',
      },
      {
        name: 'Dr. Maria Santos',
        email: 'maria@clicenter.com',
        password: 'medico123',
        role: 'medico',
      },
      {
        name: 'João Silva',
        email: 'joao@email.com',
        password: 'paciente123',
        role: 'paciente',
      },
    ];

    for (const userData of testUsers) {
      const user = new User(userData);
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Usuários criados com sucesso',
      data: {
        admin: { email: 'admin@clicenter.com', password: 'admin123' },
        medico: { email: 'maria@clicenter.com', password: 'medico123' },
        paciente: { email: 'joao@email.com', password: 'paciente123' },
      },
    });
  } catch (error) {
    console.error('Erro ao criar usuários:', error);
    res
      .status(500)
      .json({ success: false, message: 'Erro interno do servidor' });
  }
}
