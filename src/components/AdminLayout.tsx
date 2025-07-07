'use client';

import React from 'react';
import BaseLayout from './layout/BaseLayout';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title = 'Admin',
}) => {
  return (
    <BaseLayout userType="admin" title={title}>
      {children}
    </BaseLayout>
  );
};

export default AdminLayout;
