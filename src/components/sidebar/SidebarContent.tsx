'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  useTheme,
  Tooltip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';
import UserMenu from '../UserMenu';

export interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path?: string;
  onClick?: () => void;
}

export interface UserInfo {
  name: string;
  role: string;
  avatar: string;
}

export interface SidebarContentProps {
  userInfo: UserInfo;
  menuItems: MenuItem[];
  isExpanded: boolean;
  isMobile: boolean;
  onThemeToggle: () => void;
  onToggleSidebar?: () => void;
  onLogout: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  userInfo,
  menuItems,
  isExpanded,
  isMobile,
  onThemeToggle,
  onToggleSidebar,
  onLogout,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    router.push('/admin/settings');
  };

  return (
    <>
      {/* Header */}
      <Box sx={{
        py: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        position: 'relative',
        background: theme.palette.mode === 'dark'
          ? 'rgba(25, 118, 210, 1)'
          : 'rgba(240, 240, 240, 1)',
      }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleProfileClick}
            sx={{
              mx: 1,
              borderRadius: 1.5,
              minHeight: 56,
              p: 1.5,
              justifyContent: isExpanded ? 'space-between' : 'center',
              gap: 1.5,
              position: 'relative',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              '& .MuiListItemIcon-root:last-child': {
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                minWidth: 'auto',
                color: theme.palette.text.secondary,
                opacity: 0.6,
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, display: 'flex', justifyContent: 'center' }}>
              <Avatar sx={{
                bgcolor: theme.palette.mode === 'dark'
                  ? theme.palette.grey[800]
                  : theme.palette.primary.main,
                width: 36,
                height: 36,
                fontSize: '0.875rem',
                fontWeight: 600,
                color: theme.palette.mode === 'dark'
                  ? theme.palette.common.white
                  : theme.palette.primary.contrastText,
              }}>
                {userInfo.avatar}
              </Avatar>
            </ListItemIcon>
            {isExpanded && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
                <ListItemText
                  primary={userInfo.name}
                  secondary={userInfo.role}
                  sx={{
                    '& .MuiTypography-root': { fontSize: '0.875rem', whiteSpace: 'nowrap', fontWeight: 500 },
                    '& .MuiListItemText-secondary': { fontSize: '0.75rem', opacity: 0.7 }
                  }}
                />
                <KeyboardArrowDownIcon fontSize="small" sx={{ color: theme.palette.text.secondary, opacity: 0.6 }} />
              </Box>
            )}
          </ListItemButton>
        </ListItem>
      </Box>

      {/* Menu */}
      <Box sx={{
        flexGrow: 1,
        py: 1,
        background: theme.palette.mode === 'dark'
          ? 'rgba(25, 118, 210, 1)'
          : 'rgba(240, 240, 240, 1)',
      }}>
        <List>
          {menuItems.map((item) => {
            const isActive = item.path && pathname === item.path;

            return (
              <ListItem key={item.text} disablePadding>
                <Tooltip title={isExpanded ? '' : item.text} placement="right">
                  <ListItemButton
                    onClick={item.onClick}
                    selected={!!isActive}
                    sx={{
                      mx: 1,
                      borderRadius: 1.5,
                      minHeight: 48,
                      mb: 0.5,
                      position: 'relative',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                      '&.Mui-selected': {
                        backgroundColor: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.75)'
                          : 'rgba(25, 118, 210, 0.08)',
                        color: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.85)'
                            : 'rgba(25, 118, 210, 0.12)',
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: 3,
                          height: 20,
                          backgroundColor: theme.palette.primary.main,
                          borderRadius: '0 2px 2px 0',
                          boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
                        },
                      },
                    }}
                  >
                    <ListItemIcon sx={{
                      minWidth: 40,
                      color: isActive
                        ? theme.palette.primary.main
                        : (theme.palette.mode === 'dark' ? 'inherit' : theme.palette.primary.main)
                    }}>
                      {item.icon}
                    </ListItemIcon>
                    {isExpanded && (
                      <ListItemText
                        primary={item.text}
                        sx={{
                          '& .MuiTypography-root': {
                            fontSize: '0.875rem',
                            whiteSpace: 'nowrap',
                            fontWeight: isActive ? 600 : 500
                          }
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer - Show on both desktop and mobile */}
      <Box sx={{
        borderTop: `1px solid ${theme.palette.divider}`,
        py: 1,
        background: theme.palette.mode === 'dark'
          ? 'rgba(25, 118, 210, 1)'
          : 'rgba(240, 240, 240, 1)',
      }}>
        <List>
          <ListItem disablePadding>
            <Tooltip title={isExpanded ? '' : 'Alternar Tema'} placement="right">
              <ListItemButton
                onClick={onThemeToggle}
                sx={{
                  mx: 1,
                  borderRadius: 1.5,
                  minHeight: 48,
                  mb: 0.5,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon sx={{
                  minWidth: 40,
                  color: theme.palette.mode === 'dark' ? 'inherit' : theme.palette.primary.main
                }}>
                  {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                </ListItemIcon>
                {isExpanded && <ListItemText primary="Alternar Tema" sx={{ '& .MuiTypography-root': { fontSize: '0.875rem', whiteSpace: 'nowrap', fontWeight: 500 } }} />}
              </ListItemButton>
            </Tooltip>
          </ListItem>
          {!isMobile && onToggleSidebar && (
            <ListItem disablePadding>
              <Tooltip title={isExpanded ? '' : 'Minimizar Menu'} placement="right">
                <ListItemButton
                  onClick={onToggleSidebar}
                  sx={{
                    mx: 1,
                    borderRadius: 1.5,
                    minHeight: 48,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemIcon sx={{
                    minWidth: 40,
                    color: theme.palette.mode === 'dark' ? 'inherit' : theme.palette.primary.main
                  }}>
                    {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </ListItemIcon>
                  {isExpanded && <ListItemText primary="Minimizar Menu" sx={{ '& .MuiTypography-root': { fontSize: '0.875rem', whiteSpace: 'nowrap', fontWeight: 500 } }} />}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          )}
        </List>
      </Box>

      {/* User Menu */}
      <UserMenu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleProfileClose}
        userInfo={{ name: userInfo.name, role: userInfo.role }}
        showUserInfo={!isExpanded}
        menuItems={[
          {
            label: 'Sair',
            icon: <LogoutIcon />,
            onClick: onLogout,
          },
        ]}
      />
    </>
  );
};

export default SidebarContent; 