'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useFormValidation } from '../../hooks/useFormValidation';
import {
  profileUpdateSchema,
  ProfileUpdateFormData,
} from '../../lib/validations';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  Snackbar,
  useTheme,
  Avatar,
  Divider,
  Stack,
  IconButton,
  InputAdornment,
  Card,
  CardHeader,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import ContentLoading from '../../components/ContentLoading';
import LoadingButton from '../../components/LoadingButton';

const SettingsPage: React.FC = () => {
  const theme = useTheme();
  const { user, token, updateUser } = useAuth();

  const {
    data: formData,
    errors,
    setData,
    setField,
    validate,
    reset,
  } = useFormValidation<ProfileUpdateFormData>(profileUpdateSchema, {
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const API_BASE_URL = 'http://localhost:3001/api';

  useEffect(() => {
    if (user) {
      setData({
        ...formData,
        name: user.name,
        email: user.email,
      });
    }
  }, [user, setData]);

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleInputChange =
    (field: keyof ProfileUpdateFormData) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setField(field, event.target.value);
      };

  const validateForm = (): boolean => {
    return validate();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showSnackbar('Por favor, corrija os erros no formulário', 'error');
      return;
    }

    setLoading(true);

    try {
      const payload: any = {
        name: formData.name.trim(),
        email: formData.email.trim(),
      };

      if (formData.newPassword) {
        payload.currentPassword = formData.currentPassword;
        payload.newPassword = formData.newPassword;
      }

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        showSnackbar('Perfil atualizado com sucesso!', 'success');
        // Atualizar o contexto com os novos dados
        updateUser({
          name: data.data.name,
          email: data.data.email,
        });
        // Limpar campos de senha
        setData({
          ...formData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        showSnackbar(data.message || 'Erro ao atualizar perfil', 'error');
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      showSnackbar('Erro ao atualizar perfil', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  };

  const getRoleLabel = (role: string) => {
    const roleLabels = {
      admin: 'Administrador',
      medico: 'Médico',
      paciente: 'Paciente',
    };
    return roleLabels[role as keyof typeof roleLabels] || role;
  };

  if (!user) {
    return <ContentLoading />;
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Stack spacing={3}>
        {/* Informações do Usuário */}
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </Avatar>
            }
            title={user.name}
            subheader={`${getRoleLabel(user.role)} • ${user.email}`}
          />
        </Card>

        {/* Formulário de Edição */}
        <Paper
          sx={{
            p: { xs: 2, md: 3 },
            boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Editar Informações
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600 }}>
            <Stack spacing={3}>
              {/* Nome */}
              <TextField
                fullWidth
                label="Nome"
                value={formData.name}
                onChange={handleInputChange('name')}
                error={!!errors.name}
                helperText={errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                required
              />

              {/* Email */}
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                required
              />

              <Divider>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <SecurityIcon fontSize="small" />
                  Alterar Senha (opcional)
                </Typography>
              </Divider>

              {/* Senha Atual */}
              <TextField
                fullWidth
                label="Senha Atual"
                type={showCurrentPassword ? 'text' : 'password'}
                value={formData.currentPassword}
                onChange={handleInputChange('currentPassword')}
                error={!!errors.currentPassword}
                helperText={
                  errors.currentPassword ||
                  'Necessária apenas se você quiser alterar a senha'
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        edge="end"
                      >
                        {showCurrentPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Nova Senha */}
              <TextField
                fullWidth
                label="Nova Senha"
                type={showNewPassword ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={handleInputChange('newPassword')}
                error={!!errors.newPassword}
                helperText={errors.newPassword || 'Mínimo de 4 caracteres'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        edge="end"
                      >
                        {showNewPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Confirmar Nova Senha */}
              <TextField
                fullWidth
                label="Confirmar Nova Senha"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Botões */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={loading}
                  startIcon={<SaveIcon />}
                  sx={{ flex: { xs: 1, sm: 'none' } }}
                >
                  Salvar Alterações
                </LoadingButton>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                  disabled={loading}
                  sx={{ flex: { xs: 1, sm: 'none' } }}
                >
                  Cancelar
                </Button>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SettingsPage;
