'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarContextValue, SidebarProviderProps } from '../../types/sidebar';
import { useAuth } from '../../contexts/AuthContext';
import { useSidebarManager } from '../../hooks/useSidebarManager';
import { MenuService } from '../../services/menuService';
import { UserService } from '../../services/userService';

const SidebarContext = createContext<SidebarContextValue | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
  userType,
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const sidebarManager = useSidebarManager();

  const userInfo = useMemo(() => {
    return UserService.createUserInfo(user, userType);
  }, [user, userType]);

  const menuItems = useMemo(() => {
    const userRole = user?.role || userType;
    return MenuService.getMenuItems(userRole, router);
  }, [user?.role, userType, router]);

  const value: SidebarContextValue = {
    userInfo,
    menuItems,
    ...sidebarManager,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
