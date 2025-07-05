'use client';

'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { MenuItem, UserInfo } from './SidebarContent';

interface SidebarContextType {
  userInfo: UserInfo;
  menuItems: MenuItem[];
  isExpanded: boolean;
  isMobileOpen: boolean;
  toggleExpanded: () => void;
  toggleMobile: () => void;
  closeMobile: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

interface SidebarProviderProps {
  children: React.ReactNode;
  userType: 'admin' | 'paciente' | 'medico';
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
  userType
}) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const userInfo = useMemo(() => {
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
  }, [userType]);

  const menuItems = useMemo(() => {
    if (userType === 'admin') {
      return [
        {
          text: 'Painel',
          icon: <DashboardIcon />,
          onClick: () => router.push('/admin/dashboard')
        },
        {
          text: 'Gerenciar Usuários',
          icon: <PeopleIcon />,
          onClick: () => router.push('/admin/users')
        },
      ];
    }

    // Para outros tipos de usuário (será implementado posteriormente)
    return [
      {
        text: 'Dashboard',
        icon: <DashboardIcon />,
        onClick: () => console.log('Dashboard clicked')
      },
      {
        text: 'Usuários',
        icon: <PeopleIcon />,
        onClick: () => console.log('Usuários clicked')
      },
    ];
  }, [userType]);

  const toggleExpanded = () => setIsExpanded(!isExpanded);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
  const closeMobile = () => setIsMobileOpen(false);

  const value = {
    userInfo,
    menuItems,
    isExpanded,
    isMobileOpen,
    toggleExpanded,
    toggleMobile,
    closeMobile,
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}; 