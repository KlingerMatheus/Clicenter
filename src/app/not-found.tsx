'use client';

import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import AdminLayout from '../components/AdminLayout';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <AdminLayout title="Página Não Encontrada">
            <Box sx={{
                p: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 64px)'
            }}>
                <Paper sx={{
                    p: 6,
                    textAlign: 'center',
                    maxWidth: 500,
                    borderRadius: 3,
                    boxShadow: 3
                }}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '6rem',
                            fontWeight: 700,
                            color: 'primary.main',
                            mb: 2,
                            lineHeight: 1
                        }}
                    >
                        404
                    </Typography>

                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 600,
                            mb: 2,
                            color: 'text.primary'
                        }}
                    >
                        Página Não Encontrada
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            mb: 4,
                            color: 'text.secondary',
                            fontSize: '1.1rem'
                        }}
                    >
                        A página que você está procurando não existe ou foi movida.
                        Verifique o endereço ou navegue usando o menu lateral.
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            startIcon={<ArrowBackIcon />}
                            onClick={handleGoBack}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 2
                            }}
                        >
                            Voltar
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </AdminLayout>
    );
} 