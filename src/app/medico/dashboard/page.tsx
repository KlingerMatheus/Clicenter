import React from 'react';
import DoctorLayout from '../../../components/DoctorLayout';
import DoctorDashboard from '../../../pages/medico/Dashboard';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function MedicoDashboardPage() {
    return (
        <ProtectedRoute requiredRole="medico">
            <DoctorLayout title="Dashboard">
                <DoctorDashboard />
            </DoctorLayout>
        </ProtectedRoute>
    );
} 