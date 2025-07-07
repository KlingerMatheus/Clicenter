export const SIDEBAR_CONFIG = {
  // Dimensões
  EXPANDED_WIDTH: 280,
  COLLAPSED_WIDTH: 64,
  MOBILE_WIDTH: 280,

  // Animações
  TRANSITION_DURATION: 0.2,
  TRANSITION_EASING: 'ease-in-out',

  // Cores de fundo
  BACKGROUND: {
    LIGHT: 'rgba(240, 240, 240, 1)',
    DARK: 'rgba(25, 118, 210, 1)',
  },

  // Estados ativos
  ACTIVE_STATES: {
    LIGHT: {
      BACKGROUND: 'rgba(25, 118, 210, 0.08)',
      BACKGROUND_HOVER: 'rgba(25, 118, 210, 0.12)',
    },
    DARK: {
      BACKGROUND: 'rgba(255, 255, 255, 0.75)',
      BACKGROUND_HOVER: 'rgba(255, 255, 255, 0.85)',
    },
  },

  // Indicador de item ativo
  ACTIVE_INDICATOR: {
    WIDTH: 3,
    HEIGHT: 20,
    BORDER_RADIUS: '0 2px 2px 0',
    SHADOW: '0 0 8px rgba(25, 118, 210, 0.3)',
  },

  // Espaçamentos
  SPACING: {
    ITEM_MARGIN: 1,
    ITEM_BORDER_RADIUS: 1.5,
    ITEM_MIN_HEIGHT: 48,
    ITEM_MARGIN_BOTTOM: 0.5,
    HEADER_PADDING: 2,
    MENU_PADDING: 1,
    FOOTER_PADDING: 1,
  },

  // Tipografia
  TYPOGRAPHY: {
    ITEM_FONT_SIZE: '0.875rem',
    SECONDARY_FONT_SIZE: '0.75rem',
    SECONDARY_OPACITY: 0.7,
  },

  // Avatar
  AVATAR: {
    SIZE: 36,
    FONT_SIZE: '0.875rem',
    FONT_WEIGHT: 600,
  },

  // Ícones
  ICONS: {
    MIN_WIDTH: 40,
  },
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  MEDICO: 'medico',
  PACIENTE: 'paciente',
} as const;

export const ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Administrador',
  [USER_ROLES.MEDICO]: 'Médico',
  [USER_ROLES.PACIENTE]: 'Paciente',
} as const;

export const FALLBACK_USER_INFO = {
  [USER_ROLES.ADMIN]: {
    name: 'Administrador',
    role: 'Administrador',
    avatar: 'A',
  },
  [USER_ROLES.MEDICO]: { name: 'Médico', role: 'Médico', avatar: 'M' },
  [USER_ROLES.PACIENTE]: { name: 'Paciente', role: 'Paciente', avatar: 'P' },
  DEFAULT: { name: 'Usuário', role: 'Usuário', avatar: 'U' },
} as const;
