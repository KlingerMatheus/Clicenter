import { useRouter } from 'next/navigation';
import React from 'react';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Event as EventIcon,
  MedicalServices as MedicalIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { MenuItem } from '../types/sidebar';

export class MenuService {
  private static createMenuItem(
    id: string,
    text: string,
    icon: React.ReactNode,
    path: string,
    router: ReturnType<typeof useRouter>
  ): MenuItem {
    return {
      id,
      text,
      icon,
      path,
      onClick: () => router.push(path),
    };
  }

  static getMenuItems(
    userRole: string,
    router: ReturnType<typeof useRouter>
  ): MenuItem[] {
    switch (userRole) {
      case 'admin':
        return [
          this.createMenuItem(
            'dashboard',
            'Painel',
            React.createElement(DashboardIcon),
            '/dashboard',
            router
          ),
          this.createMenuItem(
            'users',
            'Gerenciar Usuários',
            React.createElement(PeopleIcon),
            '/admin/users',
            router
          ),
          this.createMenuItem(
            'consultations',
            'Consultas',
            React.createElement(EventIcon),
            '/admin/consultations',
            router
          ),
          this.createMenuItem(
            'medical-records',
            'Históricos',
            React.createElement(MedicalIcon),
            '/admin/medical-records',
            router
          ),
          this.createMenuItem(
            'settings',
            'Configurações',
            React.createElement(SettingsIcon),
            '/admin/settings',
            router
          ),
        ];

      case 'medico':
        return [
          this.createMenuItem(
            'dashboard',
            'Dashboard',
            React.createElement(DashboardIcon),
            '/dashboard',
            router
          ),
          this.createMenuItem(
            'consultations',
            'Minhas Consultas',
            React.createElement(EventIcon),
            '/medico/consultations',
            router
          ),
          this.createMenuItem(
            'patients',
            'Meus Pacientes',
            React.createElement(PeopleIcon),
            '/medico/patients',
            router
          ),
          this.createMenuItem(
            'settings',
            'Configurações',
            React.createElement(SettingsIcon),
            '/medico/settings',
            router
          ),
        ];

      case 'paciente':
        return [
          this.createMenuItem(
            'dashboard',
            'Dashboard',
            React.createElement(DashboardIcon),
            '/dashboard',
            router
          ),
          this.createMenuItem(
            'schedule',
            'Agendar Consulta',
            React.createElement(AddIcon),
            '/paciente/schedule',
            router
          ),
          this.createMenuItem(
            'consultations',
            'Minhas Consultas',
            React.createElement(EventIcon),
            '/paciente/consultations',
            router
          ),
          this.createMenuItem(
            'medical-record',
            'Meu Histórico',
            React.createElement(MedicalIcon),
            '/paciente/medical-record',
            router
          ),
          this.createMenuItem(
            'settings',
            'Configurações',
            React.createElement(SettingsIcon),
            '/paciente/settings',
            router
          ),
        ];

      default:
        return [
          this.createMenuItem(
            'dashboard',
            'Dashboard',
            React.createElement(DashboardIcon),
            '/dashboard',
            router
          ),
          this.createMenuItem(
            'users',
            'Usuários',
            React.createElement(PeopleIcon),
            '/users',
            router
          ),
        ];
    }
  }
}
