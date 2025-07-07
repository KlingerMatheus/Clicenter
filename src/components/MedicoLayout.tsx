'use client';

import React from 'react';
import BaseLayout from './layout/BaseLayout';

interface MedicoLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const MedicoLayout: React.FC<MedicoLayoutProps> = ({
  children,
  title = 'Médico',
}) => {
  return (
    <BaseLayout userType="medico" title={title}>
      {children}
    </BaseLayout>
  );
};

export default MedicoLayout;
