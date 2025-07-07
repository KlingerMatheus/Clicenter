import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useFormValidation } from '../../hooks/useFormValidation';
import { createUserSchema, CreateUserFormData } from '../../lib/validations';
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
  IconButton,
  Chip,
  Alert,
  Snackbar,
  Card,
  CardContent,
  CardActions,
  useTheme,
  useMediaQuery,
  Tooltip,
  Divider,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  VisibilityOff as ViewOffIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import ContentLoading from '../../components/ContentLoading';
import LoadingButton from '../../components/LoadingButton';
import { useApi } from '../../hooks/useApi';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'medico' | 'paciente';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const UserManagement: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { token } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const {
    data: formData,
    errors,
    setData,
    setField,
    validate,
    reset,
  } = useFormValidation<CreateUserFormData>(createUserSchema, {
    name: '',
    email: '',
    role: 'paciente',
    password: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const { apiBaseUrl } = useApi();

  const showSnackbar = useCallback((message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      showSnackbar('Erro ao carregar usuários', 'error');
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl, token, showSnackbar]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleOpenDialog = (user?: User) => {
    if (user) {
      // Verificar se o usuário é admin
      if (user.role === 'admin') {
        showSnackbar(
          'Não é permitido editar usuários administradores',
          'error'
        );
        return;
      }

      setEditingUser(user);
      setData({
        name: user.name,
        email: user.email,
        role: user.role,
        password: '',
      });
    } else {
      setEditingUser(null);
      reset({
        name: '',
        email: '',
        role: 'paciente',
        password: '',
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingUser(null);
    reset({
      name: '',
      email: '',
      role: 'paciente',
      password: '',
    });
  };

  const handleSubmit = async () => {
    if (!validate()) {
      showSnackbar('Por favor, corrija os erros no formulário', 'error');
      return;
    }

    setSubmitting(true);

    try {
      const url = editingUser
        ? `${apiBaseUrl}/users/${editingUser._id}`
        : `${apiBaseUrl}/users`;

      const method = editingUser ? 'PUT' : 'POST';

      const payload = { ...formData };
      if (editingUser && !formData.password) {
        delete (payload as Partial<CreateUserFormData>).password;
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        showSnackbar(
          editingUser
            ? 'Usuário atualizado com sucesso!'
            : 'Usuário criado com sucesso!',
          'success'
        );
        handleCloseDialog();
        fetchUsers();
      } else {
        showSnackbar(data.message || 'Erro na operação', 'error');
      }
    } catch (error) {
      console.error('Erro na operação:', error);
      showSnackbar('Erro na operação', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (userId: string) => {
    // Verificar se o usuário é admin
    const user = users.find((u) => u._id === userId);
    if (user && user.role === 'admin') {
      showSnackbar('Não é permitido excluir usuários administradores', 'error');
      return;
    }

    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      const response = await fetch(`${apiBaseUrl}/users/${userToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        showSnackbar('Usuário excluído com sucesso!', 'success');
        fetchUsers();
      } else {
        showSnackbar(data.message || 'Erro ao excluir usuário', 'error');
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      showSnackbar('Erro ao excluir usuário', 'error');
    } finally {
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleToggleStatus = async (userId: string) => {
    // Verificar se o usuário é admin
    const user = users.find((u) => u._id === userId);
    if (user && user.role === 'admin') {
      showSnackbar(
        'Não é permitido alterar o status de usuários administradores',
        'error'
      );
      return;
    }

    try {
      const response = await fetch(
        `${apiBaseUrl}/users/${userId}/toggle-status`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        showSnackbar('Status do usuário alterado com sucesso!', 'success');
        fetchUsers();
      } else {
        showSnackbar(data.message || 'Erro ao alterar status', 'error');
      }
    } catch (error) {
      showSnackbar(`Erro ao alterar status: ${error}`, 'error');
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'medico':
        return 'warning';
      case 'paciente':
        return 'info';
      default:
        return 'default';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'medico':
        return 'Médico';
      case 'paciente':
        return 'Paciente';
      default:
        return role;
    }
  };

  const renderEmptyState = () => (
    <Paper
      sx={{
        p: 4,
        textAlign: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        borderRadius: 2,
      }}
    >
      <PersonIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Nenhum usuário encontrado
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Comece criando o primeiro usuário do sistema
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => handleOpenDialog()}
      >
        Criar Primeiro Usuário
      </Button>
    </Paper>
  );

  const renderMobileCard = (user: User) => (
    <Card
      key={user._id}
      sx={{
        mb: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        borderRadius: 2,
      }}
    >
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
              {user.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon
                sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }}
              />
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CalendarIcon
                sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }}
              />
              <Typography variant="body2" color="text.secondary">
                Criado em {new Date(user.createdAt).toLocaleDateString('pt-BR')}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 1,
            }}
          >
            <Chip
              label={getRoleLabel(user.role)}
              color={getRoleColor(user.role) as 'primary' | 'secondary' | 'default'}
              size="small"
            />
            <Chip
              label={user.isActive ? 'Ativo' : 'Inativo'}
              color={user.isActive ? 'success' : 'default'}
              size="small"
            />
          </Box>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'space-around', p: 1 }}>
        <Tooltip title={user.isActive ? 'Desativar' : 'Ativar'}>
          <IconButton
            size="small"
            onClick={() => handleToggleStatus(user._id)}
            color={user.isActive ? 'warning' : 'success'}
          >
            {user.isActive ? <ViewOffIcon /> : <ViewIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar">
          <IconButton
            size="small"
            onClick={() => handleOpenDialog(user)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Excluir">
          <IconButton
            size="small"
            onClick={() => handleDelete(user._id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );

  const renderDesktopTable = () => (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        borderRadius: 2,
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>Nome</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>
              Email
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>Tipo</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>
              Status
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>
              Criado em
            </TableCell>
            <TableCell align="center" sx={{ color: 'white', fontWeight: 600 }}>
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id} hover>
              <TableCell sx={{ fontWeight: 500 }}>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Chip
                  label={getRoleLabel(user.role)}
                  color={getRoleColor(user.role) as 'primary' | 'secondary' | 'default'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={user.isActive ? 'Ativo' : 'Inativo'}
                  color={user.isActive ? 'success' : 'default'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString('pt-BR')}
              </TableCell>
              <TableCell align="center">
                <Box
                  sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}
                >
                  <Tooltip title={user.isActive ? 'Desativar' : 'Ativar'}>
                    <IconButton
                      size="small"
                      onClick={() => handleToggleStatus(user._id)}
                      color={user.isActive ? 'warning' : 'success'}
                    >
                      {user.isActive ? <ViewOffIcon /> : <ViewIcon />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(user)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(user._id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 600 }}
        >
          <strong>Nota de Segurança:</strong> Usuários administradores não são
          exibidos nesta lista e não podem ser criados, editados ou excluídos
          através desta interface por questões de segurança.
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            boxShadow: 2,
          }}
        >
          Novo Usuário
        </Button>
      </Box>

      {users.length === 0 ? (
        renderEmptyState()
      ) : (
        <>
          {isMobile ? (
            <Stack spacing={2}>{users.map(renderMobileCard)}</Stack>
          ) : (
            renderDesktopTable()
          )}
        </>
      )}

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Nome"
              value={formData.name}
              onChange={(e) => setField('name', e.target.value)}
              margin="normal"
              required
              error={!!errors.name}
              helperText={errors.name}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setField('email', e.target.value)}
              margin="normal"
              required
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 2 }}
            />
            <FormControl
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
              error={!!errors.role}
            >
              <InputLabel>Tipo de Usuário</InputLabel>
              <Select
                value={formData.role}
                onChange={(e) => setField('role', e.target.value)}
                label="Tipo de Usuário"
              >
                <MenuItem value="medico">Médico</MenuItem>
                <MenuItem value="paciente">Paciente</MenuItem>
              </Select>
              {errors.role && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ mt: 0.5, ml: 1.5 }}
                >
                  {errors.role}
                </Typography>
              )}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 0.5, ml: 1.5 }}
              >
                Nota: Usuários administradores não podem ser criados através
                desta interface
              </Typography>
            </FormControl>
            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={formData.password || ''}
              onChange={(e) => setField('password', e.target.value)}
              margin="normal"
              required={!editingUser}
              error={!!errors.password}
              helperText={
                errors.password ||
                (editingUser ? 'Preencha para alterar a senha' : 'Obrigatório')
              }
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            disabled={submitting}
          >
            Cancelar
          </Button>
          <LoadingButton
            onClick={handleSubmit}
            variant="contained"
            loading={submitting}
          >
            {editingUser ? 'Atualizar' : 'Criar'}
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* Dialog de Confirmação de Exclusão */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;
