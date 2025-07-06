'use client';

import React from 'react';
import MedicoLayout from '../../../components/MedicoLayout';
import ProtectedRoute from '../../../components/ProtectedRoute';
import ConsultationsPage from '../../../pages/medico/ConsultationsPage';

export default function MedicoConsultationsPage() {
  return (
    <ProtectedRoute requiredRole="medico">
      <MedicoLayout title="Minhas Consultas">
        <ConsultationsPage />
      </MedicoLayout>
    </ProtectedRoute>
  );
}
