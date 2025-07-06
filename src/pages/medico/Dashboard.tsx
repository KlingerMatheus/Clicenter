'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  useTheme,
} from '@mui/material';
import {
  Event as EventIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import ContentLoading from '../../components/ContentLoading';

interface ConsultationReminder {
  id: string;
  patientName: string;
  patientEmail: string;
  date: string;
  time: string;
  type: 'today' | 'tomorrow' | 'upcoming' | 'overdue';
  status: 'scheduled' | 'confirmed' | 'pending';
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [reminders, setReminders] = useState<ConsultationReminder[]>([]);

  useEffect(() => {
    // Mock data - simular carregamento
    setTimeout(() => {
      const mockReminders: ConsultationReminder[] = [
        {
          id: '1',
          patientName: 'Maria Silva',
          patientEmail: 'maria@email.com',
          date: '2024-01-15',
          time: '09:00',
          type: 'today',
          status: 'confirmed',
        },
        {
          id: '2',
          patientName: 'João Santos',
          patientEmail: 'joao@email.com',
          date: '2024-01-15',
          time: '14:30',
          type: 'today',
          status: 'scheduled',
        },
        {
          id: '3',
          patientName: 'Ana Costa',
          patientEmail: 'ana@email.com',
          date: '2024-01-16',
          time: '10:00',
          type: 'tomorrow',
          status: 'confirmed',
        },
        {
          id: '4',
          patientName: 'Pedro Oliveira',
          patientEmail: 'pedro@email.com',
          date: '2024-01-17',
          time: '16:00',
          type: 'upcoming',
          status: 'pending',
        },
        {
          id: '5',
          patientName: 'Lucia Ferreira',
          patientEmail: 'lucia@email.com',
          date: '2024-01-14',
          time: '11:00',
          type: 'overdue',
          status: 'scheduled',
        },
      ];
      setReminders(mockReminders);
      setLoading(false);
    }, 1000);
  }, []);

  const getTypeColor = (type: string) => {
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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'today':
        return 'Hoje';
      case 'tomorrow':
        return 'Amanhã';
      case 'upcoming':
        return 'Próximos Dias';
      case 'overdue':
        return 'Atrasada';
      default:
        return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return theme.palette.success.main;
      case 'scheduled':
        return theme.palette.primary.main;
      case 'pending':
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'scheduled':
        return 'Agendada';
      case 'pending':
        return 'Pendente';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getRemindersByType = (type: string) => {
    return reminders.filter((reminder) => reminder.type === type);
  };

  if (loading) {
    return <ContentLoading />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Resumo Rápido */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: 'center',
              boxShadow:
                '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
              borderRadius: 2,
            }}
          >
            <EventIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6">Consultas Hoje</Typography>
            <Typography variant="h4" color="primary">
              {getRemindersByType('today').length}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: 'center',
              boxShadow:
                '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
              borderRadius: 2,
            }}
          >
            <ScheduleIcon sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
            <Typography variant="h6">Consultas Amanhã</Typography>
            <Typography variant="h4" color="warning.main">
              {getRemindersByType('tomorrow').length}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: 'center',
              boxShadow:
                '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
              borderRadius: 2,
            }}
          >
            <PersonIcon sx={{ fontSize: 48, color: 'info.main', mb: 2 }} />
            <Typography variant="h6">Total de Pacientes</Typography>
            <Typography variant="h4" color="info.main">
              {new Set(reminders.map((r) => r.patientEmail)).size}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Lembretes de Consultas */}
      <Paper
        sx={{
          p: 3,
          mt: 3,
          boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
          borderRadius: 2,
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
            Lembretes de Consultas
          </Typography>

          {/* Legenda */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
              Status:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: theme.palette.success.main,
                }}
              />
              <Typography variant="caption">Confirmada</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: theme.palette.primary.main,
                }}
              />
              <Typography variant="caption">Agendada</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: theme.palette.warning.main,
                }}
              />
              <Typography variant="caption">Pendente</Typography>
            </Box>
          </Box>
        </Box>

        {reminders.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <EventIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              Nenhuma consulta agendada no momento.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {['today', 'tomorrow', 'upcoming', 'overdue'].map((type) => {
              const typeReminders = getRemindersByType(type);
              if (typeReminders.length === 0) return null;

              return (
                <Grid item xs={12} key={type}>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Chip
                        label={getTypeLabel(type)}
                        color={getTypeColor(type) as any}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {typeReminders.length} consulta
                        {typeReminders.length > 1 ? 's' : ''}
                      </Typography>
                    </Box>

                    <Grid container spacing={1.5}>
                      {typeReminders.map((reminder) => (
                        <Grid item xs={12} sm={6} md={4} key={reminder.id}>
                          <Card
                            sx={{
                              position: 'relative',
                              bgcolor: theme.palette.background.paper,
                              boxShadow:
                                '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                              borderRadius: 2,
                              border: `1px solid ${theme.palette.divider}`,
                              '&:hover': {
                                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                                transform: 'translateY(-1px)',
                                transition: 'all 0.2s ease-in-out',
                              },
                            }}
                          >
                            {/* Indicador de status (barra lateral) */}
                            <Box
                              sx={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: 4,
                                bgcolor: getStatusColor(reminder.status),
                                borderTopLeftRadius: 8,
                                borderBottomLeftRadius: 8,
                              }}
                            />

                            <CardContent sx={{ pl: 2, pr: 2, py: 2 }}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  mb: 1.5,
                                }}
                              >
                                <Avatar
                                  sx={{
                                    width: 32,
                                    height: 32,
                                    fontSize: '0.75rem',
                                    mr: 1.5,
                                    bgcolor: theme.palette.primary.main,
                                  }}
                                >
                                  {reminder.patientName
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')
                                    .toUpperCase()}
                                </Avatar>
                                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontWeight: 600,
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                    }}
                                  >
                                    {reminder.patientName}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                      display: 'block',
                                    }}
                                  >
                                    {reminder.patientEmail}
                                  </Typography>
                                </Box>
                              </Box>

                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}
                              >
                                <Box>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    display="block"
                                  >
                                    {formatDate(reminder.date)}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 500 }}
                                  >
                                    {reminder.time}
                                  </Typography>
                                </Box>

                                <Chip
                                  label={getStatusLabel(reminder.status)}
                                  size="small"
                                  sx={{
                                    fontSize: '0.7rem',
                                    height: 20,
                                    bgcolor:
                                      theme.palette.mode === 'dark'
                                        ? `${getStatusColor(reminder.status)}20`
                                        : `${getStatusColor(reminder.status)}15`,
                                    color: getStatusColor(reminder.status),
                                    border: `1px solid ${getStatusColor(reminder.status)}30`,
                                  }}
                                />
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Paper>

      {/* Informações Adicionais */}
      <Paper
        sx={{
          p: 3,
          mt: 3,
          boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Dicas Rápidas
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Use o menu lateral para acessar suas consultas e pacientes
          <br />
          • Você pode reagendar consultas diretamente na página de consultas
          <br />
          • Mantenha os relatórios médicos sempre atualizados
          <br />• Verifique regularmente os lembretes de consultas
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;
