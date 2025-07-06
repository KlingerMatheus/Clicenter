import React from 'react';
import AdminLayout from '../../../components/AdminLayout';
import MedicalRecordsPage from '../../../pages/admin/MedicalRecordsPage';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function AdminMedicalRecordsPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout title="Históricos Médicos">
        <MedicalRecordsPage />
      </AdminLayout>
    </ProtectedRoute>
  );
}
