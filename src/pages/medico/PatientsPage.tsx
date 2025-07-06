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
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@mui/material';
import {
    People as PeopleIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    CalendarToday as CalendarIcon,
    MedicalServices as MedicalIcon,
    Event as EventIcon,
    Visibility as ViewIcon,
    History as HistoryIcon,
    LocalHospital as PrescriptionIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import ContentLoading from '../../components/ContentLoading';

interface Patient {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    birthDate?: string;
    gender?: string;
    address?: string;
    consultations: Consultation[];
    medicalRecords: MedicalRecord[];
}

interface Consultation {
    _id: string;
    date: string;
    time: string;
    status: string;
    notes?: string;
    diagnosis?: string;
    prescription?: string;
}

interface MedicalRecord {
    _id: string;
    date: string;
    diagnosis: string;
    prescription?: string;
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
    const [dialogType, setDialogType] = useState<'info' | 'history'>('info');
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    });

    useEffect(() => {
        fetchPatients();
    }, [token]);

    const fetchPatients = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/patients/medico', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (data.success) {
                setPatients(data.data);
            }
        } catch (error) {
            console.error('Erro ao buscar pacientes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (patient: Patient, type: 'info' | 'history') => {
        setSelectedPatient(patient);
        setDialogType(type);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedPatient(null);
    };

    const getGenderLabel = (gender?: string) => {
        switch (gender) {
            case 'M': return 'Masculino';
            case 'F': return 'Feminino';
            default: return 'Não informado';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const renderMobileCard = (patient: Patient) => (
        <Card key={patient._id} sx={{
            mb: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
            borderRadius: 2
        }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 48, height: 48 }}>
                        {patient.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {patient.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {patient.email}
                        </Typography>
                    </Box>
                </Box>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Consultas:</strong> {patient.consultations.length}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Históricos:</strong> {patient.medicalRecords.length}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>

            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button
                    size="small"
                    startIcon={<ViewIcon />}
                    onClick={() => handleOpenDialog(patient, 'info')}
                >
                    Informações
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
        <TableContainer component={Paper} sx={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
            borderRadius: 2
        }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Paciente</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Contato</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Data Nasc.</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Consultas</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Históricos</TableCell>
                        <TableCell align="center" sx={{ color: 'white', fontWeight: 600 }}>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {patients.map((patient) => (
                        <TableRow key={patient._id} hover>
                            <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 40, height: 40 }}>
                                        {patient.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                            {patient.name}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {getGenderLabel(patient.gender)}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box>
                                    <Typography variant="body2">
                                        {patient.email}
                                    </Typography>
                                    {patient.phone && (
                                        <Typography variant="caption" color="text.secondary">
                                            {patient.phone}
                                        </Typography>
                                    )}
                                </Box>
                            </TableCell>
                            <TableCell>
                                {patient.birthDate ? formatDate(patient.birthDate) : 'Não informado'}
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={patient.consultations.length}
                                    color="primary"
                                    size="small"
                                    icon={<EventIcon />}
                                />
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={patient.medicalRecords.length}
                                    color="secondary"
                                    size="small"
                                    icon={<MedicalIcon />}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(patient, 'info')}
                                        title="Ver Informações"
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Meus Pacientes
                </Typography>
            </Box>

            {patients.length === 0 ? (
                <Paper sx={{
                    p: 4,
                    textAlign: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                    borderRadius: 2
                }}>
                    <PeopleIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
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
                        <Stack spacing={2}>
                            {patients.map(renderMobileCard)}
                        </Stack>
                    ) : (
                        renderDesktopTable()
                    )}
                </>
            )}

            {/* Dialog para Informações do Paciente */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    {dialogType === 'info' && 'Informações do Paciente'}
                    {dialogType === 'history' && 'Histórico Médico'}
                </DialogTitle>
                <DialogContent>
                    {selectedPatient && (
                        <Box sx={{ pt: 2 }}>
                            {dialogType === 'info' && (
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 64, height: 64 }}>
                                                {selectedPatient.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                    {selectedPatient.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {getGenderLabel(selectedPatient.gender)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <EmailIcon color="action" />
                                            <Typography variant="body2">
                                                <strong>Email:</strong> {selectedPatient.email}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    {selectedPatient.phone && (
                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <PhoneIcon color="action" />
                                                <Typography variant="body2">
                                                    <strong>Telefone:</strong> {selectedPatient.phone}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    )}

                                    {selectedPatient.birthDate && (
                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <CalendarIcon color="action" />
                                                <Typography variant="body2">
                                                    <strong>Data de Nascimento:</strong> {formatDate(selectedPatient.birthDate)}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    )}

                                    {selectedPatient.address && (
                                        <Grid item xs={12}>
                                            <Typography variant="body2">
                                                <strong>Endereço:</strong> {selectedPatient.address}
                                            </Typography>
                                        </Grid>
                                    )}

                                    <Grid item xs={12}>
                                        <Divider sx={{ my: 2 }} />
                                        <Typography variant="h6" sx={{ mb: 2 }}>
                                            Resumo
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Paper sx={{ p: 2, textAlign: 'center' }}>
                                                    <Typography variant="h4" color="primary">
                                                        {selectedPatient.consultations.length}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Consultas
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Paper sx={{ p: 2, textAlign: 'center' }}>
                                                    <Typography variant="h4" color="secondary">
                                                        {selectedPatient.medicalRecords.length}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Históricos
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}

                            {dialogType === 'history' && (
                                <Box>
                                    <Typography variant="h6" sx={{ mb: 2 }}>
                                        Histórico Médico - {selectedPatient.name}
                                    </Typography>

                                    {selectedPatient.medicalRecords.length === 0 ? (
                                        <Paper sx={{ p: 3, textAlign: 'center' }}>
                                            <MedicalIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                                            <Typography variant="body1" color="text.secondary">
                                                Nenhum histórico médico encontrado.
                                            </Typography>
                                        </Paper>
                                    ) : (
                                        <List>
                                            {selectedPatient.medicalRecords.map((record, index) => (
                                                <Paper key={record._id} sx={{ mb: 2, p: 2 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                            {formatDate(record.date)}
                                                        </Typography>
                                                        <Chip label="Histórico" size="small" color="secondary" />
                                                    </Box>

                                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                                        <strong>Diagnóstico:</strong> {record.diagnosis}
                                                    </Typography>

                                                    {record.prescription && (
                                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                                            <strong>Prescrição:</strong> {record.prescription}
                                                        </Typography>
                                                    )}

                                                    {record.notes && (
                                                        <Typography variant="body2" color="text.secondary">
                                                            <strong>Observações:</strong> {record.notes}
                                                        </Typography>
                                                    )}
                                                </Paper>
                                            ))}
                                        </List>
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
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default PatientsPage; 