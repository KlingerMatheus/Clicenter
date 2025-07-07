'use client';

import React from 'react';
import { Box, List, useTheme } from '@mui/material';
import { usePathname } from 'next/navigation';
import { SidebarMenuProps } from '../../types/sidebar';
import SidebarMenuItem from './SidebarMenuItem';

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  menuItems,
  isExpanded,
  currentPath,
}) => {
  const theme = useTheme();
  const pathname = usePathname();
  const activePath = currentPath || pathname;

  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 1,
        background:
          theme.palette.mode === 'dark'
            ? 'rgba(25, 118, 210, 1)'
            : 'rgba(240, 240, 240, 1)',
      }}
    >
      <List>
        {menuItems.map((item) => {
          const isActive = item.path && activePath === item.path;

          return (
            <SidebarMenuItem
              key={item.id}
              item={item}
              isExpanded={isExpanded}
              isActive={!!isActive}
            />
          );
        })}
      </List>
    </Box>
  );
};

export default SidebarMenu;
