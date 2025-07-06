import React from 'react';
import AdminLayout from '../../../components/AdminLayout';
import ConsultationsPage from '../../../pages/admin/ConsultationsPage';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function AdminConsultationsPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout title="Consultas">
        <ConsultationsPage />
      </AdminLayout>
    </ProtectedRoute>
  );
}
