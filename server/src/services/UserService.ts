import User, { IUser } from '../models/User';
import bcrypt from 'bcryptjs';

export class UserService {
  async createUser(userData: Partial<IUser>): Promise<IUser> {
    try {
      // Senha padrão para admin
      let password = userData.password;
      if (userData.role === 'admin' && !password) {
        password = 'admin';
      }
      if (!password) throw new Error('Senha é obrigatória');
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ ...userData, password: hashedPassword });
      return await user.save();
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error}`);
    }
  }

  async getAllUsers(): Promise<IUser[]> {
    try {
      return await User.find().sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Erro ao buscar usuários: ${error}`);
    }
  }

  async getUserById(id: string): Promise<IUser | null> {
    try {
      return await User.findById(id);
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  }

  async updateUser(
    id: string,
    userData: Partial<IUser>,
  ): Promise<IUser | null> {
    try {
      const update: Partial<IUser> = { ...userData };
      if (userData.password) {
        update.password = await bcrypt.hash(userData.password, 10);
      } else {
        delete update.password;
      }
      return await User.findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error}`);
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const result = await User.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      throw new Error(`Erro ao deletar usuário: ${error}`);
    }
  }

  async toggleUserStatus(id: string): Promise<IUser | null> {
    try {
      const user = await User.findById(id);
      if (!user) return null;

      user.isActive = !user.isActive;
      return await user.save();
    } catch (error) {
      throw new Error(`Erro ao alterar status do usuário: ${error}`);
    }
  }
}

export default new UserService();
