'use client';

import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: 'admin' | 'medico' | 'paciente';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    gap: 2
                }}
            >
                <CircularProgress size={40} />
                <Typography variant="body2" color="text.secondary">
                    Carregando...
                </Typography>
            </Box>
        );
    }

    if (!user) {
        return null; // Será redirecionado pelo useEffect
    }

    if (requiredRole && user.role !== requiredRole) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    gap: 2
                }}
            >
                <Typography variant="h5" color="error" gutterBottom>
                    Acesso Negado
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Você não tem permissão para acessar esta página.
                </Typography>
            </Box>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute; 