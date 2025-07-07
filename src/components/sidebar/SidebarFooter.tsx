'use client';

import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme,
} from '@mui/material';
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { SidebarFooterProps } from '../../types/sidebar';

const SidebarFooter: React.FC<SidebarFooterProps> = ({
  isExpanded,
  isMobile,
  onThemeToggle,
  onToggleSidebar,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderTop: `1px solid ${theme.palette.divider}`,
        py: 1,
        background:
          theme.palette.mode === 'dark'
            ? 'rgba(25, 118, 210, 1)'
            : 'rgba(240, 240, 240, 1)',
      }}
    >
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
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color:
                    theme.palette.mode === 'dark'
                      ? 'inherit'
                      : theme.palette.primary.main,
                }}
              >
                {theme.palette.mode === 'dark' ? (
                  <LightModeIcon />
                ) : (
                  <DarkModeIcon />
                )}
              </ListItemIcon>
              {isExpanded && (
                <ListItemText
                  primary="Alternar Tema"
                  sx={{
                    '& .MuiTypography-root': {
                      fontSize: '0.875rem',
                      whiteSpace: 'nowrap',
                      fontWeight: 500,
                    },
                  }}
                />
              )}
            </ListItemButton>
          </Tooltip>
        </ListItem>
        {!isMobile && onToggleSidebar && (
          <ListItem disablePadding>
            <Tooltip
              title={isExpanded ? '' : 'Minimizar Menu'}
              placement="right"
            >
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
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color:
                      theme.palette.mode === 'dark'
                        ? 'inherit'
                        : theme.palette.primary.main,
                  }}
                >
                  {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </ListItemIcon>
                {isExpanded && (
                  <ListItemText
                    primary="Minimizar Menu"
                    sx={{
                      '& .MuiTypography-root': {
                        fontSize: '0.875rem',
                        whiteSpace: 'nowrap',
                        fontWeight: 500,
                      },
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default SidebarFooter;
