'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Event as EventIcon,
  MedicalServices as MedicalIcon,
  Add as AddIcon,
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
  const pathname = usePathname();
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
          path: '/dashboard',
          onClick: () => router.push('/dashboard')
        },
        {
          text: 'Gerenciar Usuários',
          icon: <PeopleIcon />,
          path: '/admin/users',
          onClick: () => router.push('/admin/users')
        },
        {
          text: 'Consultas',
          icon: <EventIcon />,
          path: '/admin/consultations',
          onClick: () => router.push('/admin/consultations')
        },
        {
          text: 'Históricos',
          icon: <MedicalIcon />,
          path: '/admin/medical-records',
          onClick: () => router.push('/admin/medical-records')
        },
        {
          text: 'Configurações',
          icon: <SettingsIcon />,
          path: '/admin/settings',
          onClick: () => router.push('/admin/settings')
        },
      ];
    }

    // Menu para médicos
    if (userRole === 'medico') {
      return [
        {
          text: 'Dashboard',
          icon: <DashboardIcon />,
          path: '/dashboard',
          onClick: () => router.push('/dashboard')
        },
        {
          text: 'Minhas Consultas',
          icon: <EventIcon />,
          path: '/medico/consultations',
          onClick: () => router.push('/medico/consultations')
        },
        {
          text: 'Meus Pacientes',
          icon: <PeopleIcon />,
          path: '/medico/patients',
          onClick: () => router.push('/medico/patients')
        },
        {
          text: 'Configurações',
          icon: <SettingsIcon />,
          path: '/medico/settings',
          onClick: () => router.push('/medico/settings')
        },
      ];
    }

    // Menu para pacientes
    if (userRole === 'paciente') {
      return [
        {
          text: 'Dashboard',
          icon: <DashboardIcon />,
          path: '/dashboard',
          onClick: () => router.push('/dashboard')
        },
        {
          text: 'Agendar Consulta',
          icon: <AddIcon />,
          path: '/paciente/schedule',
          onClick: () => router.push('/paciente/schedule')
        },
        {
          text: 'Minhas Consultas',
          icon: <EventIcon />,
          path: '/paciente/consultations',
          onClick: () => router.push('/paciente/consultations')
        },
        {
          text: 'Meu Histórico',
          icon: <MedicalIcon />,
          path: '/paciente/medical-record',
          onClick: () => router.push('/paciente/medical-record')
        },
        {
          text: 'Configurações',
          icon: <SettingsIcon />,
          path: '/paciente/settings',
          onClick: () => router.push('/paciente/settings')
        },
      ];
    }

    // Fallback para outros tipos de usuário
    return [
      {
        text: 'Dashboard',
        icon: <DashboardIcon />,
        path: '/dashboard',
        onClick: () => console.log('Dashboard clicked')
      },
      {
        text: 'Usuários',
        icon: <PeopleIcon />,
        path: '/users',
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