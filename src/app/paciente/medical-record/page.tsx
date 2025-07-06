import React from 'react';
import PatientLayout from '../../../components/PatientLayout';
import MedicalRecordPage from '../../../pages/paciente/MedicalRecordPage';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function PacienteMedicalRecordPage() {
    return (
        <ProtectedRoute requiredRole="paciente">
            <PatientLayout title="Meu Histórico Médico">
                <MedicalRecordPage />
            </PatientLayout>
        </ProtectedRoute>
    );
} 