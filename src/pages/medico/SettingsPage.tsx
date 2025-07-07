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
} from '@mui/icons-material';
import ContentLoading from '../../components/ContentLoading';
import LoadingButton from '../../components/LoadingButton';
import { useApi } from '../../hooks/useApi';
import { Severity } from '../../types';

const SettingsPage: React.FC = () => {
  const theme = useTheme();
  const { user, token, updateUser } = useAuth();

  const {
    data: formData,
    errors,
    setData,
    setField,
    validate,
    clearErrors,
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
    severity: Severity.SUCCESS,
  });

  const { apiBaseUrl } = useApi();

  useEffect(() => {
    if (user) {
      setData({
        name: user.name,
        email: user.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [user, setData]);

  const showSnackbar = (message: string, severity: Severity) => {
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const payload: {
        name: string;
        email: string;
        currentPassword?: string;
        newPassword?: string;
      } = {
        name: formData.name,
        email: formData.email,
      };

      if (formData.newPassword) {
        payload.currentPassword = formData.currentPassword;
        payload.newPassword = formData.newPassword;
      }

      const response = await fetch(`${apiBaseUrl}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        showSnackbar('Perfil atualizado com sucesso!', Severity.SUCCESS);

        // Atualizar dados do usuário no contexto
        if (updateUser) {
          updateUser({
            ...user,
            name: formData.name,
            email: formData.email,
          });
        }

        // Limpar campos de senha
        reset({
          name: formData.name,
          email: formData.email,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        showSnackbar(data.message || 'Erro ao atualizar perfil', Severity.ERROR);
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      showSnackbar('Erro ao conectar com o servidor', Severity.ERROR);
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
        <Card
          sx={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
            borderRadius: 2,
          }}
        >
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
                <Typography variant="body2" color="text.secondary">
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
                helperText={errors.currentPassword}
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
                helperText={errors.newPassword}
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
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  loading={loading}
                  disabled={loading}
                >
                  Salvar Alterações
                </LoadingButton>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SettingsPage;
