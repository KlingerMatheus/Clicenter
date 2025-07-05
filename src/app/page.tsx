'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para o dashboard do admin
    router.push('/admin/dashboard');
  }, [router]);

  return null;
}
