import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { People, PersonAdd, PersonOff } from '@mui/icons-material';

const Dashboard: React.FC = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <People sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h6">Total de Usuários</Typography>
                        <Typography variant="h4" color="primary">
                            0
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <PersonAdd sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                        <Typography variant="h6">Usuários Ativos</Typography>
                        <Typography variant="h4" color="success.main">
                            0
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <PersonOff sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
                        <Typography variant="h6">Usuários Inativos</Typography>
                        <Typography variant="h4" color="error.main">
                            0
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Bem-vindo ao Painel Administrativo
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Use o menu lateral para gerenciar usuários e acessar outras funcionalidades.
                </Typography>
            </Paper>
        </Box>
    );
};

export default Dashboard; 