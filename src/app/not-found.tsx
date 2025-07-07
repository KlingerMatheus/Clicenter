'use client';

import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        p: 3,
      }}
    >
      <Paper
        sx={{
          p: 6,
          textAlign: 'center',
          maxWidth: 500,
          borderRadius: 3,
          boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: '6rem',
            fontWeight: 700,
            color: '#1976d2',
            mb: 2,
            lineHeight: 1,
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            mb: 2,
            color: '#333',
          }}
        >
          Página Não Encontrada
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: '#666',
            fontSize: '1.1rem',
          }}
        >
          A página que você está procurando não existe ou foi movida. Verifique
          o endereço ou navegue usando o menu lateral.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
            }}
          >
            Voltar
          </Button>
          <Button
            variant="contained"
            onClick={handleGoHome}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
            }}
          >
            Início
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
