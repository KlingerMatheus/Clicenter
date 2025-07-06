'use client';

import React from 'react';
import Dashboard from '../../../pages/medico/Dashboard';
import MedicoLayout from '../../../components/MedicoLayout';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function MedicoDashboardPage() {
  return (
    <ProtectedRoute requiredRole="medico">
      <MedicoLayout title="Dashboard">
        <Dashboard />
      </MedicoLayout>
    </ProtectedRoute>
  );
}
