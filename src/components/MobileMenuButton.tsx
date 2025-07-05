'use client';

import React from 'react';
import { Box, useTheme } from '@mui/material';

interface MobileMenuButtonProps {
  onClick: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ onClick }) => {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
      <Box
        onClick={onClick}
        sx={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        <Box
          component="span"
          sx={{
            width: 20,
            height: 2,
            backgroundColor: 'currentColor',
            position: 'relative',
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'currentColor',
              transition: 'transform 0.3s ease',
            },
            '&::before': {
              transform: 'translateY(-6px)',
            },
            '&::after': {
              transform: 'translateY(6px)',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default MobileMenuButton; 