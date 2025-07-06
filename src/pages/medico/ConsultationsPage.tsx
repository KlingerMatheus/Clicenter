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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
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
    Divider,
    Grid
} from '@mui/material';
import {
    Event as EventIcon,
    Edit as EditIcon,
    Description as ReportIcon,
    LocalHospital as PrescriptionIcon,
    Person as PersonIcon,
    Schedule as ScheduleIcon,
    CheckCircle as CheckIcon,
    Cancel as CancelIcon,
    Add as AddIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import ContentLoading from '../../components/ContentLoading';
import LoadingButton from '../../components/LoadingButton';

interface Consultation {
    _id: string;
    patientId: string;
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    date: string;
    time: string;
    status: 'scheduled' | 'completed' | 'cancelled' | 'confirmed';
    notes?: string;
    diagnosis?: string;
    prescription?: string;
    symptoms?: string;
    createdAt: string;
}

const ConsultationsPage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { token } = useAuth();
    const [consultations, setConsultations] = useState<Consultation[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState<'reschedule' | 'report' | 'prescription'>('reschedule');
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        notes: '',
        diagnosis: '',
        prescription: '',
        symptoms: ''
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    });

    useEffect(() => {
        // Mock data - simular carregamento
        setTimeout(() => {
            const mockConsultations: Consultation[] = [
                {
                    _id: '1',
                    patientId: 'p1',
                    patientName: 'Maria Silva',
                    patientEmail: 'maria@email.com',
                    patientPhone: '(11) 99999-1111',
                    date: '2024-01-15',
                    time: '09:00',
                    status: 'completed',
                    notes: 'Paciente relatou dor de cabeça persistente há 3 dias.',
                    diagnosis: 'Cefaleia tensional',
                    prescription: 'Paracetamol 500mg - 1 comprimido a cada 6 horas por 3 dias',
                    symptoms: 'Dor de cabeça, tensão muscular',
                    createdAt: '2024-01-10T10:00:00Z'
                },
                {
                    _id: '2',
                    patientId: 'p2',
                    patientName: 'João Santos',
                    patientEmail: 'joao@email.com',
                    patientPhone: '(11) 99999-2222',
                    date: '2024-01-15',
                    time: '14:30',
                    status: 'scheduled',
                    symptoms: 'Dor abdominal, náuseas',
                    createdAt: '2024-01-12T14:00:00Z'
                },
                {
                    _id: '3',
                    patientId: 'p3',
                    patientName: 'Ana Costa',
                    patientEmail: 'ana@email.com',
                    patientPhone: '(11) 99999-3333',
                    date: '2024-01-16',
                    time: '10:00',
                    status: 'confirmed',
                    symptoms: 'Febre, tosse seca',
                    createdAt: '2024-01-13T09:30:00Z'
                },
                {
                    _id: '4',
                    patientId: 'p4',
                    patientName: 'Pedro Oliveira',
                    patientEmail: 'pedro@email.com',
                    patientPhone: '(11) 99999-4444',
                    date: '2024-01-17',
                    time: '16:00',
                    status: 'scheduled',
                    symptoms: 'Dor nas costas, dificuldade para dormir',
                    createdAt: '2024-01-14T11:15:00Z'
                },
                {
                    _id: '5',
                    patientId: 'p5',
                    patientName: 'Lucia Ferreira',
                    patientEmail: 'lucia@email.com',
                    patientPhone: '(11) 99999-5555',
                    date: '2024-01-14',
                    time: '11:00',
                    status: 'cancelled',
                    notes: 'Paciente cancelou por motivos pessoais',
                    createdAt: '2024-01-11T16:45:00Z'
                },
                {
                    _id: '6',
                    patientId: 'p6',
                    patientName: 'Carlos Mendes',
                    patientEmail: 'carlos@email.com',
                    patientPhone: '(11) 99999-6666',
                    date: '2024-01-18',
                    time: '08:30',
                    status: 'scheduled',
                    symptoms: 'Dor no peito, falta de ar',
                    createdAt: '2024-01-15T13:20:00Z'
                }
            ];
            setConsultations(mockConsultations);
            setLoading(false);
        }, 1000);
    }, []);

    const handleOpenDialog = (consultation: Consultation, type: 'reschedule' | 'report' | 'prescription') => {
        setSelectedConsultation(consultation);
        setDialogType(type);
        setFormData({
            date: consultation.date,
            time: consultation.time,
            notes: consultation.notes || '',
            diagnosis: consultation.diagnosis || '',
            prescription: consultation.prescription || '',
            symptoms: consultation.symptoms || ''
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedConsultation(null);
        setFormData({ date: '', time: '', notes: '', diagnosis: '', prescription: '', symptoms: '' });
    };

    const handleSubmit = async () => {
        if (!selectedConsultation) return;

        try {
            // Simular processamento
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Atualizar dados mock
            const updatedConsultations = consultations.map(consultation => {
                if (consultation._id === selectedConsultation._id) {
                    return {
                        ...consultation,
                        ...formData
                    };
                }
                return consultation;
            });

            setConsultations(updatedConsultations);

            setSnackbar({
                open: true,
                message: dialogType === 'reschedule' ? 'Consulta reagendada com sucesso!' :
                    dialogType === 'report' ? 'Relatório gerado com sucesso!' :
                        'Receita gerada com sucesso!',
                severity: 'success'
            });
            handleCloseDialog();
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Erro ao processar solicitação',
                severity: 'error'
            });
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'scheduled': return 'primary';
            case 'completed': return 'success';
            case 'cancelled': return 'error';
            case 'confirmed': return 'warning';
            default: return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'scheduled': return 'Agendada';
            case 'completed': return 'Concluída';
            case 'cancelled': return 'Cancelada';
            case 'confirmed': return 'Confirmada';
            default: return status;
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
        <Card key={consultation._id} sx={{
            mb: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
            borderRadius: 2
        }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {consultation.patientName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {consultation.patientEmail}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {consultation.patientPhone}
                        </Typography>
                    </Box>
                    <Chip
                        label={getStatusLabel(consultation.status)}
                        color={getStatusColor(consultation.status) as any}
                        size="small"
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <ScheduleIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                        {formatDateTime(consultation.date, consultation.time)}
                    </Typography>
                </Box>

                {consultation.symptoms && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        <strong>Sintomas:</strong> {consultation.symptoms}
                    </Typography>
                )}

                {consultation.notes && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        <strong>Observações:</strong> {consultation.notes}
                    </Typography>
                )}
            </CardContent>

            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleOpenDialog(consultation, 'reschedule')}
                        disabled={consultation.status === 'completed' || consultation.status === 'cancelled'}
                    >
                        Reagendar
                    </Button>
                    <Button
                        size="small"
                        startIcon={<ReportIcon />}
                        onClick={() => handleOpenDialog(consultation, 'report')}
                        disabled={consultation.status !== 'completed'}
                    >
                        Relatório
                    </Button>
                    <Button
                        size="small"
                        startIcon={<PrescriptionIcon />}
                        onClick={() => handleOpenDialog(consultation, 'prescription')}
                        disabled={consultation.status !== 'completed'}
                    >
                        Receita
                    </Button>
                </Box>
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
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Data/Hora</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Status</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Sintomas</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Observações</TableCell>
                        <TableCell align="center" sx={{ color: 'white', fontWeight: 600 }}>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {consultations.map((consultation) => (
                        <TableRow key={consultation._id} hover>
                            <TableCell>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                        {consultation.patientName}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {consultation.patientEmail}
                                    </Typography>
                                    <br />
                                    <Typography variant="caption" color="text.secondary">
                                        {consultation.patientPhone}
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
                                />
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {consultation.symptoms || '-'}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {consultation.notes || '-'}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(consultation, 'reschedule')}
                                        disabled={consultation.status === 'completed' || consultation.status === 'cancelled'}
                                        title="Reagendar"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(consultation, 'report')}
                                        disabled={consultation.status !== 'completed'}
                                        title="Gerar Relatório"
                                    >
                                        <ReportIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(consultation, 'prescription')}
                                        disabled={consultation.status !== 'completed'}
                                        title="Gerar Receita"
                                    >
                                        <PrescriptionIcon />
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
            {consultations.length === 0 ? (
                <Paper sx={{
                    p: 4,
                    textAlign: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                    borderRadius: 2
                }}>
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
                        <Stack spacing={2}>
                            {consultations.map(renderMobileCard)}
                        </Stack>
                    ) : (
                        renderDesktopTable()
                    )}
                </>
            )}

            {/* Dialog para Reagendar/Relatório/Receita */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    {dialogType === 'reschedule' && 'Reagendar Consulta'}
                    {dialogType === 'report' && 'Gerar Relatório'}
                    {dialogType === 'prescription' && 'Gerar Receita'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        {selectedConsultation && (
                            <Paper sx={{ p: 2, mb: 3, bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                    Informações do Paciente
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body2">
                                            <strong>Nome:</strong> {selectedConsultation.patientName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body2">
                                            <strong>Email:</strong> {selectedConsultation.patientEmail}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body2">
                                            <strong>Telefone:</strong> {selectedConsultation.patientPhone}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body2">
                                            <strong>Data:</strong> {formatDate(selectedConsultation.date)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body2">
                                            <strong>Horário:</strong> {selectedConsultation.time}
                                        </Typography>
                                    </Grid>
                                    {selectedConsultation.symptoms && (
                                        <Grid item xs={12}>
                                            <Typography variant="body2">
                                                <strong>Sintomas:</strong> {selectedConsultation.symptoms}
                                            </Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            </Paper>
                        )}

                        {dialogType === 'reschedule' && (
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Nova Data"
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Novo Horário"
                                        type="time"
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                            </Grid>
                        )}

                        {dialogType === 'report' && (
                            <Stack spacing={2}>
                                <TextField
                                    fullWidth
                                    label="Observações"
                                    multiline
                                    rows={4}
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                />
                                <TextField
                                    fullWidth
                                    label="Diagnóstico"
                                    multiline
                                    rows={3}
                                    value={formData.diagnosis}
                                    onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                                />
                            </Stack>
                        )}

                        {dialogType === 'prescription' && (
                            <TextField
                                fullWidth
                                label="Receita Médica"
                                multiline
                                rows={6}
                                value={formData.prescription}
                                onChange={(e) => setFormData({ ...formData, prescription: e.target.value })}
                                placeholder="Descreva a prescrição médica..."
                            />
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {dialogType === 'reschedule' && 'Reagendar'}
                        {dialogType === 'report' && 'Gerar Relatório'}
                        {dialogType === 'prescription' && 'Gerar Receita'}
                    </Button>
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

export default ConsultationsPage; 