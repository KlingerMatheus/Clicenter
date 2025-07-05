'use client';

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../components/ThemeProvider';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toggleTheme } = useTheme();
  const [userType, setUserType] = useState<'admin' | 'paciente' | 'medico'>('admin');

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar
        userType={userType}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onThemeToggle={toggleTheme}
        onLogout={handleLogout}
      />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Bem-vindo ao CliCenter
        </Typography>
        <Typography variant="body1">
          Conteúdo principal da aplicação aqui.
        </Typography>
      </Box>
    </Box>
  );
}
