'use client';

import React from 'react';
import {
    Box,
    Popover,
    Typography,
    Divider,
    useTheme,
} from '@mui/material';
import {
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';

interface MenuItem {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    divider?: boolean;
}

interface UserMenuProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    onClose: () => void;
    userInfo?: {
        name: string;
        role: string;
    };
    showUserInfo?: boolean;
    menuItems: MenuItem[];
    anchorOrigin?: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'left' | 'center' | 'right';
    };
    transformOrigin?: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'left' | 'center' | 'right';
    };
    minWidth?: number;
}

const UserMenu: React.FC<UserMenuProps> = ({
    open,
    anchorEl,
    onClose,
    userInfo,
    showUserInfo = false,
    menuItems,
    anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
    transformOrigin = { vertical: 'top', horizontal: 'center' },
    minWidth = 200,
}) => {
    const theme = useTheme();

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            slotProps={{
                paper: {
                    sx: {
                        mt: 1,
                        minWidth,
                        borderRadius: .75,
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        border: `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme.palette.background.paper,
                    },
                },
            }}
        >


            {showUserInfo && userInfo && (
                <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {userInfo.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {userInfo.role}
                    </Typography>
                </Box>
            )}
            {(() => {
                const mainItems = menuItems.filter(item => !item.divider);
                const footerItems = menuItems.filter(item => item.divider);

                const MenuItemComponent = ({ item }: { item: MenuItem }) => (
                    <Box
                        onClick={() => {
                            item.onClick();
                            onClose();
                        }}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: .5,
                            px: .5,
                            py: .5,
                            borderRadius: .75,
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: theme.palette.mode === 'dark'
                                    ? 'rgba(255, 255, 255, 0.08)'
                                    : theme.palette.action.hover,
                            },
                        }}
                    >
                        <Box sx={{
                            fontSize: 16,
                            color: theme.palette.text.secondary,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 28,
                            height: 28,
                        }}>
                            {item.icon}
                        </Box>
                        <Typography variant="body2">{item.label}</Typography>
                    </Box>
                );

                return (
                    <>
                        <Box sx={{ p: .75 }}>
                            <Box sx={{ borderRadius: .75, overflow: 'hidden' }}>
                                {mainItems.map((item, index) => (
                                    <MenuItemComponent key={index} item={item} />
                                ))}
                            </Box>
                        </Box>

                        {footerItems.length > 0 && (
                            <>
                                <Divider />
                                <Box sx={{ p: .75 }}>
                                    <Box sx={{ borderRadius: .75, overflow: 'hidden' }}>
                                        {footerItems.map((item, index) => (
                                            <MenuItemComponent key={index} item={item} />
                                        ))}
                                    </Box>
                                </Box>
                            </>
                        )}
                    </>
                );
            })()}
        </Popover>
    );
};

export default UserMenu; 