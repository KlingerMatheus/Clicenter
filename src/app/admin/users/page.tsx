'use client';

import React from 'react';
import UserManagement from '../../../pages/admin/UserManagement';
import AdminLayout from '../../../components/AdminLayout';

export default function AdminUsersPage() {
    return (
        <AdminLayout title="Gerenciar Usuários">
            <UserManagement />
        </AdminLayout>
    );
} 