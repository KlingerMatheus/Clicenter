'use client';

import React from 'react';
import { IconButton, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

interface SidebarToggleButtonProps {
    onClick: () => void;
}

const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({ onClick }) => {
    const theme = useTheme();

    return (
        <IconButton
            onClick={onClick}
            sx={{
                color: theme.palette.text.primary,
                '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                },
            }}
        >
            <MenuIcon />
        </IconButton>
    );
};

export default SidebarToggleButton; 