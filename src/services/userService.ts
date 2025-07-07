import { UserInfo } from '../types/sidebar';
import { Role } from '../types';
import { ROLE_LABELS, FALLBACK_USER_INFO } from '../config/sidebarConfig';

interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
}

export class UserService {
  static createUserInfo(user: AuthUser | null, userType: string): UserInfo {
    if (user) {
      return {
        name: user.name,
        role: ROLE_LABELS[user.role as keyof typeof ROLE_LABELS] || user.role,
        avatar: this.generateAvatar(user.name),
        email: user.email,
      };
    }

    // Fallback para quando não há usuário logado
    return this.createFallbackUserInfo(userType);
  }

  private static generateAvatar(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  private static createFallbackUserInfo(userType: string): UserInfo {
    const fallbackInfo = FALLBACK_USER_INFO;

    return (
      fallbackInfo[userType as keyof typeof fallbackInfo] ||
      fallbackInfo.DEFAULT
    );
  }
}
