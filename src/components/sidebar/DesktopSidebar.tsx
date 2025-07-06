'use client';

import React from 'react';
import { Drawer, useTheme } from '@mui/material';
import SidebarContent, { SidebarContentProps } from './SidebarContent';

export interface DesktopSidebarProps
  extends Omit<SidebarContentProps, 'isMobile'> {
  isExpanded: boolean;
  width: number;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  isExpanded,
  width,
  ...contentProps
}) => {
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          transition: 'width 0.2s ease-in-out',
          overflowX: 'hidden',
          boxShadow:
            '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
      }}
    >
      <SidebarContent
        {...contentProps}
        isMobile={false}
        isExpanded={isExpanded}
      />
    </Drawer>
  );
};

export default DesktopSidebar;
