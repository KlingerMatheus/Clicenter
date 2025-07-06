import React from 'react';
import PatientLayout from '../../../components/PatientLayout';
import SettingsPage from '../../../pages/paciente/SettingsPage';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function PacienteSettingsPage() {
    return (
        <ProtectedRoute requiredRole="paciente">
            <PatientLayout title="Configurações">
                <SettingsPage />
            </PatientLayout>
        </ProtectedRoute>
    );
} 