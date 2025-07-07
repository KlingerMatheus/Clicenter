// ===== FUNÇÕES UTILITÁRIAS PARA STATUS =====

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'scheduled':
      return 'primary';
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'error';
    case 'confirmed':
      return 'warning';
    case 'active':
      return 'warning';
    case 'resolved':
      return 'success';
    case 'follow_up':
      return 'info';
    default:
      return 'default';
  }
};

export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'scheduled':
      return 'Agendada';
    case 'completed':
      return 'Concluída';
    case 'cancelled':
      return 'Cancelada';
    case 'confirmed':
      return 'Confirmada';
    case 'active':
      return 'Ativo';
    case 'resolved':
      return 'Resolvido';
    case 'follow_up':
      return 'Acompanhamento';
    default:
      return status;
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'scheduled':
      return '📅';
    case 'completed':
      return '✅';
    case 'cancelled':
      return '❌';
    case 'confirmed':
      return '✅';
    default:
      return '📋';
  }
};

// ===== FUNÇÕES UTILITÁRIAS PARA ROLES =====

export const getRoleColor = (role: string) => {
  switch (role) {
    case 'admin':
      return 'primary';
    case 'medico':
      return 'secondary';
    case 'paciente':
      return 'default';
    default:
      return 'default';
  }
};

export const getRoleLabel = (role: string) => {
  switch (role) {
    case 'admin':
      return 'Administrador';
    case 'medico':
      return 'Médico';
    case 'paciente':
      return 'Paciente';
    default:
      return role;
  }
};

// ===== FUNÇÕES UTILITÁRIAS PARA TIPOS DE CONSULTA =====

export const getTypeColor = (type: string) => {
  switch (type) {
    case 'today':
      return 'primary';
    case 'tomorrow':
      return 'warning';
    case 'upcoming':
      return 'info';
    case 'overdue':
      return 'error';
    default:
      return 'default';
  }
};

export const getTypeLabel = (type: string) => {
  switch (type) {
    case 'today':
      return 'Hoje';
    case 'tomorrow':
      return 'Amanhã';
    case 'upcoming':
      return 'Próximas';
    case 'overdue':
      return 'Atrasadas';
    default:
      return type;
  }
};

// ===== FUNÇÕES UTILITÁRIAS PARA FORMATAÇÃO =====

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR');
};

export const formatDateTime = (date: string, time: string) => {
  const dateObj = new Date(`${date}T${time}`);
  return dateObj.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatTime = (time: string) => {
  return time;
};

export const calculateAge = (dateOfBirth: string) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

// ===== CONSTANTES DE CONFIGURAÇÃO =====

export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  ME: '/api/auth/me',
  PROFILE: '/api/auth/profile',
  USERS: '/api/users',
  SEED: '/api/seed',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  ADMIN: {
    DASHBOARD: '/admin',
    USERS: '/admin/users',
    CONSULTATIONS: '/admin/consultations',
    MEDICAL_RECORDS: '/admin/medical-records',
    SETTINGS: '/admin/settings',
  },
  MEDICO: {
    DASHBOARD: '/medico',
    CONSULTATIONS: '/medico/consultations',
    PATIENTS: '/medico/patients',
    SETTINGS: '/medico/settings',
  },
  PACIENTE: {
    DASHBOARD: '/paciente',
    CONSULTATIONS: '/paciente/consultations',
    SCHEDULE: '/paciente/schedule',
    MEDICAL_RECORD: '/paciente/medical-record',
    SETTINGS: '/paciente/settings',
  },
} as const;

export const MENU_ITEMS = {
  ADMIN: [
    { label: 'Dashboard', href: ROUTES.ADMIN.DASHBOARD, icon: '📊' },
    { label: 'Usuários', href: ROUTES.ADMIN.USERS, icon: '👥' },
    { label: 'Consultas', href: ROUTES.ADMIN.CONSULTATIONS, icon: '📋' },
    { label: 'Históricos', href: ROUTES.ADMIN.MEDICAL_RECORDS, icon: '📁' },
    { label: 'Configurações', href: ROUTES.ADMIN.SETTINGS, icon: '⚙️' },
  ],
  MEDICO: [
    { label: 'Dashboard', href: ROUTES.MEDICO.DASHBOARD, icon: '📊' },
    { label: 'Consultas', href: ROUTES.MEDICO.CONSULTATIONS, icon: '📋' },
    { label: 'Pacientes', href: ROUTES.MEDICO.PATIENTS, icon: '👥' },
    { label: 'Configurações', href: ROUTES.MEDICO.SETTINGS, icon: '⚙️' },
  ],
  PACIENTE: [
    { label: 'Dashboard', href: ROUTES.PACIENTE.DASHBOARD, icon: '📊' },
    {
      label: 'Minhas Consultas',
      href: ROUTES.PACIENTE.CONSULTATIONS,
      icon: '📋',
    },
    { label: 'Agendar Consulta', href: ROUTES.PACIENTE.SCHEDULE, icon: '📅' },
    {
      label: 'Histórico Médico',
      href: ROUTES.PACIENTE.MEDICAL_RECORD,
      icon: '📁',
    },
    { label: 'Configurações', href: ROUTES.PACIENTE.SETTINGS, icon: '⚙️' },
  ],
} as const;

// ===== CONSTANTES DE VALIDAÇÃO =====

export const VALIDATION_RULES = {
  EMAIL: {
    required: 'Email é obrigatório',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Email inválido',
    },
  },
  PASSWORD: {
    required: 'Senha é obrigatória',
    minLength: {
      value: 6,
      message: 'Senha deve ter pelo menos 6 caracteres',
    },
  },
  NAME: {
    required: 'Nome é obrigatório',
    minLength: {
      value: 2,
      message: 'Nome deve ter pelo menos 2 caracteres',
    },
  },
  PHONE: {
    required: 'Telefone é obrigatório',
    pattern: {
      value: /^\(\d{2}\) \d{4,5}-\d{4}$/,
      message: 'Telefone deve estar no formato (11) 99999-9999',
    },
  },
  DATE: {
    required: 'Data é obrigatória',
  },
  TIME: {
    required: 'Horário é obrigatório',
  },
} as const;

// ===== CONSTANTES DE MENSAGENS =====

export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Login realizado com sucesso!',
    LOGOUT: 'Logout realizado com sucesso!',
    PROFILE_UPDATED: 'Perfil atualizado com sucesso!',
    USER_CREATED: 'Usuário criado com sucesso!',
    USER_UPDATED: 'Usuário atualizado com sucesso!',
    USER_DELETED: 'Usuário excluído com sucesso!',
    CONSULTATION_SCHEDULED: 'Consulta agendada com sucesso!',
    CONSULTATION_UPDATED: 'Consulta atualizada com sucesso!',
    CONSULTATION_CANCELLED: 'Consulta cancelada com sucesso!',
  },
  ERROR: {
    LOGIN_FAILED: 'Email ou senha incorretos',
    NETWORK_ERROR: 'Erro de conexão. Tente novamente.',
    UNAUTHORIZED: 'Acesso não autorizado',
    FORBIDDEN: 'Acesso negado',
    NOT_FOUND: 'Recurso não encontrado',
    VALIDATION_ERROR: 'Dados inválidos',
    SERVER_ERROR: 'Erro interno do servidor',
    UNKNOWN_ERROR: 'Erro desconhecido',
  },
  CONFIRM: {
    DELETE_USER: 'Tem certeza que deseja excluir este usuário?',
    CANCEL_CONSULTATION: 'Tem certeza que deseja cancelar esta consulta?',
    LOGOUT: 'Tem certeza que deseja sair?',
  },
} as const;
