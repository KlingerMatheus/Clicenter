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
  Chip,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  MedicalServices as MedicalIcon,
  Person as PersonIcon,
  LocalHospital as HospitalIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import ContentLoading from '../../components/ContentLoading';

interface MedicalRecord {
  _id: string;
  patient: {
    name: string;
    email: string;
    dateOfBirth: string;
  };
  doctor: {
    name: string;
    email: string;
  };
  consultationDate: string;
  diagnosis: string;
  prescription?: string;
  notes: string;
  status: 'active' | 'resolved' | 'follow_up';
}

const MedicalRecordsPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { token } = useAuth();

  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        // Simular dados por enquanto - será substituído pela API real
        const mockData: MedicalRecord[] = [
          {
            _id: '1',
            patient: {
              name: 'João Silva',
              email: 'joao@email.com',
              dateOfBirth: '1985-03-15',
            },
            doctor: { name: 'Dr. Maria Santos', email: 'maria@clinic.com' },
            consultationDate: '2024-01-15',
            diagnosis: 'Hipertensão arterial leve',
            prescription: 'Losartana 50mg - 1 comprimido ao dia',
            notes:
              'Paciente apresentou pressão arterial elevada. Recomendado controle de sal e exercícios físicos.',
            status: 'active',
          },
          {
            _id: '2',
            patient: {
              name: 'Ana Costa',
              email: 'ana@email.com',
              dateOfBirth: '1990-07-22',
            },
            doctor: { name: 'Dr. Carlos Oliveira', email: 'carlos@clinic.com' },
            consultationDate: '2024-01-10',
            diagnosis: 'Resfriado comum',
            prescription: 'Paracetamol 500mg - 1 comprimido a cada 6h',
            notes:
              'Sintomas leves, sem complicações. Recomendado repouso e hidratação.',
            status: 'resolved',
          },
          {
            _id: '3',
            patient: {
              name: 'Pedro Lima',
              email: 'pedro@email.com',
              dateOfBirth: '1978-11-08',
            },
            doctor: { name: 'Dr. Maria Santos', email: 'maria@clinic.com' },
            consultationDate: '2024-01-08',
            diagnosis: 'Diabetes tipo 2',
            prescription: 'Metformina 850mg - 2x ao dia',
            notes:
              'Paciente diagnosticado com diabetes. Iniciado tratamento e orientações sobre dieta.',
            status: 'follow_up',
          },
        ];

        // Simular delay de carregamento
        setTimeout(() => {
          setRecords(mockData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Erro ao buscar históricos:', error);
        setError('Erro ao carregar históricos médicos');
        setLoading(false);
      }
    };

    fetchRecords();
  }, [token]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'warning';
      case 'resolved':
        return 'success';
      case 'follow_up':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'resolved':
        return 'Resolvido';
      case 'follow_up':
        return 'Acompanhamento';
      default:
        return status;
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
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

  const handleViewRecord = (record: MedicalRecord) => {
    setSelectedRecord(record);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedRecord(null);
  };

  if (loading) {
    return <ContentLoading />;
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  const renderMobileCard = (record: MedicalRecord) => (
    <Card key={record._id} sx={{ mb: 2 }}>
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
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              {record.diagnosis}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {formatDate(record.consultationDate)}
            </Typography>
          </Box>
          <Chip
            label={getStatusLabel(record.status)}
            color={
              getStatusColor(record.status) as
                | 'success'
                | 'warning'
                | 'info'
                | 'error'
                | 'default'
            }
            size="small"
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <PersonIcon fontSize="small" color="action" />
          <Typography variant="body2">
            <strong>Paciente:</strong> {record.patient.name} (
            {calculateAge(record.patient.dateOfBirth)} anos)
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <HospitalIcon fontSize="small" color="action" />
          <Typography variant="body2">
            <strong>Médico:</strong> {record.doctor.name}
          </Typography>
        </Box>

        <Button
          variant="outlined"
          size="small"
          startIcon={<ViewIcon />}
          onClick={() => handleViewRecord(record)}
          fullWidth
        >
          Ver Detalhes
        </Button>
      </CardContent>
    </Card>
  );

  const renderDesktopTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Médico</TableCell>
            <TableCell>Diagnóstico</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record._id} hover>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {formatDate(record.consultationDate)}
                </Typography>
              </TableCell>
              <TableCell>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {record.patient.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {calculateAge(record.patient.dateOfBirth)} anos •{' '}
                    {record.patient.email}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {record.doctor.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {record.doctor.email}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {record.diagnosis}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={getStatusLabel(record.status)}
                  color={
                    getStatusColor(record.status) as
                      | 'success'
                      | 'warning'
                      | 'info'
                      | 'error'
                      | 'default'
                  }
                  size="small"
                />
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ViewIcon />}
                  onClick={() => handleViewRecord(record)}
                >
                  Ver
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        sx={{
          p: 2,
          mb: 3,
          boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
          borderRadius: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Visualize todos os históricos médicos dos pacientes, incluindo
          diagnósticos, prescrições e observações.
        </Typography>
      </Paper>

      {records.length === 0 ? (
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
            borderRadius: 2,
          }}
        >
          <MedicalIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Nenhum histórico encontrado
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Os históricos médicos aparecerão aqui quando forem criados
          </Typography>
        </Paper>
      ) : (
        <>
          {isMobile ? (
            <Stack spacing={2}>{records.map(renderMobileCard)}</Stack>
          ) : (
            renderDesktopTable()
          )}
        </>
      )}

      {/* Dialog para detalhes do histórico */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedRecord && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <MedicalIcon color="primary" />
                Histórico Médico - {selectedRecord.patient.name}
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Informações do Paciente
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2">
                    <strong>Nome:</strong> {selectedRecord.patient.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Email:</strong> {selectedRecord.patient.email}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Idade:</strong>{' '}
                    {calculateAge(selectedRecord.patient.dateOfBirth)} anos
                  </Typography>
                </Box>

                <Typography variant="h6" gutterBottom>
                  Informações da Consulta
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2">
                    <strong>Data:</strong>{' '}
                    {formatDate(selectedRecord.consultationDate)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Médico:</strong> {selectedRecord.doctor.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">
                      <strong>Status:</strong>
                    </Typography>
                    <Chip
                      label={getStatusLabel(selectedRecord.status)}
                      color={
                        getStatusColor(selectedRecord.status) as
                          | 'success'
                          | 'warning'
                          | 'info'
                          | 'error'
                          | 'default'
                      }
                      size="small"
                    />
                  </Box>
                </Box>

                <Typography variant="h6" gutterBottom>
                  Diagnóstico
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  {selectedRecord.diagnosis}
                </Typography>

                {selectedRecord.prescription && (
                  <>
                    <Typography variant="h6" gutterBottom>
                      Prescrição
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3 }}>
                      {selectedRecord.prescription}
                    </Typography>
                  </>
                )}

                <Typography variant="h6" gutterBottom>
                  Observações
                </Typography>
                <Typography variant="body2">{selectedRecord.notes}</Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Fechar</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default MedicalRecordsPage;
