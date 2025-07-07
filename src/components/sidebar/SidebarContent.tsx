'use client';

import React, { useState } from 'react';
import { Logout as LogoutIcon } from '@mui/icons-material';
import UserMenu from '../UserMenu';
import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';
import SidebarFooter from './SidebarFooter';
import { SidebarContentProps } from '../../types/sidebar';

const SidebarContent: React.FC<SidebarContentProps> = ({
  userInfo,
  menuItems,
  isExpanded,
  isMobile,
  onThemeToggle,
  onToggleSidebar,
  onLogout,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <SidebarHeader
        userInfo={userInfo}
        isExpanded={isExpanded}
        onProfileClick={handleProfileClick}
      />

      <SidebarMenu menuItems={menuItems} isExpanded={isExpanded} />

      <SidebarFooter
        isExpanded={isExpanded}
        isMobile={isMobile}
        onThemeToggle={onThemeToggle}
        onToggleSidebar={onToggleSidebar}
      />

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
