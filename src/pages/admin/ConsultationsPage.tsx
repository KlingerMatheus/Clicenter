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
  Skeleton,
  Alert,
} from '@mui/material';
import {
  Event as EventIcon,
  Person as PersonIcon,
  LocalHospital as HospitalIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import ContentLoading from '../../components/ContentLoading';

interface Consultation {
  _id: string;
  patient: {
    name: string;
    email: string;
  };
  doctor: {
    name: string;
    email: string;
  };
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: string;
  notes?: string;
}

const ConsultationsPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { token } = useAuth();

  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        setLoading(true);
        // Simular dados por enquanto - será substituído pela API real
        const mockData: Consultation[] = [
          {
            _id: '1',
            patient: { name: 'João Silva', email: 'joao@email.com' },
            doctor: { name: 'Dr. Maria Santos', email: 'maria@clinic.com' },
            date: '2024-01-15',
            time: '14:00',
            status: 'completed',
            type: 'Consulta Regular',
            notes: 'Paciente apresentou melhora significativa',
          },
          {
            _id: '2',
            patient: { name: 'Ana Costa', email: 'ana@email.com' },
            doctor: { name: 'Dr. Carlos Oliveira', email: 'carlos@clinic.com' },
            date: '2024-01-16',
            time: '10:30',
            status: 'scheduled',
            type: 'Primeira Consulta',
          },
          {
            _id: '3',
            patient: { name: 'Pedro Lima', email: 'pedro@email.com' },
            doctor: { name: 'Dr. Maria Santos', email: 'maria@clinic.com' },
            date: '2024-01-14',
            time: '16:00',
            status: 'cancelled',
            type: 'Retorno',
            notes: 'Paciente cancelou por motivos pessoais',
          },
        ];

        // Simular delay de carregamento
        setTimeout(() => {
          setConsultations(mockData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Erro ao buscar consultas:', error);
        setError('Erro ao carregar consultas');
        setLoading(false);
      }
    };

    fetchConsultations();
  }, [token]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'scheduled':
        return 'primary';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluída';
      case 'scheduled':
        return 'Agendada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
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

  const renderMobileCard = (consultation: Consultation) => (
    <Card key={consultation._id} sx={{ mb: 2 }}>
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
              {consultation.type}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {formatDate(consultation.date)} às {consultation.time}
            </Typography>
          </Box>
          <Chip
            label={getStatusLabel(consultation.status)}
            color={getStatusColor(consultation.status) as any}
            size="small"
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <PersonIcon fontSize="small" color="action" />
          <Typography variant="body2">
            <strong>Paciente:</strong> {consultation.patient.name}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <HospitalIcon fontSize="small" color="action" />
          <Typography variant="body2">
            <strong>Médico:</strong> {consultation.doctor.name}
          </Typography>
        </Box>

        {consultation.notes && (
          <Box sx={{ mt: 2, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Observações:</strong> {consultation.notes}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  const renderDesktopTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Data/Hora</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Médico</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Observações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {consultations.map((consultation) => (
            <TableRow key={consultation._id} hover>
              <TableCell>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {formatDate(consultation.date)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {consultation.time}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {consultation.type}
                </Typography>
              </TableCell>
              <TableCell>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {consultation.patient.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {consultation.patient.email}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {consultation.doctor.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {consultation.doctor.email}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  label={getStatusLabel(consultation.status)}
                  color={getStatusColor(consultation.status) as any}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {consultation.notes || '-'}
                </Typography>
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
          Visualize todas as consultas do sistema, incluindo agendamentos,
          consultas realizadas e cancelamentos.
        </Typography>
      </Paper>

      {consultations.length === 0 ? (
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
            borderRadius: 2,
          }}
        >
          <EventIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Nenhuma consulta encontrada
          </Typography>
          <Typography variant="body2" color="text.secondary">
            As consultas aparecerão aqui quando forem criadas
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
    </Box>
  );
};

export default ConsultationsPage;
