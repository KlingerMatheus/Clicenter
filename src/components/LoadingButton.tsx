'use client';

import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  children: React.ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  children,
  startIcon,
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={loading || props.disabled}
      startIcon={
        loading ? <CircularProgress size={16} color="inherit" /> : startIcon
      }
    >
      {children}
    </Button>
  );
};

export default LoadingButton;
