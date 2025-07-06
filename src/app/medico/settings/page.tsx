'use client';

import React from 'react';
import MedicoLayout from '../../../components/MedicoLayout';
import ProtectedRoute from '../../../components/ProtectedRoute';
import SettingsPage from '../../../pages/medico/SettingsPage';

export default function MedicoSettingsPage() {
  return (
    <ProtectedRoute requiredRole="medico">
      <MedicoLayout title="Configurações">
        <SettingsPage />
      </MedicoLayout>
    </ProtectedRoute>
  );
}
