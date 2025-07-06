import React from 'react';
import PatientLayout from '../../../components/PatientLayout';
import ScheduleConsultationPage from '../../../pages/paciente/ScheduleConsultationPage';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function PacienteSchedulePage() {
    return (
        <ProtectedRoute requiredRole="paciente">
            <PatientLayout title="Agendar Consulta">
                <ScheduleConsultationPage />
            </PatientLayout>
        </ProtectedRoute>
    );
} 