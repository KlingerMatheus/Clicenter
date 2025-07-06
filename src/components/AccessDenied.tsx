import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Block as BlockIcon, Home as HomeIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface AccessDeniedProps {
  message?: string;
}

const AccessDenied: React.FC<AccessDeniedProps> = ({
  message = 'Você não tem permissão para acessar esta página.',
}) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 3,
        p: 3,
      }}
    >
      <Paper
        sx={{
          p: 4,
          textAlign: 'center',
          maxWidth: 400,
          boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
          borderRadius: 2,
        }}
      >
        <BlockIcon
          sx={{
            fontSize: 64,
            color: 'error.main',
            mb: 2,
          }}
        />

        <Typography
          variant="h4"
          color="error.main"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Acesso Negado
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {message}
        </Typography>

        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => router.push('/dashboard')}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
          }}
        >
          Voltar ao Dashboard
        </Button>
      </Paper>
    </Box>
  );
};

export default AccessDenied;
