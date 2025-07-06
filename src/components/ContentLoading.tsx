'use client';

import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const ContentLoading: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: '50vh',
        gap: 2,
      }}
    >
      <CircularProgress size={40} />
      <Typography variant="body2" color="text.secondary">
        Carregando...
      </Typography>
    </Box>
  );
};

export default ContentLoading;
