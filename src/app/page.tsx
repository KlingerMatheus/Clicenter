'use client';

import React, { useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Sidebar, SidebarProvider, useSidebar } from '../components/sidebar';
import MobileMenuButton from '../components/MobileMenuButton';
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
          p: 3,
          width: { sm: `calc(100% - ${isExpanded ? 280 : 70}px)` },
          ml: { xs: 0, md: `${isExpanded ? 280 : 70}px` },
        }}
      >
        <Typography variant="h4" gutterBottom>
          Bem-vindo ao CliCenter
        </Typography>
        <Typography variant="body1">
          Conteúdo principal da aplicação aqui.
        </Typography>
        
        {/* Mobile Menu Button */}
        {isMobile && <MobileMenuButton onClick={toggleMobile} />}
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
