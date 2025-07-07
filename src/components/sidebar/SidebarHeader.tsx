'use client';

import React from 'react';
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  useTheme,
} from '@mui/material';
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material';
import { SidebarHeaderProps } from '../../types/sidebar';

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  userInfo,
  isExpanded,
  onProfileClick,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        position: 'relative',
        background:
          theme.palette.mode === 'dark'
            ? 'rgba(25, 118, 210, 1)'
            : 'rgba(240, 240, 240, 1)',
      }}
    >
      <ListItem disablePadding>
        <ListItemButton
          onClick={onProfileClick}
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
          <ListItemIcon
            sx={{ minWidth: 40, display: 'flex', justifyContent: 'center' }}
          >
            <Avatar
              sx={{
                bgcolor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.grey[800]
                    : theme.palette.primary.main,
                width: 36,
                height: 36,
                fontSize: '0.875rem',
                fontWeight: 600,
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.common.white
                    : theme.palette.primary.contrastText,
              }}
            >
              {userInfo.avatar}
            </Avatar>
          </ListItemIcon>
          {isExpanded && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                flexGrow: 1,
              }}
            >
              <ListItemText
                primary={userInfo.name}
                secondary={userInfo.role}
                sx={{
                  '& .MuiTypography-root': {
                    fontSize: '0.875rem',
                    whiteSpace: 'nowrap',
                    fontWeight: 500,
                  },
                  '& .MuiListItemText-secondary': {
                    fontSize: '0.75rem',
                    opacity: 0.7,
                  },
                }}
              />
              <KeyboardArrowDownIcon
                fontSize="small"
                sx={{ color: theme.palette.text.secondary, opacity: 0.6 }}
              />
            </Box>
          )}
        </ListItemButton>
      </ListItem>
    </Box>
  );
};

export default SidebarHeader;
