'use client';

import React, { useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Sidebar, SidebarProvider, useSidebar } from '../components/sidebar';
import TopBar from '../components/TopBar';
import { useTheme as useCustomTheme } from '../components/ThemeProvider';

const MainContent: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isExpanded, toggleMobile } = useSidebar();
  const { toggleTheme } = useCustomTheme();

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar
        onThemeToggle={toggleTheme}
        onLogout={handleLogout}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${isExpanded ? 280 : 70}px)` },
        }}
      >
        <TopBar
          title="Dashboard"
          onSidebarToggle={toggleMobile}
        />

        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Bem-vindo ao CliCenter
          </Typography>
          <Typography variant="body1">
            Conteúdo principal da aplicação aqui.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default function Home() {
  const [userType, setUserType] = useState<'admin' | 'paciente' | 'medico'>('admin');

  return (
    <SidebarProvider userType={userType}>
      <MainContent />
    </SidebarProvider>
  );
}
