'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // Redireciona baseado no tipo de usuário
        switch (user.role) {
          case 'admin':
            router.push('/dashboard');
            break;
          case 'medico':
            router.push('/dashboard');
            break;
          case 'paciente':
            router.push('/dashboard');
            break;
          default:
            router.push('/login');
        }
      } else {
        // Se não está logado, redireciona para login
        router.push('/login');
      }
    }
  }, [user, isLoading, router]);

  return null;
}
