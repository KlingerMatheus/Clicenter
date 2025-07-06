'use client';

import React, { Suspense } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Sidebar } from './sidebar';
import TopBar from './TopBar';
import { SidebarProvider, useSidebar } from './sidebar/SidebarProvider';
import { ThemeProvider, useTheme } from './ThemeProvider';
import { useAuth } from '../contexts/AuthContext';
import ContentLoading from './ContentLoading';

interface PatientLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const PatientLayoutContent: React.FC<{
  children: React.ReactNode;
  title: string;
}> = ({ children, title }) => {
  const { toggleMobile } = useSidebar();
  const { toggleTheme } = useTheme();
  const { logout } = useAuth();

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Sidebar onThemeToggle={toggleTheme} onLogout={logout} />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar title={title} onSidebarToggle={toggleMobile} />
        <Box component="main" sx={{ flexGrow: 1, overflow: 'auto' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

const PatientLayout: React.FC<PatientLayoutProps> = ({
  children,
  title = 'Paciente',
}) => {
  return (
    <ThemeProvider>
      <SidebarProvider userType="paciente">
        <Suspense fallback={<ContentLoading />}>
          <PatientLayoutContent title={title}>{children}</PatientLayoutContent>
        </Suspense>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default PatientLayout;
