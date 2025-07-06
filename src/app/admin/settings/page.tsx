'use client';

import React, { useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import ProtectedRoute from '../../../components/ProtectedRoute';
import SettingsPage from '../../../pages/admin/SettingsPage';

export default function AdminSettingsPage() {
  return (
    <ProtectedRoute>
      <AdminLayout title="Configurações">
        <SettingsPage />
      </AdminLayout>
    </ProtectedRoute>
  );
}
