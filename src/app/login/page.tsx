'use client';

import React, { useState } from 'react';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Chip,
    Divider,
    useMediaQuery
} from '@mui/material';
import {
    Lock as LockIcon,
    Visibility,
    VisibilityOff,
    Info as InfoIcon,
    Close as CloseIcon,
    AdminPanelSettings as AdminIcon,
    LocalHospital as MedicoIcon,
    Person as PacienteIcon,
    HealthAndSafety as HealthIcon,
    MedicalServices as MedicalIcon,
    Login as LoginIcon,
    ContentCopy as CopyIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ClientOnly from '../../components/ClientOnly';
import { useFormValidation } from '../../hooks/useFormValidation';
import { loginSchema, LoginFormData } from '../../lib/validations';
import LoadingButton from '../../components/LoadingButton';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showCredentials, setShowCredentials] = useState(false);

    const { login } = useAuth();
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const {
        data: formData,
        errors,
        setField,
        validate,
        clearErrors,
        reset
    } = useFormValidation<LoginFormData>(loginSchema, {
        email: '',
        password: ''
    });

    const testCredentials = [
        {
            type: 'admin',
            label: 'Administrador',
            icon: <AdminIcon />,
            email: 'admin@teste.com',
            password: 'admin',
            color: 'error' as const
        },
        {
            type: 'medico',
            label: 'Médico',
            icon: <MedicoIcon />,
            email: 'medico@teste.com',
            password: 'medico',
            color: 'warning' as const
        },
        {
            type: 'paciente',
            label: 'Paciente',
            icon: <PacienteIcon />,
            email: 'paciente@teste.com',
            password: 'paciente',
            color: 'info' as const
        }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        clearErrors();

        if (!validate()) {
            return;
        }

        setIsLoading(true);

        try {
            const success = await login(formData.email, formData.password);

            if (success) {
                router.push('/dashboard');
            } else {
                setError('Email ou senha inválidos');
            }
        } catch (error) {
            console.error('Erro no handleSubmit:', error);
            setError('Erro ao fazer login. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleShowCredentials = () => {
        setShowCredentials(true);
    };

    const handleCloseCredentials = () => {
        setShowCredentials(false);
    };

    const handleCopyCredentials = (email: string, password: string) => {
        navigator.clipboard.writeText(`Email: ${email}\nSenha: ${password}`);
    };

    const handleLoginAs = async (credential: typeof testCredentials[0]) => {
        setField('email', credential.email);
        setField('password', credential.password);
        setShowCredentials(false);

        // Auto-login
        setError('');
        setIsLoading(true);

        try {
            const success = await login(credential.email, credential.password);
            if (success) {
                router.push('/dashboard');
            } else {
                setError('Erro ao fazer login automático');
            }
        } catch (error) {
            console.error('Erro no login automático:', error);
            setError('Erro ao fazer login automático');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ClientOnly
            fallback={
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                    padding: '16px'
                }}>
                    <div style={{ color: 'white', fontSize: '16px' }}>Carregando...</div>
                </div>
            }
        >
            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
            `}</style>

            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    position: 'relative',
                    overflow: 'hidden',
                    p: { xs: 0, md: 2 },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
                        zIndex: 1
                    }
                }}
            >
                {/* Animated background elements */}
                <Box sx={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                    animation: 'float 6s ease-in-out infinite',
                    zIndex: 1
                }} />
                <Box sx={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '15%',
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
                    animation: 'float 8s ease-in-out infinite reverse',
                    zIndex: 1
                }} />

                <Paper
                    elevation={24}
                    sx={{
                        p: { xs: 3, md: 4 },
                        width: '100%',
                        maxWidth: { xs: '100vw', md: 450 },
                        borderRadius: { xs: 0, md: 4 },
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 2,
                        background: theme.palette.mode === 'dark'
                            ? 'rgba(18, 18, 18, 0.95)'
                            : 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        border: { xs: 'none', md: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` },
                        boxShadow: { xs: 'none', md: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }
                    }}
                >
                    <Box sx={{ mb: { xs: 3, md: 4 } }}>
                        {/* Logo/Brand */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: { xs: 2, md: 3 },
                            gap: 1
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: { xs: 50, md: 60 },
                                height: { xs: 50, md: 60 },
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                boxShadow: '0 8px 32px rgba(25, 118, 210, 0.3)',
                                mb: 1
                            }}>
                                <HealthIcon sx={{ fontSize: { xs: 28, md: 32 }, color: 'white' }} />
                            </Box>
                        </Box>

                        <Typography
                            variant="h3"
                            component="h1"
                            gutterBottom
                            sx={{
                                fontWeight: 700,
                                fontSize: { xs: '2rem', md: '3rem' },
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 1
                            }}
                        >
                            CliCenter
                        </Typography>

                        <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.8 }}>
                            Acesse sua conta para continuar
                        </Typography>
                    </Box>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setField('email', e.target.value)}
                            margin="normal"
                            required
                            disabled={isLoading}
                            error={!!errors.email}
                            helperText={errors.email}
                            sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme.palette.primary.main,
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme.palette.primary.main,
                                        borderWidth: 2,
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    '&:-webkit-autofill': {
                                        WebkitBoxShadow: '0 0 0 100px transparent inset',
                                        WebkitTextFillColor: 'inherit',
                                    },
                                    '&:-webkit-autofill:hover': {
                                        WebkitBoxShadow: '0 0 0 100px transparent inset',
                                    },
                                    '&:-webkit-autofill:focus': {
                                        WebkitBoxShadow: '0 0 0 100px transparent inset',
                                    },
                                }
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Senha"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => setField('password', e.target.value)}
                            margin="normal"
                            required
                            disabled={isLoading}
                            error={!!errors.password}
                            helperText={errors.password}
                            InputProps={{
                                endAdornment: (
                                    <Button
                                        onClick={() => setShowPassword(!showPassword)}
                                        sx={{
                                            minWidth: 'auto',
                                            p: 1,
                                            color: 'text.secondary',
                                            '&:hover': {
                                                color: 'primary.main'
                                            }
                                        }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </Button>
                                )
                            }}
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme.palette.primary.main,
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme.palette.primary.main,
                                        borderWidth: 2,
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    '&:-webkit-autofill': {
                                        WebkitBoxShadow: '0 0 0 100px transparent inset',
                                        WebkitTextFillColor: 'inherit',
                                    },
                                    '&:-webkit-autofill:hover': {
                                        WebkitBoxShadow: '0 0 0 100px transparent inset',
                                    },
                                    '&:-webkit-autofill:focus': {
                                        WebkitBoxShadow: '0 0 0 100px transparent inset',
                                    },
                                }
                            }}
                        />

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            loading={isLoading}
                            sx={{
                                py: 2,
                                borderRadius: 2,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                boxShadow: '0 8px 32px rgba(25, 118, 210, 0.3)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 12px 40px rgba(25, 118, 210, 0.4)',
                                },
                                '&:active': {
                                    transform: 'translateY(0)',
                                }
                            }}
                        >
                            Acessar
                        </LoadingButton>
                    </form>

                    <Box sx={{
                        mt: 4,
                        pt: 3,
                        borderTop: `1px solid ${theme.palette.divider}`,
                        textAlign: 'center'
                    }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, opacity: 0.7 }}>
                            Primeira vez usando o sistema?
                        </Typography>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<InfoIcon />}
                            onClick={handleShowCredentials}
                            sx={{
                                color: 'primary.main',
                                borderColor: 'primary.main',
                                textTransform: 'none',
                                fontSize: '0.875rem',
                                borderRadius: 2,
                                px: 3,
                                py: 1,
                                '&:hover': {
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    borderColor: 'primary.main',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
                                }
                            }}
                        >
                            Ver credenciais de teste
                        </Button>
                    </Box>
                </Paper>

                {/* Modal de Credenciais de Teste */}
                <Dialog
                    open={showCredentials}
                    onClose={handleCloseCredentials}
                    maxWidth="sm"
                    fullWidth
                    fullScreen={false}
                    PaperProps={{
                        sx: {
                            borderRadius: { xs: 0, sm: 4 },
                            background: theme.palette.mode === 'dark'
                                ? 'rgba(18, 18, 18, 0.95)'
                                : 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            border: { xs: 'none', sm: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` },
                            boxShadow: { xs: 'none', sm: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
                            width: { xs: '100vw', sm: 'auto' },
                            height: { xs: '100vh', sm: 'auto' },
                            maxWidth: { xs: '100vw', sm: 'sm' },
                            maxHeight: { xs: '100vh', sm: '90vh' },
                            margin: { xs: 0, sm: 'auto' }
                        }
                    }}
                >
                    <DialogTitle sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        pb: { xs: 1, sm: 2 },
                        fontWeight: 600,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: { xs: '1.25rem', sm: '1.5rem' }
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: { xs: 28, sm: 32 },
                                height: { xs: 28, sm: 32 },
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                boxShadow: '0 4px 16px rgba(25, 118, 210, 0.3)'
                            }}>
                                <HealthIcon sx={{ fontSize: { xs: 16, sm: 18 }, color: 'white' }} />
                            </Box>
                            Credenciais de Teste
                        </Box>
                        <IconButton
                            onClick={handleCloseCredentials}
                            size="small"
                            sx={{
                                color: 'text.secondary',
                                '&:hover': {
                                    backgroundColor: 'rgba(0,0,0,0.04)',
                                    color: 'primary.main'
                                }
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent sx={{ pt: { xs: 1, sm: 2 }, pb: { xs: 2, sm: 3 } }}>
                        <Typography variant="body2" color="text.secondary" sx={{
                            mb: { xs: 2, sm: 3 },
                            opacity: 0.8,
                            textAlign: 'center',
                            fontSize: { xs: '0.875rem', sm: '1rem' }
                        }}>
                            Use qualquer uma das credenciais abaixo para testar o sistema:
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
                            {testCredentials.map((credential) => (
                                <Box key={credential.type} sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    alignItems: { xs: 'stretch', sm: 'center' },
                                    gap: { xs: 1.5, sm: 2 },
                                    p: { xs: 1.5, sm: 2 },
                                    border: `1px solid ${theme.palette.divider}`,
                                    borderRadius: 2,
                                    bgcolor: theme.palette.mode === 'dark'
                                        ? 'rgba(255,255,255,0.02)'
                                        : 'rgba(0,0,0,0.02)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: theme.palette.primary.main,
                                        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.1)',
                                        transform: 'translateY(-1px)'
                                    }
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: { xs: 1, sm: 2 },
                                        flex: { xs: 'none', sm: '0 0 auto' }
                                    }}>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: { xs: 40, sm: 48 },
                                            height: { xs: 40, sm: 48 },
                                            borderRadius: 2,
                                            background: `linear-gradient(135deg, ${theme.palette[credential.color].main}, ${theme.palette[credential.color].dark})`,
                                            boxShadow: `0 4px 16px ${theme.palette[credential.color].main}40`,
                                            color: 'white'
                                        }}>
                                            {credential.icon}
                                        </Box>

                                        <Box sx={{
                                            flex: 1,
                                            minWidth: 0,
                                            display: { xs: 'block', sm: 'none' }
                                        }}>
                                            <Typography variant="subtitle1" sx={{
                                                fontWeight: 600,
                                                mb: 0.5,
                                                color: 'text.primary',
                                                fontSize: { xs: '0.9rem', sm: '1rem' }
                                            }}>
                                                {credential.label}
                                            </Typography>
                                            <Typography variant="body2" sx={{
                                                fontFamily: 'monospace',
                                                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                                color: 'text.secondary',
                                                mb: 0.5
                                            }}>
                                                {credential.email}
                                            </Typography>
                                            <Typography variant="body2" sx={{
                                                fontFamily: 'monospace',
                                                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                                color: 'text.secondary'
                                            }}>
                                                Senha: {credential.password}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{
                                        flex: 1,
                                        minWidth: 0,
                                        display: { xs: 'none', sm: 'block' }
                                    }}>
                                        <Typography variant="subtitle1" sx={{
                                            fontWeight: 600,
                                            mb: 0.5,
                                            color: 'text.primary',
                                            fontSize: { xs: '0.9rem', sm: '1rem' }
                                        }}>
                                            {credential.label}
                                        </Typography>
                                        <Typography variant="body2" sx={{
                                            fontFamily: 'monospace',
                                            fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                            color: 'text.secondary',
                                            mb: 0.5
                                        }}>
                                            {credential.email}
                                        </Typography>
                                        <Typography variant="body2" sx={{
                                            fontFamily: 'monospace',
                                            fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                            color: 'text.secondary'
                                        }}>
                                            Senha: {credential.password}
                                        </Typography>
                                    </Box>

                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'row', sm: 'column' },
                                        gap: 1,
                                        justifyContent: { xs: 'space-between', sm: 'flex-start' },
                                        width: { xs: '100%', sm: 'auto' }
                                    }}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => handleLoginAs(credential)}
                                            sx={{
                                                minWidth: 'auto',
                                                px: 2.5,
                                                py: 1,
                                                fontSize: '0.8rem',
                                                fontWeight: 600,
                                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                                boxShadow: '0 4px 16px rgba(25, 118, 210, 0.3)',
                                                transition: 'all 0.3s ease',
                                                flex: { xs: 1, sm: 'none' },
                                                '&:hover': {
                                                    transform: 'translateY(-1px)',
                                                    boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                                                }
                                            }}
                                        >
                                            Logar
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleCopyCredentials(credential.email, credential.password)}
                                            sx={{
                                                minWidth: 'auto',
                                                px: 2.5,
                                                py: 1,
                                                fontSize: '0.8rem',
                                                borderRadius: 1.5,
                                                borderColor: 'primary.main',
                                                color: 'primary.main',
                                                flex: { xs: 1, sm: 'none' },
                                                '&:hover': {
                                                    backgroundColor: 'primary.main',
                                                    color: 'white',
                                                    borderColor: 'primary.main',
                                                    transform: 'translateY(-1px)',
                                                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
                                                }
                                            }}
                                        >
                                            Copiar
                                        </Button>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </DialogContent>

                    <DialogActions sx={{ p: { xs: 2, sm: 3 }, pt: 1 }}>
                        <Button
                            onClick={handleCloseCredentials}
                            variant="outlined"
                            sx={{
                                borderRadius: 2,
                                px: { xs: 2, sm: 3 },
                                py: { xs: 0.75, sm: 1 },
                                fontWeight: 600,
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                                '&:hover': {
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    borderColor: 'primary.main',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
                                }
                            }}
                        >
                            Fechar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ClientOnly>
    );
} 