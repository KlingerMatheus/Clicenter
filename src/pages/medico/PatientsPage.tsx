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
  TextField,
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
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Badge,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  MedicalServices as MedicalIcon,
  History as HistoryIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Add as AddIcon,
  LocationOn as LocationIcon,
  Bloodtype as BloodIcon,
  Height as HeightIcon,
  MonitorWeight as WeightIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import ContentLoading from '../../components/ContentLoading';

interface Patient {
  _id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
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
  consultations: Consultation[];
  createdAt: string;
}

interface MedicalRecord {
  _id: string;
  date: string;
  diagnosis: string;
  treatment: string;
  prescription: string;
  notes: string;
  doctor: string;
}

interface Consultation {
  _id: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'confirmed';
  symptoms: string;
  notes?: string;
}

const PatientsPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { token } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'view' | 'edit' | 'history'>(
    'view'
  );
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  useEffect(() => {
    // Mock data - simular carregamento
    setTimeout(() => {
      const mockPatients: Patient[] = [
        {
          _id: 'p1',
          name: 'Maria Silva',
          email: 'maria@email.com',
          phone: '(11) 99999-1111',
          dateOfBirth: '1985-03-15',
          gender: 'female',
          address: 'Rua das Flores, 123 - São Paulo, SP',
          bloodType: 'A+',
          height: 165,
          weight: 62,
          emergencyContact: {
            name: 'João Silva',
            phone: '(11) 99999-0000',
            relationship: 'Esposo',
          },
          medicalHistory: [
            {
              _id: 'mh1',
              date: '2024-01-15',
              diagnosis: 'Cefaleia tensional',
              treatment: 'Analgésicos e relaxamento muscular',
              prescription:
                'Paracetamol 500mg - 1 comprimido a cada 6 horas por 3 dias',
              notes:
                'Paciente relatou dor de cabeça persistente há 3 dias. Recomendado evitar estresse.',
              doctor: 'Dr. Carlos Mendes',
            },
            {
              _id: 'mh2',
              date: '2023-12-10',
              diagnosis: 'Resfriado comum',
              treatment: 'Repouso e hidratação',
              prescription: 'Vitamina C e paracetamol conforme necessário',
              notes: 'Sintomas leves, sem complicações.',
              doctor: 'Dr. Carlos Mendes',
            },
          ],
          consultations: [
            {
              _id: 'c1',
              date: '2024-01-15',
              time: '09:00',
              status: 'completed',
              symptoms: 'Dor de cabeça, tensão muscular',
              notes: 'Consulta realizada com sucesso',
            },
            {
              _id: 'c2',
              date: '2024-01-25',
              time: '14:30',
              status: 'scheduled',
              symptoms: 'Dor nas costas',
            },
          ],
          createdAt: '2023-01-15T10:00:00Z',
        },
        {
          _id: 'p2',
          name: 'João Santos',
          email: 'joao@email.com',
          phone: '(11) 99999-2222',
          dateOfBirth: '1978-07-22',
          gender: 'male',
          address: 'Av. Paulista, 456 - São Paulo, SP',
          bloodType: 'O+',
          height: 178,
          weight: 75,
          emergencyContact: {
            name: 'Ana Santos',
            phone: '(11) 99999-1111',
            relationship: 'Esposa',
          },
          medicalHistory: [
            {
              _id: 'mh3',
              date: '2024-01-15',
              diagnosis: 'Gastrite',
              treatment: 'Dieta e medicação',
              prescription: 'Omeprazol 20mg - 1 comprimido ao dia por 30 dias',
              notes:
                'Paciente com histórico de gastrite. Recomendado evitar alimentos ácidos.',
              doctor: 'Dr. Carlos Mendes',
            },
          ],
          consultations: [
            {
              _id: 'c3',
              date: '2024-01-15',
              time: '14:30',
              status: 'scheduled',
              symptoms: 'Dor abdominal, náuseas',
            },
          ],
          createdAt: '2023-02-20T14:30:00Z',
        },
        {
          _id: 'p3',
          name: 'Ana Costa',
          email: 'ana@email.com',
          phone: '(11) 99999-3333',
          dateOfBirth: '1992-11-08',
          gender: 'female',
          address: 'Rua Augusta, 789 - São Paulo, SP',
          bloodType: 'B+',
          height: 160,
          weight: 55,
          emergencyContact: {
            name: 'Pedro Costa',
            phone: '(11) 99999-2222',
            relationship: 'Irmão',
          },
          medicalHistory: [],
          consultations: [
            {
              _id: 'c4',
              date: '2024-01-16',
              time: '10:00',
              status: 'confirmed',
              symptoms: 'Febre, tosse seca',
            },
          ],
          createdAt: '2023-03-10T09:15:00Z',
        },
        {
          _id: 'p4',
          name: 'Pedro Oliveira',
          email: 'pedro@email.com',
          phone: '(11) 99999-4444',
          dateOfBirth: '1980-05-12',
          gender: 'male',
          address: 'Rua Oscar Freire, 321 - São Paulo, SP',
          bloodType: 'AB+',
          height: 182,
          weight: 80,
          emergencyContact: {
            name: 'Lucia Oliveira',
            phone: '(11) 99999-3333',
            relationship: 'Esposa',
          },
          medicalHistory: [
            {
              _id: 'mh4',
              date: '2023-11-20',
              diagnosis: 'Hérnia de disco',
              treatment: 'Fisioterapia e medicação',
              prescription:
                'Diclofenaco 50mg - 1 comprimido a cada 8 horas por 7 dias',
              notes:
                'Paciente com dor lombar intensa. Encaminhado para fisioterapia.',
              doctor: 'Dr. Carlos Mendes',
            },
          ],
          consultations: [
            {
              _id: 'c5',
              date: '2024-01-17',
              time: '16:00',
              status: 'scheduled',
              symptoms: 'Dor nas costas, dificuldade para dormir',
            },
          ],
          createdAt: '2023-04-05T16:45:00Z',
        },
        {
          _id: 'p5',
          name: 'Lucia Ferreira',
          email: 'lucia@email.com',
          phone: '(11) 99999-5555',
          dateOfBirth: '1975-09-30',
          gender: 'female',
          address: 'Rua Haddock Lobo, 654 - São Paulo, SP',
          bloodType: 'A-',
          height: 158,
          weight: 58,
          emergencyContact: {
            name: 'Roberto Ferreira',
            phone: '(11) 99999-4444',
            relationship: 'Filho',
          },
          medicalHistory: [
            {
              _id: 'mh5',
              date: '2023-10-15',
              diagnosis: 'Hipertensão arterial',
              treatment: 'Medicação contínua',
              prescription: 'Losartana 50mg - 1 comprimido ao dia',
              notes:
                'Paciente com pressão arterial elevada. Acompanhamento mensal necessário.',
              doctor: 'Dr. Carlos Mendes',
            },
          ],
          consultations: [
            {
              _id: 'c6',
              date: '2024-01-14',
              time: '11:00',
              status: 'cancelled',
              symptoms: 'Dor de cabeça',
              notes: 'Paciente cancelou por motivos pessoais',
            },
          ],
          createdAt: '2023-05-12T11:20:00Z',
        },
        {
          _id: 'p6',
          name: 'Carlos Mendes',
          email: 'carlos@email.com',
          phone: '(11) 99999-6666',
          dateOfBirth: '1988-12-03',
          gender: 'male',
          address: 'Av. Brigadeiro Faria Lima, 987 - São Paulo, SP',
          bloodType: 'O-',
          height: 175,
          weight: 70,
          emergencyContact: {
            name: 'Fernanda Mendes',
            phone: '(11) 99999-5555',
            relationship: 'Esposa',
          },
          medicalHistory: [],
          consultations: [
            {
              _id: 'c7',
              date: '2024-01-18',
              time: '08:30',
              status: 'scheduled',
              symptoms: 'Dor no peito, falta de ar',
            },
          ],
          createdAt: '2023-06-18T13:10:00Z',
        },
      ];
      setPatients(mockPatients);
      setLoading(false);
    }, 1000);
  }, []);

  const handleOpenDialog = (
    patient: Patient,
    type: 'view' | 'edit' | 'history'
  ) => {
    setSelectedPatient(patient);
    setDialogType(type);
    setActiveTab(0);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPatient(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
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

  const renderMobileCard = (patient: Patient) => (
    <Card
      key={patient._id}
      sx={{
        mb: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main }}>
            {patient.name.charAt(0)}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {patient.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {patient.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {patient.phone}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarIcon fontSize="small" color="action" />
              <Typography variant="body2">
                {calculateAge(patient.dateOfBirth)} anos
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BloodIcon fontSize="small" color="action" />
              <Typography variant="body2">{patient.bloodType}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <HeightIcon fontSize="small" color="action" />
              <Typography variant="body2">{patient.height}cm</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WeightIcon fontSize="small" color="action" />
              <Typography variant="body2">{patient.weight}kg</Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Chip
            label={`${patient.consultations.length} consultas`}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`${patient.medicalHistory.length} registros`}
            size="small"
            color="secondary"
            variant="outlined"
          />
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button
          size="small"
          startIcon={<ViewIcon />}
          onClick={() => handleOpenDialog(patient, 'view')}
        >
          Ver Detalhes
        </Button>
        <Button
          size="small"
          startIcon={<HistoryIcon />}
          onClick={() => handleOpenDialog(patient, 'history')}
        >
          Histórico
        </Button>
      </CardActions>
    </Card>
  );

  const renderDesktopTable = () => (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        borderRadius: 2,
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>
              Paciente
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>
              Idade
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>
              Contato
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>
              Tipo Sanguíneo
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>
              Consultas
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>
              Registros
            </TableCell>
            <TableCell align="center" sx={{ color: 'white', fontWeight: 600 }}>
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient._id} hover>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main }}>
                    {patient.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {patient.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {patient.gender === 'male'
                        ? 'Masculino'
                        : patient.gender === 'female'
                          ? 'Feminino'
                          : 'Outro'}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {calculateAge(patient.dateOfBirth)} anos
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(patient.dateOfBirth)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{patient.email}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {patient.phone}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={patient.bloodType}
                  size="small"
                  color="error"
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {patient.consultations.length} consultas
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {
                    patient.consultations.filter(
                      (c) => c.status === 'completed'
                    ).length
                  }{' '}
                  concluídas
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {patient.medicalHistory.length} registros
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(patient, 'view')}
                    title="Ver Detalhes"
                  >
                    <ViewIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(patient, 'history')}
                    title="Ver Histórico"
                  >
                    <HistoryIcon />
                  </IconButton>
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
      {patients.length === 0 ? (
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
            borderRadius: 2,
          }}
        >
          <PersonIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Nenhum paciente encontrado
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Você ainda não possui pacientes cadastrados.
          </Typography>
        </Paper>
      ) : (
        <>
          {isMobile ? (
            <Stack spacing={2}>{patients.map(renderMobileCard)}</Stack>
          ) : (
            renderDesktopTable()
          )}
        </>
      )}

      {/* Dialog para Ver Detalhes/Histórico */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {dialogType === 'view' && 'Detalhes do Paciente'}
          {dialogType === 'history' && 'Histórico Médico'}
        </DialogTitle>
        <DialogContent>
          {selectedPatient && (
            <Box sx={{ pt: 2 }}>
              {dialogType === 'view' && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper
                      sx={{
                        p: 3,
                        bgcolor:
                          theme.palette.mode === 'dark'
                            ? 'grey.800'
                            : 'grey.50',
                      }}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', mb: 3 }}
                      >
                        <Avatar
                          sx={{
                            mr: 2,
                            width: 64,
                            height: 64,
                            bgcolor: theme.palette.primary.main,
                          }}
                        >
                          {selectedPatient.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {selectedPatient.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Paciente desde{' '}
                            {formatDate(selectedPatient.createdAt)}
                          </Typography>
                        </Box>
                      </Box>

                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, mb: 2 }}
                          >
                            Informações Pessoais
                          </Typography>
                          <Stack spacing={1}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                              }}
                            >
                              <EmailIcon fontSize="small" color="action" />
                              <Typography variant="body2">
                                {selectedPatient.email}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                              }}
                            >
                              <PhoneIcon fontSize="small" color="action" />
                              <Typography variant="body2">
                                {selectedPatient.phone}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                              }}
                            >
                              <CalendarIcon fontSize="small" color="action" />
                              <Typography variant="body2">
                                {formatDate(selectedPatient.dateOfBirth)} (
                                {calculateAge(selectedPatient.dateOfBirth)}{' '}
                                anos)
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                              }}
                            >
                              <LocationIcon fontSize="small" color="action" />
                              <Typography variant="body2">
                                {selectedPatient.address}
                              </Typography>
                            </Box>
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, mb: 2 }}
                          >
                            Informações Médicas
                          </Typography>
                          <Stack spacing={1}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                              }}
                            >
                              <BloodIcon fontSize="small" color="action" />
                              <Typography variant="body2">
                                Tipo Sanguíneo: {selectedPatient.bloodType}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                              }}
                            >
                              <HeightIcon fontSize="small" color="action" />
                              <Typography variant="body2">
                                Altura: {selectedPatient.height}cm
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                              }}
                            >
                              <WeightIcon fontSize="small" color="action" />
                              <Typography variant="body2">
                                Peso: {selectedPatient.weight}kg
                              </Typography>
                            </Box>
                          </Stack>
                        </Grid>

                        <Grid item xs={12}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, mb: 2 }}
                          >
                            Contato de Emergência
                          </Typography>
                          <Paper
                            sx={{
                              p: 2,
                              bgcolor:
                                theme.palette.mode === 'dark'
                                  ? 'grey.700'
                                  : 'white',
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600 }}
                            >
                              {selectedPatient.emergencyContact.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {selectedPatient.emergencyContact.relationship}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {selectedPatient.emergencyContact.phone}
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              )}

              {dialogType === 'history' && (
                <Box>
                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    sx={{ mb: 3 }}
                  >
                    <Tab label="Consultas" />
                    <Tab label="Histórico Médico" />
                  </Tabs>

                  {activeTab === 0 && (
                    <Box>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Consultas ({selectedPatient.consultations.length})
                      </Typography>
                      {selectedPatient.consultations.length === 0 ? (
                        <Paper sx={{ p: 3, textAlign: 'center' }}>
                          <Typography color="text.secondary">
                            Nenhuma consulta registrada.
                          </Typography>
                        </Paper>
                      ) : (
                        <List>
                          {selectedPatient.consultations.map((consultation) => (
                            <ListItem key={consultation._id} divider>
                              <ListItemAvatar>
                                <Avatar
                                  sx={{ bgcolor: theme.palette.primary.main }}
                                >
                                  <MedicalIcon />
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
                                    <Typography variant="subtitle2">
                                      {formatDate(consultation.date)} às{' '}
                                      {consultation.time}
                                    </Typography>
                                    <Chip
                                      label={getStatusLabel(
                                        consultation.status
                                      )}
                                      color={
                                        getStatusColor(
                                          consultation.status
                                        ) as any
                                      }
                                      size="small"
                                    />
                                  </Box>
                                }
                                secondary={
                                  <Box>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      Sintomas: {consultation.symptoms}
                                    </Typography>
                                    {consultation.notes && (
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        Observações: {consultation.notes}
                                      </Typography>
                                    )}
                                  </Box>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </Box>
                  )}

                  {activeTab === 1 && (
                    <Box>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Histórico Médico (
                        {selectedPatient.medicalHistory.length})
                      </Typography>
                      {selectedPatient.medicalHistory.length === 0 ? (
                        <Paper sx={{ p: 3, textAlign: 'center' }}>
                          <Typography color="text.secondary">
                            Nenhum registro médico encontrado.
                          </Typography>
                        </Paper>
                      ) : (
                        <List>
                          {selectedPatient.medicalHistory.map((record) => (
                            <ListItem key={record._id} divider>
                              <ListItemAvatar>
                                <Avatar
                                  sx={{ bgcolor: theme.palette.secondary.main }}
                                >
                                  <HistoryIcon />
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
                                    <Typography variant="subtitle2">
                                      {formatDate(record.date)}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      - {record.doctor}
                                    </Typography>
                                  </Box>
                                }
                                secondary={
                                  <Box>
                                    <Typography
                                      variant="body2"
                                      sx={{ fontWeight: 600, mt: 1 }}
                                    >
                                      Diagnóstico: {record.diagnosis}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      Tratamento: {record.treatment}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      Prescrição: {record.prescription}
                                    </Typography>
                                    {record.notes && (
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        Observações: {record.notes}
                                      </Typography>
                                    )}
                                  </Box>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </Box>
                  )}
                </Box>
              )}
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

export default PatientsPage;
