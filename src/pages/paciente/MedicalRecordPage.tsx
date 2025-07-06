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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    useTheme,
    useMediaQuery,
    Card,
    CardContent,
    Stack,
    Grid,
    Chip,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider
} from '@mui/material';
import {
    History as HistoryIcon,
    MedicalServices as MedicalIcon,
    Person as PersonIcon,
    CalendarToday as CalendarIcon,
    Description as DescriptionIcon,
    LocalHospital as PrescriptionIcon,
    Visibility as ViewIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import ContentLoading from '../../components/ContentLoading';

interface MedicalRecord {
    _id: string;
    date: string;
    diagnosis: string;
    treatment: string;
    prescription: string;
    notes: string;
    doctor: string;
    doctorEmail: string;
    doctorPhone: string;
    symptoms: string;
    vitalSigns?: {
        bloodPressure: string;
        heartRate: string;
        temperature: string;
        weight: string;
    };
    exams?: string[];
    createdAt: string;
}

const MedicalRecordPage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { token } = useAuth();
    const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        // Mock data - simular carregamento
        setTimeout(() => {
            const mockMedicalRecords: MedicalRecord[] = [
                {
                    _id: '1',
                    date: '2024-01-15',
                    diagnosis: 'Cefaleia tensional',
                    treatment: 'Analgésicos e relaxamento muscular',
                    prescription: 'Paracetamol 500mg - 1 comprimido a cada 6 horas por 3 dias',
                    notes: 'Paciente relatou dor de cabeça persistente há 3 dias. Recomendado evitar estresse e praticar exercícios de relaxamento.',
                    doctor: 'Dr. Carlos Mendes',
                    doctorEmail: 'carlos.mendes@clinica.com',
                    doctorPhone: '(11) 99999-0001',
                    symptoms: 'Dor de cabeça, tensão muscular, irritabilidade',
                    vitalSigns: {
                        bloodPressure: '120/80 mmHg',
                        heartRate: '72 bpm',
                        temperature: '36.8°C',
                        weight: '70 kg'
                    },
                    exams: ['Hemograma completo', 'Glicemia em jejum'],
                    createdAt: '2024-01-15T10:00:00Z'
                },
                {
                    _id: '2',
                    date: '2023-12-10',
                    diagnosis: 'Resfriado comum',
                    treatment: 'Repouso e hidratação',
                    prescription: 'Vitamina C e paracetamol conforme necessário',
                    notes: 'Sintomas leves, sem complicações. Paciente orientado sobre cuidados básicos.',
                    doctor: 'Dr. Ana Silva',
                    doctorEmail: 'ana.silva@clinica.com',
                    doctorPhone: '(11) 99999-0002',
                    symptoms: 'Febre, tosse seca, coriza, dor de garganta',
                    vitalSigns: {
                        bloodPressure: '118/78 mmHg',
                        heartRate: '76 bpm',
                        temperature: '37.2°C',
                        weight: '70 kg'
                    },
                    createdAt: '2023-12-10T14:30:00Z'
                },
                {
                    _id: '3',
                    date: '2023-11-20',
                    diagnosis: 'Hérnia de disco L4-L5',
                    treatment: 'Fisioterapia e medicação',
                    prescription: 'Diclofenaco 50mg - 1 comprimido a cada 8 horas por 7 dias',
                    notes: 'Paciente com dor lombar intensa. Encaminhado para fisioterapia e reavaliação em 30 dias.',
                    doctor: 'Dr. Pedro Santos',
                    doctorEmail: 'pedro.santos@clinica.com',
                    doctorPhone: '(11) 99999-0003',
                    symptoms: 'Dor nas costas, dificuldade para dormir, irradiação para membro inferior',
                    vitalSigns: {
                        bloodPressure: '125/82 mmHg',
                        heartRate: '74 bpm',
                        temperature: '36.9°C',
                        weight: '71 kg'
                    },
                    exams: ['Ressonância magnética da coluna lombar'],
                    createdAt: '2023-11-20T16:00:00Z'
                },
                {
                    _id: '4',
                    date: '2023-10-15',
                    diagnosis: 'Hipertensão arterial',
                    treatment: 'Medicação contínua e mudança de hábitos',
                    prescription: 'Losartana 50mg - 1 comprimido ao dia',
                    notes: 'Paciente com pressão arterial elevada. Acompanhamento mensal necessário. Orientado sobre dieta e exercícios.',
                    doctor: 'Dr. Lucia Ferreira',
                    doctorEmail: 'lucia.ferreira@clinica.com',
                    doctorPhone: '(11) 99999-0004',
                    symptoms: 'Dor de cabeça, tontura, cansaço',
                    vitalSigns: {
                        bloodPressure: '150/95 mmHg',
                        heartRate: '78 bpm',
                        temperature: '36.7°C',
                        weight: '72 kg'
                    },
                    exams: ['Hemograma completo', 'Creatinina', 'Glicemia', 'Colesterol total'],
                    createdAt: '2023-10-15T11:00:00Z'
                },
                {
                    _id: '5',
                    date: '2023-09-05',
                    diagnosis: 'Gastrite',
                    treatment: 'Dieta e medicação',
                    prescription: 'Omeprazol 20mg - 1 comprimido ao dia por 30 dias',
                    notes: 'Paciente com histórico de gastrite. Recomendado evitar alimentos ácidos e refeições pesadas.',
                    doctor: 'Dr. Roberto Costa',
                    doctorEmail: 'roberto.costa@clinica.com',
                    doctorPhone: '(11) 99999-0005',
                    symptoms: 'Dor abdominal, náuseas, azia',
                    vitalSigns: {
                        bloodPressure: '122/80 mmHg',
                        heartRate: '72 bpm',
                        temperature: '36.8°C',
                        weight: '71 kg'
                    },
                    exams: ['Endoscopia digestiva alta'],
                    createdAt: '2023-09-05T09:30:00Z'
                }
            ];
            setMedicalRecords(mockMedicalRecords);
            setLoading(false);
        }, 1000);
    }, []);

    const handleOpenDialog = (record: MedicalRecord) => {
        setSelectedRecord(record);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedRecord(null);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const renderMobileCard = (record: MedicalRecord) => (
        <Card key={record._id} sx={{
            mb: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
            borderRadius: 2,
            bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white'
        }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {record.doctor}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {record.doctorEmail}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {record.doctorPhone}
                        </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                        {formatDate(record.date)}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <CalendarIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                        {formatDate(record.date)}
                    </Typography>
                </Box>

                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    Diagnóstico: {record.diagnosis}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Sintomas:</strong> {record.symptoms}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Tratamento:</strong> {record.treatment}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Prescrição:</strong> {record.prescription}
                </Typography>

                {record.notes && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        <strong>Observações:</strong> {record.notes}
                    </Typography>
                )}

                {record.exams && record.exams.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
                            Exames solicitados:
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {record.exams.map((exam, index) => (
                                <Chip
                                    key={index}
                                    label={exam}
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                />
                            ))}
                        </Stack>
                    </Box>
                )}
            </CardContent>

            <Box sx={{ px: 2, pb: 2 }}>
                <Button
                    fullWidth
                    size="small"
                    startIcon={<ViewIcon />}
                    onClick={() => handleOpenDialog(record)}
                    variant="outlined"
                >
                    Ver Detalhes Completos
                </Button>
            </Box>
        </Card>
    );

    const renderDesktopTable = () => (
        <TableContainer component={Paper} sx={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
            borderRadius: 2,
            bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white'
        }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Médico</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Data</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Diagnóstico</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Sintomas</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Tratamento</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Exames</TableCell>
                        <TableCell align="center" sx={{ color: 'white', fontWeight: 600 }}>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {medicalRecords.map((record) => (
                        <TableRow key={record._id} hover>
                            <TableCell>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                        {record.doctor}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {record.doctorEmail}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">
                                    {formatDate(record.date)}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {record.diagnosis}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {record.symptoms}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {record.treatment}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                {record.exams && record.exams.length > 0 ? (
                                    <Chip
                                        label={`${record.exams.length} exames`}
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                    />
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        -
                                    </Typography>
                                )}
                            </TableCell>
                            <TableCell align="center">
                                <Button
                                    size="small"
                                    startIcon={<ViewIcon />}
                                    onClick={() => handleOpenDialog(record)}
                                    variant="outlined"
                                >
                                    Ver Detalhes
                                </Button>
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
            {medicalRecords.length === 0 ? (
                <Paper sx={{
                    p: 4,
                    textAlign: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                    borderRadius: 2,
                    bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white'
                }}>
                    <HistoryIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        Nenhum registro médico encontrado
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Você ainda não possui registros médicos.
                    </Typography>
                </Paper>
            ) : (
                <>
                    {isMobile ? (
                        <Stack spacing={2}>
                            {medicalRecords.map(renderMobileCard)}
                        </Stack>
                    ) : (
                        renderDesktopTable()
                    )}
                </>
            )}

            {/* Dialog para Ver Detalhes */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    Detalhes do Registro Médico
                </DialogTitle>
                <DialogContent>
                    {selectedRecord && (
                        <Box sx={{ pt: 2 }}>
                            <Paper sx={{ p: 3, mb: 3, bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                                    Informações do Médico
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body2">
                                            <strong>Nome:</strong> {selectedRecord.doctor}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body2">
                                            <strong>Email:</strong> {selectedRecord.doctorEmail}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body2">
                                            <strong>Telefone:</strong> {selectedRecord.doctorPhone}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body2">
                                            <strong>Data:</strong> {formatDate(selectedRecord.date)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>

                            <Paper sx={{ p: 3, mb: 3, bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                                    Informações Clínicas
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                                            Diagnóstico: {selectedRecord.diagnosis}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Sintomas:</strong> {selectedRecord.symptoms}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Tratamento:</strong> {selectedRecord.treatment}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Prescrição:</strong> {selectedRecord.prescription}
                                        </Typography>
                                    </Grid>
                                    {selectedRecord.notes && (
                                        <Grid item xs={12}>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Observações:</strong> {selectedRecord.notes}
                                            </Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            </Paper>

                            {selectedRecord.vitalSigns && (
                                <Paper sx={{ p: 3, mb: 3, bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50' }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                                        Sinais Vitais
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6} sm={3}>
                                            <Typography variant="body2">
                                                <strong>Pressão:</strong> {selectedRecord.vitalSigns.bloodPressure}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Typography variant="body2">
                                                <strong>Freq. Cardíaca:</strong> {selectedRecord.vitalSigns.heartRate}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Typography variant="body2">
                                                <strong>Temperatura:</strong> {selectedRecord.vitalSigns.temperature}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Typography variant="body2">
                                                <strong>Peso:</strong> {selectedRecord.vitalSigns.weight}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            )}

                            {selectedRecord.exams && selectedRecord.exams.length > 0 && (
                                <Paper sx={{ p: 3, bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50' }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                                        Exames Solicitados
                                    </Typography>
                                    <List>
                                        {selectedRecord.exams.map((exam, index) => (
                                            <ListItem key={index} sx={{ px: 0 }}>
                                                <ListItemAvatar>
                                                    <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 32, height: 32 }}>
                                                        <DescriptionIcon fontSize="small" />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={exam} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Paper>
                            )}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Fechar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MedicalRecordPage; 