'use client';

import React, { Suspense } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Sidebar } from './sidebar';
import TopBar from './TopBar';
import { SidebarProvider, useSidebar } from './sidebar/SidebarProvider';
import { ThemeProvider, useTheme } from './ThemeProvider';
import { useAuth } from '../contexts/AuthContext';
import ContentLoading from './ContentLoading';

interface DoctorLayoutProps {
    children: React.ReactNode;
    title?: string;
}

const DoctorLayoutContent: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => {
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

const DoctorLayout: React.FC<DoctorLayoutProps> = ({ children, title = 'Médico' }) => {
    return (
        <ThemeProvider>
            <SidebarProvider userType="medico">
                <Suspense fallback={<ContentLoading />}>
                    <DoctorLayoutContent title={title}>
                        {children}
                    </DoctorLayoutContent>
                </Suspense>
            </SidebarProvider>
        </ThemeProvider>
    );
};

export default DoctorLayout; 