import { ReactNode } from 'react';

export interface MenuItem {
  id: string;
  text: string;
  icon: ReactNode;
  path?: string;
  onClick?: () => void;
  badge?: number;
  disabled?: boolean;
  divider?: boolean;
}

export interface UserInfo {
  name: string;
  role: string;
  avatar: string;
  email?: string;
}

export interface SidebarState {
  isExpanded: boolean;
  isMobileOpen: boolean;
}

export interface SidebarActions {
  toggleExpanded: () => void;
  toggleMobile: () => void;
  closeMobile: () => void;
  setExpanded: (expanded: boolean) => void;
}

export interface SidebarContextValue extends SidebarState, SidebarActions {
  userInfo: UserInfo;
  menuItems: MenuItem[];
}

export interface SidebarProviderProps {
  children: ReactNode;
  userType: 'admin' | 'paciente' | 'medico';
}

export interface SidebarContentProps {
  userInfo: UserInfo;
  menuItems: MenuItem[];
  isExpanded: boolean;
  isMobile: boolean;
  onThemeToggle: () => void;
  onToggleSidebar?: () => void;
  onLogout: () => void;
}

export interface SidebarHeaderProps {
  userInfo: UserInfo;
  isExpanded: boolean;
  onProfileClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface SidebarMenuProps {
  menuItems: MenuItem[];
  isExpanded: boolean;
  currentPath?: string;
}

export interface SidebarFooterProps {
  isExpanded: boolean;
  isMobile: boolean;
  onThemeToggle: () => void;
  onToggleSidebar?: () => void;
}

export interface SidebarMenuItemProps {
  item: MenuItem;
  isExpanded: boolean;
  isActive: boolean;
}
