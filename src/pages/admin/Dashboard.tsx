import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { People, PersonAdd, PersonOff } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import ContentLoading from '../../components/ContentLoading';

const Dashboard: React.FC = () => {
    const { token } = useAuth();
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        inactive: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();

                if (data.success) {
                    const users = data.data;
                    const total = users.length;
                    const active = users.filter((user: any) => user.isActive).length;
                    const inactive = total - active;

                    setStats({ total, active, inactive });
                }
            } catch (error) {
                console.error('Erro ao buscar estatísticas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [token]);

    if (loading) {
        return <ContentLoading />;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{
                        p: 3,
                        textAlign: 'center',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                        borderRadius: 2
                    }}>
                        <People sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h6">Total de Usuários</Typography>
                        <Typography variant="h4" color="primary">
                            {stats.total}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{
                        p: 3,
                        textAlign: 'center',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                        borderRadius: 2
                    }}>
                        <PersonAdd sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                        <Typography variant="h6">Usuários Ativos</Typography>
                        <Typography variant="h4" color="success.main">
                            {stats.active}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{
                        p: 3,
                        textAlign: 'center',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                        borderRadius: 2
                    }}>
                        <PersonOff sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
                        <Typography variant="h6">Usuários Inativos</Typography>
                        <Typography variant="h4" color="error.main">
                            {stats.inactive}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Paper sx={{
                p: 3,
                mt: 3,
                boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                borderRadius: 2
            }}>
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