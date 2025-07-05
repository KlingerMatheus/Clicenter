'use client';

import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Sidebar } from './sidebar';
import TopBar from './TopBar';
import { SidebarProvider, useSidebar } from './sidebar/SidebarProvider';
import { ThemeProvider, useTheme } from './ThemeProvider';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
}

const AdminLayoutContent: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => {
    const { toggleMobile } = useSidebar();
    const { toggleTheme } = useTheme();

    const handleLogout = () => {
        // Implementar logout
        console.log('Logout');
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />
            <Sidebar onThemeToggle={toggleTheme} onLogout={handleLogout} />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <TopBar title={title} onSidebarToggle={toggleMobile} />
                <Box component="main" sx={{ flexGrow: 1, overflow: 'auto' }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title = 'Admin' }) => {
    return (
        <ThemeProvider>
            <SidebarProvider userType="admin">
                <AdminLayoutContent title={title}>
                    {children}
                </AdminLayoutContent>
            </SidebarProvider>
        </ThemeProvider>
    );
};

export default AdminLayout; 