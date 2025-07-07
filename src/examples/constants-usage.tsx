// ===== EXEMPLO DE USO DAS CONSTANTES CENTRALIZADAS =====

import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Chip } from '@mui/material';

// Importar tipos centralizados
import { Consultation, Patient, MedicalRecord } from '../types';

// Importar dados mockados centralizados
import {
  MOCK_CONSULTATIONS_MEDICO,
  MOCK_PATIENTS,
  MOCK_MEDICAL_RECORDS,
} from '../constants';

// Importar funções utilitárias centralizadas
import {
  getStatusColor,
  getStatusLabel,
  getStatusIcon,
  formatDate,
  formatDateTime,
  calculateAge,
} from '../constants';

// Importar constantes de configuração
import { ROUTES, MESSAGES, VALIDATION_RULES } from '../constants';

// ===== EXEMPLO DE COMPONENTE USANDO CONSTANTES =====

const ExampleComponent: React.FC = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);

  useEffect(() => {
    // Usar dados mockados centralizados
    setConsultations(MOCK_CONSULTATIONS_MEDICO);
    setPatients(MOCK_PATIENTS);
    setMedicalRecords(MOCK_MEDICAL_RECORDS);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Exemplo de Uso das Constantes
      </Typography>

      {/* Exemplo de uso das funções utilitárias */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Funções Utilitárias
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label={getStatusLabel('scheduled')}
              color={getStatusColor('scheduled') as any}
              icon={<span>{getStatusIcon('scheduled')}</span>}
            />
            <Chip
              label={getStatusLabel('completed')}
              color={getStatusColor('completed') as any}
              icon={<span>{getStatusIcon('completed')}</span>}
            />
            <Chip
              label={getStatusLabel('cancelled')}
              color={getStatusColor('cancelled') as any}
              icon={<span>{getStatusIcon('cancelled')}</span>}
            />
          </Box>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Data formatada: {formatDate('2024-01-15')}
          </Typography>
          <Typography variant="body2">
            Data e hora formatada: {formatDateTime('2024-01-15', '09:00')}
          </Typography>
          <Typography variant="body2">
            Idade calculada: {calculateAge('1985-03-15')} anos
          </Typography>
        </CardContent>
      </Card>

      {/* Exemplo de uso das constantes de configuração */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Constantes de Configuração
          </Typography>

          <Typography variant="body2">
            Rota do Dashboard: {ROUTES.ADMIN.DASHBOARD}
          </Typography>
          <Typography variant="body2">
            Mensagem de sucesso: {MESSAGES.SUCCESS.LOGIN}
          </Typography>
          <Typography variant="body2">
            Regra de validação de email: {VALIDATION_RULES.EMAIL.required}
          </Typography>
        </CardContent>
      </Card>

      {/* Exemplo de uso dos dados mockados */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Dados Mockados
          </Typography>

          <Typography variant="body2">
            Total de consultas: {consultations.length}
          </Typography>
          <Typography variant="body2">
            Total de pacientes: {patients.length}
          </Typography>
          <Typography variant="body2">
            Total de históricos: {medicalRecords.length}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ExampleComponent;

// ===== EXEMPLO DE COMO SUBSTITUIR DADOS MOCKADOS EM COMPONENTES EXISTENTES =====

/*
ANTES (dados mockados inline):
```tsx
useEffect(() => {
  setTimeout(() => {
    const mockConsultations = [
      {
        _id: '1',
        patientName: 'Maria Silva',
        // ... mais dados
      },
      // ... mais consultas
    ];
    setConsultations(mockConsultations);
  }, 1000);
}, []);
```

DEPOIS (usando constantes centralizadas):
```tsx
import { MOCK_CONSULTATIONS_MEDICO } from '../constants';

useEffect(() => {
  setTimeout(() => {
    setConsultations(MOCK_CONSULTATIONS_MEDICO);
  }, 1000);
}, []);
```

ANTES (funções utilitárias inline):
```tsx
const getStatusColor = (status: string) => {
  switch (status) {
    case 'scheduled': return 'primary';
    case 'completed': return 'success';
    // ... mais casos
  }
};
```

DEPOIS (usando funções centralizadas):
```tsx
import { getStatusColor } from '../constants';

// Usar diretamente: getStatusColor(status)
```

ANTES (strings hardcoded):
```tsx
const routes = {
  dashboard: '/admin',
  users: '/admin/users',
  // ... mais rotas
};
```

DEPOIS (usando constantes centralizadas):
```tsx
import { ROUTES } from '../constants';

// Usar: ROUTES.ADMIN.DASHBOARD, ROUTES.ADMIN.USERS, etc.
```
*/
