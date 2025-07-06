import React from 'react';
import PatientLayout from '../../../components/PatientLayout';
import PatientDashboard from '../../../pages/paciente/Dashboard';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function PacienteDashboardPage() {
  return (
    <ProtectedRoute requiredRole="paciente">
      <PatientLayout title="Dashboard">
        <PatientDashboard />
      </PatientLayout>
    </ProtectedRoute>
  );
}
