'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { MenuItem, UserInfo } from './SidebarContent';
import { useAuth } from '../../contexts/AuthContext';

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
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const userInfo = useMemo(() => {
    if (user) {
      const roleLabels = {
        admin: 'Administrador',
        medico: 'Médico',
        paciente: 'Paciente'
      };

      return {
        name: user.name,
        role: roleLabels[user.role] || user.role,
        avatar: user.name.split(' ').map(n => n[0]).join('').toUpperCase()
      };
    }

    // Fallback para quando não há usuário logado
    switch (userType) {
      case 'admin':
        return { name: 'Administrador', role: 'Administrador', avatar: 'A' };
      case 'medico':
        return { name: 'Médico', role: 'Médico', avatar: 'M' };
      case 'paciente':
        return { name: 'Paciente', role: 'Paciente', avatar: 'P' };
      default:
        return { name: 'Usuário', role: 'Usuário', avatar: 'U' };
    }
  }, [user, userType]);

  const menuItems = useMemo(() => {
    const userRole = user?.role || userType;

    if (userRole === 'admin') {
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
  }, [user?.role, userType, router]);

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