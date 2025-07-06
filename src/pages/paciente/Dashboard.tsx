'use client';

import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { Event, MedicalServices, Schedule, Person } from '@mui/icons-material';

const PatientDashboard: React.FC = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                Dashboard do Paciente
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <Event sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h6">Consultas Realizadas</Typography>
                        <Typography variant="h4" color="primary">
                            8
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <Schedule sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                        <Typography variant="h6">Próxima Consulta</Typography>
                        <Typography variant="h4" color="success.main">
                            1
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <MedicalServices sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
                        <Typography variant="h6">Históricos</Typography>
                        <Typography variant="h4" color="warning.main">
                            8
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <Person sx={{ fontSize: 48, color: 'info.main', mb: 2 }} />
                        <Typography variant="h6">Médicos</Typography>
                        <Typography variant="h4" color="info.main">
                            3
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Bem-vindo ao Sistema de Pacientes
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Use o menu lateral para visualizar suas consultas, histórico médico e acessar outras funcionalidades.
                </Typography>
            </Paper>
        </Box>
    );
};

export default PatientDashboard; 