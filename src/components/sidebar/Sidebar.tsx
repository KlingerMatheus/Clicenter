'use client';

import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import DesktopSidebar from './DesktopSidebar';
import MobileSidebar from './MobileSidebar';
import { useSidebar } from './SidebarProvider';

interface SidebarProps {
  onThemeToggle: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onThemeToggle, onLogout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { 
    userInfo, 
    menuItems, 
    isExpanded, 
    isMobileOpen, 
    toggleExpanded, 
    closeMobile 
  } = useSidebar();

  const drawerWidth = isExpanded ? 280 : 70;

  if (isMobile) {
    return (
      <MobileSidebar
        isOpen={isMobileOpen}
        onClose={closeMobile}
        userInfo={userInfo}
        menuItems={menuItems}
        onThemeToggle={onThemeToggle}
        onLogout={onLogout}
      />
    );
  }

  return (
    <DesktopSidebar
      isExpanded={isExpanded}
      width={drawerWidth}
      userInfo={userInfo}
      menuItems={menuItems}
      onThemeToggle={onThemeToggle}
      onToggleSidebar={toggleExpanded}
      onLogout={onLogout}
    />
  );
};

export default Sidebar; 