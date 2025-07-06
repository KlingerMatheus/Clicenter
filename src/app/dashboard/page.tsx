'use client';

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ContentLoading from '../../components/ContentLoading';

// Importar os layouts e dashboards
import AdminLayout from '../../components/AdminLayout';
import MedicoLayout from '../../components/MedicoLayout';
import PatientLayout from '../../components/PatientLayout';
import AdminDashboard from '../../pages/admin/Dashboard';
import MedicoDashboard from '../../pages/medico/Dashboard';
import PatientDashboard from '../../pages/paciente/Dashboard';
import AccessDenied from '../../components/AccessDenied';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <ContentLoading />;
  }

  if (!user) {
    return null;
  }

  // Renderizar baseado no tipo de usuário
  switch (user.role) {
    case 'admin':
      return (
        <AdminLayout title="Painel">
          <AdminDashboard />
        </AdminLayout>
      );

    case 'medico':
      return (
        <MedicoLayout title="Dashboard">
          <MedicoDashboard />
        </MedicoLayout>
      );

    case 'paciente':
      return (
        <PatientLayout title="Dashboard">
          <PatientDashboard />
        </PatientLayout>
      );

    default:
      return <AccessDenied message="Tipo de usuário não reconhecido." />;
  }
}
