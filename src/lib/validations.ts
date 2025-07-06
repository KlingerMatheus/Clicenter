import { z } from 'zod';

// Schema para login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(4, 'Senha deve ter pelo menos 4 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Schema para criação de usuário (admin)
export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome não pode ter mais de 100 caracteres')
    .trim(),
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido')
    .toLowerCase()
    .trim(),
  role: z.enum(['medico', 'paciente'], {
    errorMap: () => ({ message: 'Tipo de usuário inválido' }),
  }),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(4, 'Senha deve ter pelo menos 4 caracteres'),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;

// Schema para edição de usuário (admin)
export const editUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome não pode ter mais de 100 caracteres')
    .trim(),
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido')
    .toLowerCase()
    .trim(),
  role: z.enum(['medico', 'paciente'], {
    errorMap: () => ({ message: 'Tipo de usuário inválido' }),
  }),
  password: z
    .string()
    .min(4, 'Senha deve ter pelo menos 4 caracteres')
    .optional(),
});

export type EditUserFormData = z.infer<typeof editUserSchema>;

// Schema para atualização de perfil (usuário atual)
export const profileUpdateSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome não pode ter mais de 100 caracteres')
    .trim(),
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido')
    .toLowerCase()
    .trim(),
  currentPassword: z
    .string()
    .optional(),
  newPassword: z
    .string()
    .min(4, 'Nova senha deve ter pelo menos 4 caracteres')
    .optional(),
  confirmPassword: z
    .string()
    .optional(),
}).refine((data) => {
  // Se nova senha foi fornecida, senha atual é obrigatória
  if (data.newPassword && !data.currentPassword) {
    return false;
  }
  return true;
}, {
  message: 'Senha atual é obrigatória para alterar a senha',
  path: ['currentPassword'],
}).refine((data) => {
  // Se nova senha foi fornecida, confirmar senha deve coincidir
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;

// Schema para validação de ID
export const idSchema = z.string().min(1, 'ID é obrigatório');

// Schema para validação de paginação
export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
});

export type PaginationParams = z.infer<typeof paginationSchema>;

// Schema para filtros de usuário
export const userFiltersSchema = z.object({
  role: z.enum(['medico', 'paciente']).optional(),
  isActive: z.boolean().optional(),
  search: z.string().optional(),
});

export type UserFilters = z.infer<typeof userFiltersSchema>; 