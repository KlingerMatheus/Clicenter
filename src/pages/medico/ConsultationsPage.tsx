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
    date: string;
    time: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    notes?: string;
    diagnosis?: string;
    prescription?: string;
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
        prescription: ''
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    });

    useEffect(() => {
        fetchConsultations();
    }, [token]);

    const fetchConsultations = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/consultations/medico', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (data.success) {
                setConsultations(data.data);
            }
        } catch (error) {
            console.error('Erro ao buscar consultas:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (consultation: Consultation, type: 'reschedule' | 'report' | 'prescription') => {
        setSelectedConsultation(consultation);
        setDialogType(type);
        setFormData({
            date: consultation.date,
            time: consultation.time,
            notes: consultation.notes || '',
            diagnosis: consultation.diagnosis || '',
            prescription: consultation.prescription || ''
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedConsultation(null);
        setFormData({ date: '', time: '', notes: '', diagnosis: '', prescription: '' });
    };

    const handleSubmit = async () => {
        if (!selectedConsultation) return;

        try {
            let endpoint = '';
            let payload = {};

            switch (dialogType) {
                case 'reschedule':
                    endpoint = `http://localhost:3001/api/consultations/${selectedConsultation._id}/reschedule`;
                    payload = { date: formData.date, time: formData.time };
                    break;
                case 'report':
                    endpoint = `http://localhost:3001/api/consultations/${selectedConsultation._id}/report`;
                    payload = { notes: formData.notes, diagnosis: formData.diagnosis };
                    break;
                case 'prescription':
                    endpoint = `http://localhost:3001/api/consultations/${selectedConsultation._id}/prescription`;
                    payload = { prescription: formData.prescription };
                    break;
            }

            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.success) {
                setSnackbar({
                    open: true,
                    message: dialogType === 'reschedule' ? 'Consulta reagendada com sucesso!' :
                        dialogType === 'report' ? 'Relatório gerado com sucesso!' :
                            'Receita gerada com sucesso!',
                    severity: 'success'
                });
                fetchConsultations();
                handleCloseDialog();
            }
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
            default: return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'scheduled': return 'Agendada';
            case 'completed': return 'Concluída';
            case 'cancelled': return 'Cancelada';
            default: return status;
        }
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
                        {new Date(consultation.date).toLocaleDateString('pt-BR')} às {consultation.time}
                    </Typography>
                </Box>

                {consultation.notes && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {consultation.notes}
                    </Typography>
                )}
            </CardContent>

            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleOpenDialog(consultation, 'reschedule')}
                        disabled={consultation.status === 'completed'}
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
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Data</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Horário</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Status</TableCell>
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
                                </Box>
                            </TableCell>
                            <TableCell>
                                {new Date(consultation.date).toLocaleDateString('pt-BR')}
                            </TableCell>
                            <TableCell>{consultation.time}</TableCell>
                            <TableCell>
                                <Chip
                                    label={getStatusLabel(consultation.status)}
                                    color={getStatusColor(consultation.status) as any}
                                    size="small"
                                />
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
                                        disabled={consultation.status === 'completed'}
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Minhas Consultas
                </Typography>
            </Box>

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
                            <Paper sx={{ p: 2, mb: 3, bgcolor: 'grey.50' }}>
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
                                            <strong>Data:</strong> {new Date(selectedConsultation.date).toLocaleDateString('pt-BR')}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body2">
                                            <strong>Horário:</strong> {selectedConsultation.time}
                                        </Typography>
                                    </Grid>
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