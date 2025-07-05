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
  Popover,
  MenuItem,
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
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';

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
  { text: 'Configurações', icon: <SettingsIcon /> },
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
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}`, position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={handleProfileClick}
            sx={{ p: 0 }}
          >
            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 40, height: 40 }}>
              {userInfo.avatar}
            </Avatar>
          </IconButton>
          {open && (
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {userInfo.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {userInfo.role}
              </Typography>
            </Box>
          )}
        </Box>
        

      </Box>

      {/* Menu */}
      <Box sx={{ flexGrow: 1, py: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <Tooltip title={open ? '' : item.text} placement="right">
                <ListItemButton sx={{ mx: 1, borderRadius: 1, minHeight: 48 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  {open && <ListItemText primary={item.text} sx={{ '& .MuiTypography-root': { fontSize: '0.875rem', whiteSpace: 'nowrap' } }} />}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
        <List>
          <ListItem disablePadding>
            <Tooltip title={open ? '' : 'Alternar Tema'} placement="right">
              <ListItemButton onClick={onThemeToggle} sx={{ mx: 1, borderRadius: 1, minHeight: 48 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                </ListItemIcon>
                {open && <ListItemText primary="Alternar Tema" sx={{ '& .MuiTypography-root': { fontSize: '0.875rem', whiteSpace: 'nowrap' } }} />}
              </ListItemButton>
            </Tooltip>
          </ListItem>
          <ListItem disablePadding>
            <Tooltip title={open ? '' : 'Minimizar Menu'} placement="right">
              <ListItemButton onClick={onToggle} sx={{ mx: 1, borderRadius: 1, minHeight: 48 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </ListItemIcon>
                {open && <ListItemText primary="Minimizar Menu" sx={{ '& .MuiTypography-root': { fontSize: '0.875rem', whiteSpace: 'nowrap' } }} />}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>
      </Box>

      {/* Profile Popover */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleProfileClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {userInfo.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {userInfo.role}
          </Typography>
        </Box>
        <List sx={{ py: 0 }}>
          <ListItem disablePadding>
            <ListItemButton onClick={handleProfileClose}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Perfil" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleProfileClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Configurações" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={() => { handleProfileClose(); onLogout(); }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </Drawer>
  );
};

export default Sidebar; 