'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Avatar,
  Alert,
  Snackbar,
  useTheme,
  Stack,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Bloodtype as BloodIcon,
  Height as HeightIcon,
  MonitorWeight as WeightIcon,
} from '@mui/icons-material';
import ContentLoading from '../../components/ContentLoading';
import { Gender, Severity } from '../../types';

interface PatientProfile {
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

const SettingsPage: React.FC = () => {
  const theme = useTheme();
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [openEmergencyDialog, setOpenEmergencyDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: Severity.SUCCESS,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'other' as Gender,
    address: '',
    bloodType: '',
    height: '',
    weight: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: '',
    },
    preferences: {
      notifications: true,
      emailNotifications: true,
      smsNotifications: false,
    },
  });

  useEffect(() => {
    // Mock data - simular carregamento
    setTimeout(() => {
      const mockProfile: PatientProfile = {
        _id: '1',
        name: 'Maria Silva',
        email: 'maria@email.com',
        phone: '(11) 99999-1111',
        dateOfBirth: '1985-03-15',
        gender: Gender.FEMALE,
        address: 'Rua das Flores, 123 - São Paulo, SP',
        bloodType: 'A+',
        height: 165,
        weight: 62,
        emergencyContact: {
          name: 'João Silva',
          phone: '(11) 99999-0000',
          relationship: 'Esposo',
        },
        preferences: {
          notifications: true,
          emailNotifications: true,
          smsNotifications: false,
        },
      };
      setProfile(mockProfile);
      setFormData({
        name: mockProfile.name,
        email: mockProfile.email,
        phone: mockProfile.phone,
        dateOfBirth: mockProfile.dateOfBirth,
        gender: mockProfile.gender,
        address: mockProfile.address,
        bloodType: mockProfile.bloodType,
        height: mockProfile.height.toString(),
        weight: mockProfile.weight.toString(),
        emergencyContact: { ...mockProfile.emergencyContact },
        preferences: { ...mockProfile.preferences },
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender,
        address: profile.address,
        bloodType: profile.bloodType,
        height: profile.height.toString(),
        weight: profile.weight.toString(),
        emergencyContact: { ...profile.emergencyContact },
        preferences: { ...profile.preferences },
      });
    }
    setEditing(false);
  };

  const handleSave = async () => {
    try {
      // Simular processamento
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Atualizar dados mock
      const updatedProfile = {
        ...profile,
        ...formData,
        height: parseInt(formData.height),
        weight: parseInt(formData.weight),
      };

      setProfile(updatedProfile as PatientProfile);
      setEditing(false);

      setSnackbar({
        open: true,
        message: 'Perfil atualizado com sucesso!',
        severity: Severity.SUCCESS,
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Erro ao atualizar perfil: ${error}`,
        severity: Severity.ERROR,
      });
    }
  };

  const handleEmergencyContactEdit = () => {
    setOpenEmergencyDialog(true);
  };

  const handleEmergencyContactSave = () => {
    setOpenEmergencyDialog(false);
    setSnackbar({
      open: true,
      message: 'Contato de emergência atualizado!',
      severity: Severity.SUCCESS,
    });
  };

  const calculateAge = (dateOfBirth: string) => {
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

  if (loading) {
    return <ContentLoading />;
  }

  if (!profile) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Erro ao carregar perfil do usuário.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Perfil Principal */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              boxShadow:
                '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
              borderRadius: 2,
              bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Informações Pessoais
              </Typography>
              {!editing ? (
                <Button
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                  variant="outlined"
                >
                  Editar
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    startIcon={<CancelIcon />}
                    onClick={handleCancel}
                    variant="outlined"
                    color="error"
                  >
                    Cancelar
                  </Button>
                  <Button
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    variant="contained"
                  >
                    Salvar
                  </Button>
                </Box>
              )}
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nome Completo"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={!editing}
                  InputProps={{
                    startAdornment: (
                      <PersonIcon sx={{ mr: 1, color: 'action.active' }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={!editing}
                  InputProps={{
                    startAdornment: (
                      <EmailIcon sx={{ mr: 1, color: 'action.active' }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Telefone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  disabled={!editing}
                  InputProps={{
                    startAdornment: (
                      <PhoneIcon sx={{ mr: 1, color: 'action.active' }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Data de Nascimento"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  }
                  disabled={!editing}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <CalendarIcon sx={{ mr: 1, color: 'action.active' }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth disabled={!editing}>
                  <InputLabel>Gênero</InputLabel>
                  <Select
                    value={formData.gender}
                    label="Gênero"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gender: e.target.value as Gender,
                      })
                    }
                  >
                    <MenuItem value="male">Masculino</MenuItem>
                    <MenuItem value="female">Feminino</MenuItem>
                    <MenuItem value="other">Outro</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Endereço"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  disabled={!editing}
                  InputProps={{
                    startAdornment: (
                      <LocationIcon sx={{ mr: 1, color: 'action.active' }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Tipo Sanguíneo"
                  value={formData.bloodType}
                  onChange={(e) =>
                    setFormData({ ...formData, bloodType: e.target.value })
                  }
                  disabled={!editing}
                  InputProps={{
                    startAdornment: (
                      <BloodIcon sx={{ mr: 1, color: 'action.active' }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Altura (cm)"
                  type="number"
                  value={formData.height}
                  onChange={(e) =>
                    setFormData({ ...formData, height: e.target.value })
                  }
                  disabled={!editing}
                  InputProps={{
                    startAdornment: (
                      <HeightIcon sx={{ mr: 1, color: 'action.active' }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Peso (kg)"
                  type="number"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  disabled={!editing}
                  InputProps={{
                    startAdornment: (
                      <WeightIcon sx={{ mr: 1, color: 'action.active' }} />
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Sidebar com informações resumidas */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* Avatar e informações básicas */}
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                boxShadow:
                  '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                borderRadius: 2,
                bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white',
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: theme.palette.primary.main,
                  fontSize: '2rem',
                }}
              >
                {profile.name.charAt(0)}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {profile.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {calculateAge(profile.dateOfBirth)} anos •{' '}
                {profile.gender === 'male'
                  ? 'Masculino'
                  : profile.gender === 'female'
                    ? 'Feminino'
                    : 'Outro'}
              </Typography>
              <Chip
                label={profile.bloodType}
                color="error"
                variant="outlined"
                icon={<BloodIcon />}
              />
            </Paper>

            {/* Contato de Emergência */}
            <Paper
              sx={{
                p: 3,
                boxShadow:
                  '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                borderRadius: 2,
                bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Contato de Emergência
                </Typography>
                <IconButton size="small" onClick={handleEmergencyContactEdit}>
                  <EditIcon />
                </IconButton>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {profile.emergencyContact.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.emergencyContact.relationship}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.emergencyContact.phone}
              </Typography>
            </Paper>

            {/* Preferências */}
            <Paper
              sx={{
                p: 3,
                boxShadow:
                  '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                borderRadius: 2,
                bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Preferências
              </Typography>
              <Stack spacing={1}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body2">Notificações</Typography>
                  <Chip
                    label={
                      formData.preferences.notifications
                        ? 'Ativadas'
                        : 'Desativadas'
                    }
                    size="small"
                    color={
                      formData.preferences.notifications ? 'success' : 'default'
                    }
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body2">Email</Typography>
                  <Chip
                    label={
                      formData.preferences.emailNotifications
                        ? 'Ativado'
                        : 'Desativado'
                    }
                    size="small"
                    color={
                      formData.preferences.emailNotifications
                        ? 'success'
                        : 'default'
                    }
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body2">SMS</Typography>
                  <Chip
                    label={
                      formData.preferences.smsNotifications
                        ? 'Ativado'
                        : 'Desativado'
                    }
                    size="small"
                    color={
                      formData.preferences.smsNotifications
                        ? 'success'
                        : 'default'
                    }
                  />
                </Box>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      {/* Dialog para Contato de Emergência */}
      <Dialog
        open={openEmergencyDialog}
        onClose={() => setOpenEmergencyDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Editar Contato de Emergência</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome do Contato"
                  value={formData.emergencyContact.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergencyContact: {
                        ...formData.emergencyContact,
                        name: e.target.value,
                      },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Telefone"
                  value={formData.emergencyContact.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergencyContact: {
                        ...formData.emergencyContact,
                        phone: e.target.value,
                      },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Relacionamento"
                  value={formData.emergencyContact.relationship}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergencyContact: {
                        ...formData.emergencyContact,
                        relationship: e.target.value,
                      },
                    })
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEmergencyDialog(false)}>
            Cancelar
          </Button>
          <Button onClick={handleEmergencyContactSave} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SettingsPage;
