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
  Stack,
  useTheme,
} from '@mui/material';
import {
  Event,
  MedicalServices,
  Schedule,
  Person,
  CheckCircle,
  Cancel,
  Pending,
  History,
  Description,
} from '@mui/icons-material';
import ContentLoading from '../../components/ContentLoading';

interface Consultation {
  _id: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'confirmed';
  symptoms: string;
  notes?: string;
  diagnosis?: string;
  prescription?: string;
}

interface MedicalRecord {
  _id: string;
  date: string;
  diagnosis: string;
  treatment: string;
  prescription: string;
  doctor: string;
}

const PatientDashboard: React.FC = () => {
  const theme = useTheme();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - simular carregamento
    setTimeout(() => {
      const mockConsultations: Consultation[] = [
        {
          _id: '1',
          doctorName: 'Dr. Carlos Mendes',
          date: '2024-01-15',
          time: '09:00',
          status: 'completed',
          symptoms: 'Dor de cabeça, tensão muscular',
          notes: 'Consulta realizada com sucesso',
          diagnosis: 'Cefaleia tensional',
          prescription:
            'Paracetamol 500mg - 1 comprimido a cada 6 horas por 3 dias',
        },
        {
          _id: '2',
          doctorName: 'Dr. Ana Silva',
          date: '2024-01-20',
          time: '14:30',
          status: 'scheduled',
          symptoms: 'Dor nas costas',
        },
        {
          _id: '3',
          doctorName: 'Dr. Pedro Santos',
          date: '2024-01-25',
          time: '10:00',
          status: 'confirmed',
          symptoms: 'Febre, tosse seca',
        },
        {
          _id: '4',
          doctorName: 'Dr. Lucia Ferreira',
          date: '2024-01-30',
          time: '16:00',
          status: 'scheduled',
          symptoms: 'Dor abdominal',
        },
      ];

      const mockMedicalRecords: MedicalRecord[] = [
        {
          _id: '1',
          date: '2024-01-15',
          diagnosis: 'Cefaleia tensional',
          treatment: 'Analgésicos e relaxamento muscular',
          prescription:
            'Paracetamol 500mg - 1 comprimido a cada 6 horas por 3 dias',
          doctor: 'Dr. Carlos Mendes',
        },
        {
          _id: '2',
          date: '2023-12-10',
          diagnosis: 'Resfriado comum',
          treatment: 'Repouso e hidratação',
          prescription: 'Vitamina C e paracetamol conforme necessário',
          doctor: 'Dr. Ana Silva',
        },
        {
          _id: '3',
          date: '2023-11-20',
          diagnosis: 'Hérnia de disco',
          treatment: 'Fisioterapia e medicação',
          prescription:
            'Diclofenaco 50mg - 1 comprimido a cada 8 horas por 7 dias',
          doctor: 'Dr. Pedro Santos',
        },
      ];

      setConsultations(mockConsultations);
      setMedicalRecords(mockMedicalRecords);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      case 'confirmed':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Agendada';
      case 'completed':
        return 'Concluída';
      case 'cancelled':
        return 'Cancelada';
      case 'confirmed':
        return 'Confirmada';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Schedule />;
      case 'completed':
        return <CheckCircle />;
      case 'cancelled':
        return <Cancel />;
      case 'confirmed':
        return <Pending />;
      default:
        return <Schedule />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatDateTime = (dateString: string, timeString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('pt-BR')} às ${timeString}`;
  };

  const stats = {
    totalConsultations: consultations.length,
    completedConsultations: consultations.filter(
      (c) => c.status === 'completed'
    ).length,
    scheduledConsultations: consultations.filter(
      (c) => c.status === 'scheduled'
    ).length,
    totalRecords: medicalRecords.length,
  };

  if (loading) {
    return <ContentLoading />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
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
            <Event sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6">Total de Consultas</Typography>
            <Typography variant="h4" color="primary">
              {stats.totalConsultations}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
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
            <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
            <Typography variant="h6">Consultas Concluídas</Typography>
            <Typography variant="h4" color="success.main">
              {stats.completedConsultations}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
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
            <Schedule sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
            <Typography variant="h6">Consultas Agendadas</Typography>
            <Typography variant="h4" color="warning.main">
              {stats.scheduledConsultations}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
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
            <History sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h6">Registros Médicos</Typography>
            <Typography variant="h4" color="secondary.main">
              {stats.totalRecords}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper
        sx={{
          p: 3,
          mt: 3,
          boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
          borderRadius: 2,
          bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white',
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Person color="primary" />
          Bem-vindo ao seu Painel de Paciente
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Aqui você pode acompanhar suas consultas, visualizar seu histórico
          médico e gerenciar suas informações de saúde. Use o menu lateral para
          acessar todas as funcionalidades disponíveis.
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              boxShadow:
                '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
              borderRadius: 2,
              bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white',
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <MedicalServices color="primary" />
              Próximas Consultas
            </Typography>

            {consultations.filter(
              (c) => c.status === 'scheduled' || c.status === 'confirmed'
            ).length === 0 ? (
              <Typography
                color="text.secondary"
                sx={{ textAlign: 'center', py: 2 }}
              >
                Nenhuma consulta agendada.
              </Typography>
            ) : (
              <Stack spacing={2}>
                {consultations
                  .filter(
                    (c) => c.status === 'scheduled' || c.status === 'confirmed'
                  )
                  .slice(0, 3)
                  .map((consultation) => (
                    <Card
                      key={consultation._id}
                      sx={{
                        boxShadow:
                          '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                        borderRadius: 2,
                        bgcolor:
                          theme.palette.mode === 'dark' ? 'grey.700' : 'white',
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            mb: 1,
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                          >
                            {consultation.doctorName}
                          </Typography>
                          <Chip
                            label={getStatusLabel(consultation.status)}
                            color={
                              getStatusColor(consultation.status) as
                                | 'success'
                                | 'primary'
                                | 'error'
                                | 'default'
                            }
                            size="small"
                            icon={getStatusIcon(consultation.status)}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {formatDateTime(consultation.date, consultation.time)}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 1 }}
                        >
                          <strong>Sintomas:</strong> {consultation.symptoms}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
              </Stack>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              boxShadow:
                '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
              borderRadius: 2,
              bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white',
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Description color="secondary" />
              Últimos Registros Médicos
            </Typography>

            {medicalRecords.length === 0 ? (
              <Typography
                color="text.secondary"
                sx={{ textAlign: 'center', py: 2 }}
              >
                Nenhum registro médico encontrado.
              </Typography>
            ) : (
              <Stack spacing={2}>
                {medicalRecords.slice(0, 3).map((record) => (
                  <Card
                    key={record._id}
                    sx={{
                      boxShadow:
                        '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                      borderRadius: 2,
                      bgcolor:
                        theme.palette.mode === 'dark' ? 'grey.700' : 'white',
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          mb: 1,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600 }}
                        >
                          {record.doctor}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(record.date)}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        Diagnóstico: {record.diagnosis}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: '0.875rem' }}
                      >
                        {record.treatment}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientDashboard;
