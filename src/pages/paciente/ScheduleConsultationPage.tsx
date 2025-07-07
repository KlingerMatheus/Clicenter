'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  useTheme,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  MedicalServices as MedicalIcon,
  CheckCircle as CheckIcon,
  Add as AddIcon,
  Event as EventIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import ContentLoading from '../../components/ContentLoading';
import { Severity } from '../../types';

interface Doctor {
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

interface AvailableSlot {
  date: string;
  time: string;
  available: boolean;
}

const ScheduleConsultationPage: React.FC = () => {
  const theme = useTheme();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [symptoms, setSymptoms] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: Severity.SUCCESS,
  });

  useEffect(() => {
    // Mock data - simular carregamento
    setTimeout(() => {
      const mockDoctors: Doctor[] = [
        {
          _id: 'd1',
          name: 'Dr. Carlos Mendes',
          email: 'carlos.mendes@clinica.com',
          phone: '(11) 99999-0001',
          specialty: 'Clínico Geral',
          crm: 'CRM-SP 12345',
          avatar: 'CM',
          rating: 4.8,
          totalConsultations: 1250,
          availableSlots: [
            { date: '2024-01-20', time: '09:00', available: true },
            { date: '2024-01-20', time: '10:00', available: true },
            { date: '2024-01-20', time: '14:00', available: false },
            { date: '2024-01-20', time: '15:00', available: true },
            { date: '2024-01-21', time: '08:00', available: true },
            { date: '2024-01-21', time: '09:00', available: true },
            { date: '2024-01-21', time: '16:00', available: true },
            { date: '2024-01-22', time: '10:00', available: true },
            { date: '2024-01-22', time: '11:00', available: true },
            { date: '2024-01-22', time: '14:00', available: true },
          ],
        },
        {
          _id: 'd2',
          name: 'Dra. Ana Silva',
          email: 'ana.silva@clinica.com',
          phone: '(11) 99999-0002',
          specialty: 'Cardiologia',
          crm: 'CRM-SP 23456',
          avatar: 'AS',
          rating: 4.9,
          totalConsultations: 890,
          availableSlots: [
            { date: '2024-01-20', time: '08:00', available: true },
            { date: '2024-01-20', time: '11:00', available: true },
            { date: '2024-01-20', time: '15:00', available: true },
            { date: '2024-01-21', time: '09:00', available: false },
            { date: '2024-01-21', time: '10:00', available: true },
            { date: '2024-01-21', time: '14:00', available: true },
            { date: '2024-01-22', time: '08:00', available: true },
            { date: '2024-01-22', time: '09:00', available: true },
            { date: '2024-01-22', time: '16:00', available: true },
          ],
        },
        {
          _id: 'd3',
          name: 'Dr. Pedro Santos',
          email: 'pedro.santos@clinica.com',
          phone: '(11) 99999-0003',
          specialty: 'Ortopedia',
          crm: 'CRM-SP 34567',
          avatar: 'PS',
          rating: 4.7,
          totalConsultations: 1100,
          availableSlots: [
            { date: '2024-01-20', time: '10:00', available: true },
            { date: '2024-01-20', time: '11:00', available: true },
            { date: '2024-01-20', time: '16:00', available: true },
            { date: '2024-01-21', time: '08:00', available: true },
            { date: '2024-01-21', time: '14:00', available: true },
            { date: '2024-01-21', time: '15:00', available: true },
            { date: '2024-01-22', time: '09:00', available: true },
            { date: '2024-01-22', time: '10:00', available: true },
            { date: '2024-01-22', time: '11:00', available: true },
          ],
        },
        {
          _id: 'd4',
          name: 'Dra. Lucia Ferreira',
          email: 'lucia.ferreira@clinica.com',
          phone: '(11) 99999-0004',
          specialty: 'Dermatologia',
          crm: 'CRM-SP 45678',
          avatar: 'LF',
          rating: 4.6,
          totalConsultations: 750,
          availableSlots: [
            { date: '2024-01-20', time: '08:00', available: true },
            { date: '2024-01-20', time: '09:00', available: true },
            { date: '2024-01-20', time: '14:00', available: true },
            { date: '2024-01-21', time: '10:00', available: true },
            { date: '2024-01-21', time: '11:00', available: true },
            { date: '2024-01-21', time: '16:00', available: true },
            { date: '2024-01-22', time: '08:00', available: true },
            { date: '2024-01-22', time: '14:00', available: true },
            { date: '2024-01-22', time: '15:00', available: true },
          ],
        },
        {
          _id: 'd5',
          name: 'Dr. Roberto Costa',
          email: 'roberto.costa@clinica.com',
          phone: '(11) 99999-0005',
          specialty: 'Gastroenterologia',
          crm: 'CRM-SP 56789',
          avatar: 'RC',
          rating: 4.5,
          totalConsultations: 680,
          availableSlots: [
            { date: '2024-01-20', time: '09:00', available: true },
            { date: '2024-01-20', time: '10:00', available: true },
            { date: '2024-01-20', time: '15:00', available: true },
            { date: '2024-01-21', time: '08:00', available: true },
            { date: '2024-01-21', time: '09:00', available: true },
            { date: '2024-01-21', time: '14:00', available: true },
            { date: '2024-01-22', time: '10:00', available: true },
            { date: '2024-01-22', time: '11:00', available: true },
            { date: '2024-01-22', time: '16:00', available: true },
          ],
        },
        {
          _id: 'd6',
          name: 'Dra. Fernanda Lima',
          email: 'fernanda.lima@clinica.com',
          phone: '(11) 99999-0006',
          specialty: 'Neurologia',
          crm: 'CRM-SP 67890',
          avatar: 'FL',
          rating: 4.9,
          totalConsultations: 920,
          availableSlots: [
            { date: '2024-01-20', time: '08:00', available: true },
            { date: '2024-01-20', time: '11:00', available: true },
            { date: '2024-01-20', time: '16:00', available: true },
            { date: '2024-01-21', time: '09:00', available: true },
            { date: '2024-01-21', time: '10:00', available: true },
            { date: '2024-01-21', time: '15:00', available: true },
            { date: '2024-01-22', time: '08:00', available: true },
            { date: '2024-01-22', time: '14:00', available: true },
            { date: '2024-01-22', time: '15:00', available: true },
          ],
        },
      ];
      setDoctors(mockDoctors);
      setLoading(false);
    }, 1000);
  }, []);

  const specialties = Array.from(
    new Set(doctors.map((doctor) => doctor.specialty))
  );

  const filteredDoctors = doctors.filter(
    (doctor) => !selectedSpecialty || doctor.specialty === selectedSpecialty
  );

  const availableDates = selectedDoctor
    ? Array.from(
      new Set(
        selectedDoctor.availableSlots
          .filter((slot) => slot.available)
          .map((slot) => slot.date)
      )
    ).sort()
    : [];

  const availableTimes =
    selectedDoctor && selectedDate
      ? selectedDoctor.availableSlots
        .filter((slot) => slot.date === selectedDate && slot.available)
        .map((slot) => slot.time)
        .sort()
      : [];

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate('');
    setSelectedTime('');
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !symptoms.trim()) {
      setSnackbar({
        open: true,
        message: 'Por favor, preencha todos os campos obrigatórios.',
        severity: 'error',
      });
      return;
    }
    setOpenConfirmation(true);
  };

  const handleConfirmSchedule = async () => {
    setSubmitting(true);
    try {
      // Simular processamento
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSnackbar({
        open: true,
        message: 'Consulta agendada com sucesso!',
        severity: 'success',
      });

      // Reset form
      setSelectedDoctor(null);
      setSelectedDate('');
      setSelectedTime('');
      setSymptoms('');
      setNotes('');
      setOpenConfirmation(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Erro ao agendar consulta. Tente novamente. ${error}`,
        severity: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  if (loading) {
    return <ContentLoading />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Seleção de Especialidade */}
        <Grid item xs={12}>
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
              <MedicalIcon color="primary" />
              Escolha a Especialidade
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Especialidade</InputLabel>
              <Select
                value={selectedSpecialty}
                label="Especialidade"
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                <MenuItem value="">Todas as especialidades</MenuItem>
                {specialties.map((specialty) => (
                  <MenuItem key={specialty} value={specialty}>
                    {specialty}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        {/* Lista de Médicos */}
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
              <PersonIcon color="primary" />
              Escolha o Médico
            </Typography>

            {filteredDoctors.length === 0 ? (
              <Typography
                color="text.secondary"
                sx={{ textAlign: 'center', py: 2 }}
              >
                Nenhum médico encontrado para esta especialidade.
              </Typography>
            ) : (
              <List>
                {filteredDoctors.map((doctor) => (
                  <ListItem key={doctor._id} disablePadding sx={{ mb: 1 }}>
                    <ListItemButton
                      selected={selectedDoctor?._id === doctor._id}
                      onClick={() => handleDoctorSelect(doctor)}
                      sx={{
                        borderRadius: 2,
                        border:
                          selectedDoctor?._id === doctor._id
                            ? `2px solid ${theme.palette.primary.main}`
                            : '2px solid transparent',
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          {doctor.avatar}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 600 }}
                            >
                              {doctor.name}
                            </Typography>
                            <Chip
                              label={doctor.specialty}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          </Box>
                        }
                        secondary={
                          <Box component="span">
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              component="span"
                            >
                              {doctor.crm}
                            </Typography>
                            <Box
                              component="span"
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                mt: 0.5,
                              }}
                            >
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                component="span"
                              >
                                ⭐ {doctor.rating} ({doctor.totalConsultations}{' '}
                                consultas)
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Seleção de Data e Hora */}
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
              <CalendarIcon color="primary" />
              Escolha Data e Hora
            </Typography>

            {!selectedDoctor ? (
              <Typography
                color="text.secondary"
                sx={{ textAlign: 'center', py: 4 }}
              >
                Selecione um médico primeiro
              </Typography>
            ) : (
              <Stack spacing={3}>
                {/* Seleção de Data */}
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Data da Consulta
                  </Typography>
                  {availableDates.length === 0 ? (
                    <Typography
                      color="text.secondary"
                      sx={{ textAlign: 'center', py: 2 }}
                    >
                      Nenhuma data disponível para este médico.
                    </Typography>
                  ) : (
                    <RadioGroup
                      value={selectedDate}
                      onChange={(e) => handleDateSelect(e.target.value)}
                    >
                      {availableDates.map((date) => (
                        <FormControlLabel
                          key={date}
                          value={date}
                          control={<Radio />}
                          label={formatDate(date)}
                        />
                      ))}
                    </RadioGroup>
                  )}
                </Box>

                {/* Seleção de Hora */}
                {selectedDate && (
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Horário da Consulta
                    </Typography>
                    <Grid container spacing={1}>
                      {availableTimes.map((time) => (
                        <Grid item xs={6} sm={4} key={time}>
                          <Button
                            variant={
                              selectedTime === time ? 'contained' : 'outlined'
                            }
                            size="small"
                            fullWidth
                            onClick={() => handleTimeSelect(time)}
                            startIcon={<TimeIcon />}
                          >
                            {formatTime(time)}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Stack>
            )}
          </Paper>
        </Grid>

        {/* Informações da Consulta */}
        <Grid item xs={12}>
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
              <EventIcon color="primary" />
              Informações da Consulta
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Sintomas *"
                  multiline
                  rows={4}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Descreva seus sintomas..."
                  helperText="Descreva os sintomas que está sentindo"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Observações Adicionais"
                  multiline
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Observações adicionais..."
                  helperText="Informações complementares (opcional)"
                />
              </Grid>
            </Grid>

            {/* Resumo da Consulta */}
            {selectedDoctor && selectedDate && selectedTime && (
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  bgcolor:
                    theme.palette.mode === 'dark' ? 'grey.700' : 'grey.50',
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Resumo da Consulta:
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Médico:</strong> {selectedDoctor.name}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Especialidade:</strong> {selectedDoctor.specialty}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Data:</strong> {formatDate(selectedDate)}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Horário:</strong> {formatTime(selectedTime)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={handleSubmit}
                disabled={
                  !selectedDoctor ||
                  !selectedDate ||
                  !selectedTime ||
                  !symptoms.trim()
                }
              >
                Agendar Consulta
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Dialog de Confirmação */}
      <Dialog
        open={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirmar Agendamento</DialogTitle>
        <DialogContent>
          {selectedDoctor && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Confirme os detalhes da sua consulta:
              </Typography>

              <Paper
                sx={{
                  p: 2,
                  bgcolor:
                    theme.palette.mode === 'dark' ? 'grey.700' : 'grey.50',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {selectedDoctor.name} - {selectedDoctor.specialty}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Data:</strong> {formatDate(selectedDate)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Horário:</strong> {formatTime(selectedTime)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>Sintomas:</strong> {symptoms}
                    </Typography>
                  </Grid>
                  {notes && (
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        <strong>Observações:</strong> {notes}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenConfirmation(false)}
            disabled={submitting}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmSchedule}
            variant="contained"
            disabled={submitting}
            startIcon={
              submitting ? <CircularProgress size={20} /> : <CheckIcon />
            }
          >
            {submitting ? 'Agendando...' : 'Confirmar Agendamento'}
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

export default ScheduleConsultationPage;
