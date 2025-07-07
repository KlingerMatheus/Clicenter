'use client';

import React, { Suspense } from 'react';
import BaseLayout from './layout/BaseLayout';
import ContentLoading from './ContentLoading';

interface PatientLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const PatientLayout: React.FC<PatientLayoutProps> = ({
  children,
  title = 'Paciente',
}) => {
  return (
    <BaseLayout userType="paciente" title={title}>
      <Suspense fallback={<ContentLoading />}>{children}</Suspense>
    </BaseLayout>
  );
};

export default PatientLayout;
