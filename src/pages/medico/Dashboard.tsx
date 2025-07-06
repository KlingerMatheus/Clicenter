'use client';

import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { Event, People, MedicalServices, Schedule } from '@mui/icons-material';

const DoctorDashboard: React.FC = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                Dashboard do Médico
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <Event sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h6">Consultas Hoje</Typography>
                        <Typography variant="h4" color="primary">
                            5
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <People sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                        <Typography variant="h6">Pacientes Ativos</Typography>
                        <Typography variant="h4" color="success.main">
                            23
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <MedicalServices sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
                        <Typography variant="h6">Históricos</Typography>
                        <Typography variant="h4" color="warning.main">
                            156
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <Schedule sx={{ fontSize: 48, color: 'info.main', mb: 2 }} />
                        <Typography variant="h6">Próximas Consultas</Typography>
                        <Typography variant="h4" color="info.main">
                            12
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Bem-vindo ao Sistema Médico
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Use o menu lateral para gerenciar suas consultas, visualizar pacientes e acessar outras funcionalidades.
                </Typography>
            </Paper>
        </Box>
    );
};

export default DoctorDashboard; 