'use client';

import React from 'react';
import MedicoLayout from '../../../components/MedicoLayout';
import ProtectedRoute from '../../../components/ProtectedRoute';
import PatientsPage from '../../../pages/medico/PatientsPage';

export default function MedicoPatientsPage() {
    return (
        <ProtectedRoute requiredRole="medico">
            <MedicoLayout title="Meus Pacientes">
                <PatientsPage />
            </MedicoLayout>
        </ProtectedRoute>
    );
} 