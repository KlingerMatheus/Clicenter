'use client';

import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  IconButton,
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
import UserMenu from './UserMenu';

interface SidebarProps {
  userType: 'admin' | 'paciente' | 'medico';
  open: boolean;
  onToggle: () => void;
  onThemeToggle: () => void;
  onLogout: () => void;
}

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Usuários', icon: <PeopleIcon /> },
];

const Sidebar: React.FC<SidebarProps> = ({ userType, open, onToggle, onThemeToggle, onLogout }) => {
  const theme = useTheme();
  const drawerWidth = open ? 280 : 70;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    console.log('Settings clicked');
  };

  const getUserInfo = () => {
    switch (userType) {
      case 'admin':
        return { name: 'João Silva', role: 'Administrador', avatar: 'JS' };
      case 'medico':
        return { name: 'Dr. Maria Santos', role: 'Médico', avatar: 'MS' };
      case 'paciente':
        return { name: 'Ana Costa', role: 'Paciente', avatar: 'AC' };
      default:
        return { name: 'Usuário', role: 'Usuário', avatar: 'U' };
    }
  };

  const userInfo = getUserInfo();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          transition: 'width 0.2s ease-in-out',
          overflowX: 'hidden',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
      }}
    >
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
              justifyContent: open ? 'space-between' : 'center',
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
            {open && (
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
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <Tooltip title={open ? '' : item.text} placement="right">
                <ListItemButton 
                  sx={{ 
                    mx: 1, 
                    borderRadius: 1.5, 
                    minHeight: 48,
                    mb: 0.5,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    minWidth: 40, 
                    color: theme.palette.mode === 'dark' ? 'inherit' : theme.palette.primary.main 
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  {open && <ListItemText primary={item.text} sx={{ '& .MuiTypography-root': { fontSize: '0.875rem', whiteSpace: 'nowrap', fontWeight: 500 } }} />}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ 
        borderTop: `1px solid ${theme.palette.divider}`, 
        py: 1,
        background: theme.palette.mode === 'dark' 
          ? 'rgba(25, 118, 210, 1)' 
          : 'rgba(240, 240, 240, 1)',
      }}>
        <List>
          <ListItem disablePadding>
            <Tooltip title={open ? '' : 'Alternar Tema'} placement="right">
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
                {open && <ListItemText primary="Alternar Tema" sx={{ '& .MuiTypography-root': { fontSize: '0.875rem', whiteSpace: 'nowrap', fontWeight: 500 } }} />}
              </ListItemButton>
            </Tooltip>
          </ListItem>
          <ListItem disablePadding>
            <Tooltip title={open ? '' : 'Minimizar Menu'} placement="right">
              <ListItemButton 
                onClick={onToggle} 
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
                  {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </ListItemIcon>
                {open && <ListItemText primary="Minimizar Menu" sx={{ '& .MuiTypography-root': { fontSize: '0.875rem', whiteSpace: 'nowrap', fontWeight: 500 } }} />}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>
      </Box>

            {/* User Menu */}
      <UserMenu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleProfileClose}
        userInfo={{ name: userInfo.name, role: userInfo.role }}
        showUserInfo={!open}
        menuItems={[
          {
            label: 'Configurações',
            icon: <SettingsIcon />,
            onClick: handleSettings,
          },
          {
            label: 'Sair',
            icon: <LogoutIcon />,
            onClick: onLogout,
            divider: true,
          },
        ]}
      />
    </Drawer>
  );
};

export default Sidebar; 