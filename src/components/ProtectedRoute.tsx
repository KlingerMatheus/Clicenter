'use client';

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ContentLoading from './ContentLoading';
import AccessDenied from './AccessDenied';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'medico' | 'paciente';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <ContentLoading />;
  }

  if (!user) {
    return null; // Será redirecionado pelo useEffect
  }

  if (requiredRole && user.role !== requiredRole) {
    return <AccessDenied />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
