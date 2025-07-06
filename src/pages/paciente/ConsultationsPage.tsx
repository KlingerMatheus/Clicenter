'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardActions,
  Stack,
  Grid,
} from '@mui/material';
import {
  Event as EventIcon,
  Cancel as CancelIcon,
  Visibility as ViewIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckIcon,
  Pending as PendingIcon,
} from '@mui/icons-material';
import ContentLoading from '../../components/ContentLoading';

interface Consultation {
  _id: string;
  doctorName: string;
  doctorEmail: string;
  doctorPhone: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'confirmed';
  symptoms: string;
  notes?: string;
  diagnosis?: string;
  prescription?: string;
  createdAt: string;
}

const ConsultationsPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConsultation, setSelectedConsultation] =
    useState<Consultation | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  useEffect(() => {
    // Mock data - simular carregamento
    setTimeout(() => {
      const mockConsultations: Consultation[] = [
        {
          _id: '1',
          doctorName: 'Dr. Carlos Mendes',
          doctorEmail: 'carlos.mendes@clinica.com',
          doctorPhone: '(11) 99999-0001',
          date: '2024-01-15',
          time: '09:00',
          status: 'completed',
          symptoms: 'Dor de cabeça, tensão muscular',
          notes:
            'Consulta realizada com sucesso. Paciente apresentou melhora dos sintomas.',
          diagnosis: 'Cefaleia tensional',
          prescription:
            'Paracetamol 500mg - 1 comprimido a cada 6 horas por 3 dias',
          createdAt: '2024-01-10T10:00:00Z',
        },
        {
          _id: '2',
          doctorName: 'Dr. Ana Silva',
          doctorEmail: 'ana.silva@clinica.com',
          doctorPhone: '(11) 99999-0002',
          date: '2024-01-20',
          time: '14:30',
          status: 'scheduled',
          symptoms: 'Dor nas costas',
          createdAt: '2024-01-12T14:00:00Z',
        },
        {
          _id: '3',
          doctorName: 'Dr. Pedro Santos',
          doctorEmail: 'pedro.santos@clinica.com',
          doctorPhone: '(11) 99999-0003',
          date: '2024-01-25',
          time: '10:00',
          status: 'confirmed',
          symptoms: 'Febre, tosse seca',
          createdAt: '2024-01-13T09:30:00Z',
        },
        {
          _id: '4',
          doctorName: 'Dr. Lucia Ferreira',
          doctorEmail: 'lucia.ferreira@clinica.com',
          doctorPhone: '(11) 99999-0004',
          date: '2024-01-30',
          time: '16:00',
          status: 'scheduled',
          symptoms: 'Dor abdominal',
          createdAt: '2024-01-14T11:15:00Z',
        },
        {
          _id: '5',
          doctorName: 'Dr. Roberto Costa',
          doctorEmail: 'roberto.costa@clinica.com',
          doctorPhone: '(11) 99999-0005',
          date: '2024-01-18',
          time: '11:00',
          status: 'cancelled',
          symptoms: 'Dor de cabeça',
          notes: 'Consulta cancelada pelo paciente',
          createdAt: '2024-01-11T16:45:00Z',
        },
        {
          _id: '6',
          doctorName: 'Dr. Fernanda Lima',
          doctorEmail: 'fernanda.lima@clinica.com',
          doctorPhone: '(11) 99999-0006',
          date: '2024-02-05',
          time: '08:30',
          status: 'scheduled',
          symptoms: 'Dor no peito, falta de ar',
          createdAt: '2024-01-15T13:20:00Z',
        },
      ];
      setConsultations(mockConsultations);
      setLoading(false);
    }, 1000);
  }, []);

  const handleOpenDialog = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedConsultation(null);
  };

  const handleCancelConsultation = async (consultationId: string) => {
    try {
      // Simular processamento
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Atualizar dados mock
      const updatedConsultations = consultations.map((consultation) => {
        if (consultation._id === consultationId) {
          return {
            ...consultation,
            status: 'cancelled' as const,
            notes: 'Consulta cancelada pelo paciente',
          };
        }
        return consultation;
      });

      setConsultations(updatedConsultations);

      setSnackbar({
        open: true,
        message: 'Consulta cancelada com sucesso!',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Erro ao cancelar consulta: ${error}`,
        severity: 'error',
      });
    }
  };

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
        return <ScheduleIcon />;
      case 'completed':
        return <CheckIcon />;
      case 'cancelled':
        return <CancelIcon />;
      case 'confirmed':
        return <PendingIcon />;
      default:
        return <ScheduleIcon />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatDateTime = (dateString: string, timeString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('pt-BR')} às ${timeString}`;
  };

  const renderMobileCard = (consultation: Consultation) => (
    <Card
      key={consultation._id}
      sx={{
        mb: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        borderRadius: 2,
        bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white',
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {consultation.doctorName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {consultation.doctorEmail}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {consultation.doctorPhone}
            </Typography>
          </Box>
          <Chip
            label={getStatusLabel(consultation.status)}
            color={getStatusColor(consultation.status) as any}
            size="small"
            icon={getStatusIcon(consultation.status)}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <EventIcon fontSize="small" color="action" />
          <Typography variant="body2">
            {formatDateTime(consultation.date, consultation.time)}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          <strong>Sintomas:</strong> {consultation.symptoms}
        </Typography>

        {consultation.notes && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Observações:</strong> {consultation.notes}
          </Typography>
        )}

        {consultation.diagnosis && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Diagnóstico:</strong> {consultation.diagnosis}
          </Typography>
        )}

        {consultation.prescription && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Prescrição:</strong> {consultation.prescription}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button
          size="small"
          startIcon={<ViewIcon />}
          onClick={() => handleOpenDialog(consultation)}
        >
          Ver Detalhes
        </Button>
        {(consultation.status === 'scheduled' ||
          consultation.status === 'confirmed') && (
            <Button
              size="small"
              startIcon={<CancelIcon />}
              onClick={() => handleCancelConsultation(consultation._id)}
              color="error"
              variant="outlined"
            >
              Cancelar
            </Button>
          )}
      </CardActions>
    </Card>
  );

  const renderDesktopTable = () => (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        borderRadius: 2,
        bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white',
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>
              Médico
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>
              Data/Hora
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>
              Status
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>
              Sintomas
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>
              Observações
            </TableCell>
            <TableCell align="center" sx={{ color: 'white', fontWeight: 600 }}>
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {consultations.map((consultation) => (
            <TableRow key={consultation._id} hover>
              <TableCell>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {consultation.doctorName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {consultation.doctorEmail}
                  </Typography>
                  <br />
                  <Typography variant="caption" color="text.secondary">
                    {consultation.doctorPhone}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {formatDate(consultation.date)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {consultation.time}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={getStatusLabel(consultation.status)}
                  color={getStatusColor(consultation.status) as any}
                  size="small"
                  icon={getStatusIcon(consultation.status)}
                />
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  sx={{
                    maxWidth: 200,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {consultation.symptoms}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  sx={{
                    maxWidth: 200,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {consultation.notes || '-'}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(consultation)}
                    title="Ver Detalhes"
                  >
                    <ViewIcon />
                  </IconButton>
                  {(consultation.status === 'scheduled' ||
                    consultation.status === 'confirmed') && (
                      <IconButton
                        size="small"
                        onClick={() => handleCancelConsultation(consultation._id)}
                        title="Cancelar Consulta"
                        color="error"
                      >
                        <CancelIcon />
                      </IconButton>
                    )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  if (loading) {
    return <ContentLoading />;
  }

  return (
    <Box sx={{ p: 3 }}>
      {consultations.length === 0 ? (
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
            borderRadius: 2,
            bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white',
          }}
        >
          <EventIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Nenhuma consulta encontrada
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Você ainda não possui consultas agendadas.
          </Typography>
        </Paper>
      ) : (
        <>
          {isMobile ? (
            <Stack spacing={2}>{consultations.map(renderMobileCard)}</Stack>
          ) : (
            renderDesktopTable()
          )}
        </>
      )}

      {/* Dialog para Ver Detalhes */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Detalhes da Consulta</DialogTitle>
        <DialogContent>
          {selectedConsultation && (
            <Box sx={{ pt: 2 }}>
              <Paper
                sx={{
                  p: 3,
                  mb: 3,
                  bgcolor:
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50',
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                  Informações do Médico
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Nome:</strong> {selectedConsultation.doctorName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Email:</strong> {selectedConsultation.doctorEmail}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Telefone:</strong>{' '}
                      {selectedConsultation.doctorPhone}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Data:</strong>{' '}
                      {formatDate(selectedConsultation.date)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Horário:</strong> {selectedConsultation.time}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Status:</strong>
                      <Chip
                        label={getStatusLabel(selectedConsultation.status)}
                        color={
                          getStatusColor(selectedConsultation.status) as any
                        }
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>Sintomas:</strong> {selectedConsultation.symptoms}
                    </Typography>
                  </Grid>
                  {selectedConsultation.notes && (
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        <strong>Observações:</strong>{' '}
                        {selectedConsultation.notes}
                      </Typography>
                    </Grid>
                  )}
                  {selectedConsultation.diagnosis && (
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        <strong>Diagnóstico:</strong>{' '}
                        {selectedConsultation.diagnosis}
                      </Typography>
                    </Grid>
                  )}
                  {selectedConsultation.prescription && (
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        <strong>Prescrição:</strong>{' '}
                        {selectedConsultation.prescription}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Fechar</Button>
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

export default ConsultationsPage;
