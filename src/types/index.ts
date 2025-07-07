// ===== ENUMS BÁSICOS =====
export enum Role {
  ADMIN = 'admin',
  MEDICO = 'medico',
  PACIENTE = 'paciente',
}

export enum Severity {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

// ===== TIPOS DE USUÁRIO =====
export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ===== TIPOS DE CONSULTA =====
export interface Consultation {
  _id: string;
  patientId?: string;
  patientName: string;
  patientEmail: string;
  patientPhone?: string;
  doctorName?: string;
  doctorEmail?: string;
  doctorPhone?: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'confirmed';
  type?: string;
  symptoms?: string;
  notes?: string;
  diagnosis?: string;
  prescription?: string;
  createdAt: string;
}

// Para consultas do médico
export interface DoctorConsultation extends Consultation {
  patientId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
}

// Para consultas do paciente
export interface PatientConsultation extends Consultation {
  doctorName: string;
  doctorEmail: string;
  doctorPhone: string;
}

// Para consultas do admin
export interface AdminConsultation {
  _id: string;
  patient: { name: string; email: string };
  doctor: { name: string; email: string };
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'confirmed';
  type: string;
  notes?: string;
}

// ===== TIPOS DE PACIENTE =====
export interface Patient {
  _id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  address: string;
  bloodType: string;
  height: number;
  weight: number;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: MedicalRecord[];
  consultations: PatientConsultation[];
  createdAt: string;
}

// ===== TIPOS DE MÉDICO =====
export interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  crm: string;
  avatar: string;
  rating: number;
  totalConsultations: number;
  availableSlots: AvailableSlot[];
}

export interface AvailableSlot {
  date: string;
  time: string;
  available: boolean;
}

// ===== TIPOS DE HISTÓRICO MÉDICO =====
export interface MedicalRecord {
  _id: string;
  date: string;
  diagnosis: string;
  treatment: string;
  prescription: string;
  notes: string;
  doctor: string;
  doctorEmail?: string;
  doctorPhone?: string;
  symptoms?: string;
  vitalSigns?: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    weight: string;
  };
  exams?: string[];
  createdAt: string;
}

// Para histórico médico do admin
export interface AdminMedicalRecord {
  _id: string;
  patient: {
    name: string;
    email: string;
    dateOfBirth: string;
  };
  doctor: { name: string; email: string };
  consultationDate: string;
  diagnosis: string;
  prescription?: string;
  notes: string;
  status: 'active' | 'resolved' | 'follow_up';
}

// ===== TIPOS DE PERFIL =====
export interface PatientProfile {
  _id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  address: string;
  bloodType: string;
  height: number;
  weight: number;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  preferences: {
    notifications: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
  };
}

// ===== TIPOS DE DASHBOARD =====
export interface ConsultationReminder {
  id: string;
  patientName: string;
  patientEmail: string;
  date: string;
  time: string;
  type: 'today' | 'tomorrow' | 'upcoming' | 'overdue';
  status: 'scheduled' | 'confirmed' | 'pending';
}

// ===== TIPOS DE FORMULÁRIOS =====
export interface ProfileUpdateFormData {
  name: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface CreateUserFormData {
  name: string;
  email: string;
  role: Role.MEDICO | Role.PACIENTE;
  password: string;
}

// ===== TIPOS DE COMPONENTES =====
export interface MenuItem {
  label: string;
  icon: React.ComponentType<unknown>;
  href: string;
  badge?: number;
}

export interface UserInfo {
  name: string;
  role: string;
  avatar?: string;
}

// ===== TIPOS DE CONTEXTO =====
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  loading: boolean;
}

export interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface SidebarContextType {
  open: boolean;
  toggle: () => void;
  close: () => void;
}

// ===== TIPOS DE VALIDAÇÃO =====
export interface ValidationErrors {
  [key: string]: string;
}

export interface UseFormValidationReturn<T> {
  data: T;
  errors: ValidationErrors;
  setData: (data: T) => void;
  setField: (field: keyof T, value: unknown) => void;
  validate: () => boolean;
  reset: (data?: T) => void;
  clearErrors: () => void;
}

// ===== TIPOS DE LAYOUT =====
export interface LayoutProps {
  children: React.ReactNode;
}

export type AdminLayoutProps = LayoutProps;
export type DoctorLayoutProps = LayoutProps;
export type PatientLayoutProps = LayoutProps;
export type MedicoLayoutProps = LayoutProps;

// ===== TIPOS DE COMPONENTES UI =====
export interface LoadingButtonProps extends React.ComponentProps<'button'> {
  loading?: boolean;
  children: React.ReactNode;
}

export interface TopBarProps {
  title?: string;
  showMenuButton?: boolean;
}

export interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export interface SidebarContentProps {
  userInfo: UserInfo;
  menuItems: MenuItem[];
  onLogout: () => void;
}

export interface SidebarToggleButtonProps {
  onClick: () => void;
}

export interface MobileMenuButtonProps {
  onClick: () => void;
}

export interface AccessDeniedProps {
  requiredRole?: string;
}

export interface ClientOnlyProps {
  children: React.ReactNode;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export interface UserMenuProps {
  user: User;
  onLogout: () => void;
}

// ===== TIPOS DE API =====
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// ===== TIPOS DE ESTADO =====
export interface SnackbarState {
  open: boolean;
  message: string;
  severity: Severity;
}

export interface DashboardStats {
  totalConsultations: number;
  totalPatients: number;
  totalDoctors: number;
  totalRecords: number;
  recentConsultations: number;
  pendingConsultations: number;
}
