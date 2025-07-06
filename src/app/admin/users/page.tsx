'use client';

import React from 'react';
import UserManagement from '../../../pages/admin/UserManagement';
import AdminLayout from '../../../components/AdminLayout';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function AdminUsersPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout title="Gerenciar Usuários">
        <UserManagement />
      </AdminLayout>
    </ProtectedRoute>
  );
}
