'use client';

import React from 'react';
import Dashboard from '../../../pages/admin/Dashboard';
import AdminLayout from '../../../components/AdminLayout';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function AdminDashboardPage() {
    return (
        <ProtectedRoute requiredRole="admin">
            <AdminLayout title="Painel">
                <Dashboard />
            </AdminLayout>
        </ProtectedRoute>
    );
} 