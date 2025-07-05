'use client';

import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import SidebarToggleButton from './SidebarToggleButton';

interface TopBarProps {
    title: string;
    onSidebarToggle?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ title, onSidebarToggle }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            sx={{
                height: 64,
                px: 3,
                py: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper,
                position: 'sticky',
                top: 0,
                zIndex: theme.zIndex.appBar,
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {title}
            </Typography>

            {isMobile && onSidebarToggle && (
                <SidebarToggleButton onClick={onSidebarToggle} />
            )}
        </Box>
    );
};

export default TopBar; 