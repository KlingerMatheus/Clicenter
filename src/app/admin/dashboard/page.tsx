'use client';

import React from 'react';
import Dashboard from '../../../pages/admin/Dashboard';
import AdminLayout from '../../../components/AdminLayout';

export default function AdminDashboardPage() {
    return (
        <AdminLayout title="Painel">
            <Dashboard />
        </AdminLayout>
    );
} 