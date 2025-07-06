import React from 'react';
import PatientLayout from '../../../components/PatientLayout';
import ConsultationsPage from '../../../pages/paciente/ConsultationsPage';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function PacienteConsultationsPage() {
  return (
    <ProtectedRoute requiredRole="paciente">
      <PatientLayout title="Minhas Consultas">
        <ConsultationsPage />
      </PatientLayout>
    </ProtectedRoute>
  );
}
