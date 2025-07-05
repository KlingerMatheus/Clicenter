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
        // Se já está logado, redireciona para o dashboard
        router.push('/admin/dashboard');
      } else {
        // Se não está logado, redireciona para login
        router.push('/login');
      }
    }
  }, [user, isLoading, router]);

  return null;
}
