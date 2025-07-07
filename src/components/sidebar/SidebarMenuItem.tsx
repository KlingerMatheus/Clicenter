'use client';

import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme,
} from '@mui/material';
import { SidebarMenuItemProps } from '../../types/sidebar';

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  item,
  isExpanded,
  isActive,
}) => {
  const theme = useTheme();

  const handleClick = () => {
    if (item.disabled) return;
    item.onClick?.();
  };

  return (
    <ListItem disablePadding>
      <Tooltip title={isExpanded ? '' : item.text} placement="right">
        <ListItemButton
          onClick={handleClick}
          selected={isActive}
          disabled={item.disabled}
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
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.75)'
                  : 'rgba(25, 118, 210, 0.08)',
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
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
            '&.Mui-disabled': {
              opacity: 0.5,
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: isActive
                ? theme.palette.primary.main
                : theme.palette.mode === 'dark'
                  ? 'inherit'
                  : theme.palette.primary.main,
            }}
          >
            {item.icon}
          </ListItemIcon>
          {isExpanded && (
            <ListItemText
              primary={item.text}
              sx={{
                '& .MuiTypography-root': {
                  fontSize: '0.875rem',
                  whiteSpace: 'nowrap',
                  fontWeight: isActive ? 600 : 500,
                },
              }}
            />
          )}
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
};

export default SidebarMenuItem;
