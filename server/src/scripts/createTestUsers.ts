import bcrypt from 'bcryptjs';
import connectDB from '../config/database';
import User from '../models/User';

const createTestUsers = async () => {
  try {
    await connectDB();
    
    const testUsers = [
      {
        name: 'Administrador',
        email: 'admin@teste.com',
        password: 'admin',
        role: 'admin' as const
      },
      {
        name: 'Dr. Maria Santos',
        email: 'medico@teste.com',
        password: 'medico',
        role: 'medico' as const
      },
      {
        name: 'João Silva',
        email: 'paciente@teste.com',
        password: 'paciente',
        role: 'paciente' as const
      }
    ];

    console.log('🔧 Criando usuários de teste...\n');

    for (const userData of testUsers) {
      // Verificar se o usuário já existe
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        console.log(`✅ ${userData.role} já existe: ${existingUser.email}`);
        continue;
      }

      // Criar hash da senha
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      // Criar usuário
      const user = new User({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role,
        isActive: true
      });

      await user.save();
      console.log(`✅ ${userData.role} criado com sucesso!`);
      console.log(`   Email: ${userData.email}`);
      console.log(`   Senha: ${userData.password}\n`);
    }
    
    console.log('🎉 Todos os usuários de teste foram criados!');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao criar usuários de teste:', error);
    process.exit(1);
  }
};

createTestUsers(); 