'use client';

import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Sidebar } from '../sidebar';
import TopBar from '../TopBar';
import { SidebarProvider, useSidebar } from '../sidebar/SidebarProvider';
import { ThemeProvider, useTheme } from '../ThemeProvider';
import { useAuth } from '../../contexts/AuthContext';

interface BaseLayoutProps {
  children: React.ReactNode;
  title?: string;
  userType: 'admin' | 'paciente' | 'medico';
}

const BaseLayoutContent: React.FC<{
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
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? '#f8f9fa'
                : theme.palette.background.default,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  title = 'Dashboard',
  userType,
}) => {
  return (
    <ThemeProvider>
      <SidebarProvider userType={userType}>
        <BaseLayoutContent title={title}>{children}</BaseLayoutContent>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default BaseLayout;
