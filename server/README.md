# Backend - CliCenter

Backend da aplicação CliCenter desenvolvido com Node.js, TypeScript, Express e MongoDB.

## Estrutura do Projeto

```
server/
├── src/
│   ├── config/
│   │   └── database.ts          # Configuração do MongoDB
│   ├── controllers/
│   │   └── UserController.ts    # Controller de usuários (MVC)
│   ├── models/
│   │   └── User.ts              # Modelo de usuário
│   ├── routes/
│   │   └── userRoutes.ts        # Rotas da API
│   ├── services/
│   │   └── UserService.ts       # Serviço de usuários (Facade)
│   ├── middleware/
│   │   └── validation.ts        # Middleware de validação
│   └── index.ts                 # Arquivo principal do servidor
├── tsconfig.json                # Configuração do TypeScript
└── .env                         # Variáveis de ambiente
```

## Padrões Utilizados

- **MVC (Model-View-Controller)**: Separação clara entre Model, Controller e View
- **Facade**: UserService atua como uma fachada para operações de usuário
- **Repository Pattern**: Abstração do acesso aos dados através do Mongoose

## Funcionalidades

### Gerenciamento de Usuários (Admin)

- ✅ Criar usuário
- ✅ Listar todos os usuários
- ✅ Buscar usuário por ID
- ✅ Atualizar usuário
- ✅ Deletar usuário
- ✅ Ativar/Desativar usuário

## Configuração

1. **Instalar dependências:**

   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   Crie um arquivo `.env` na pasta `server/` com:

   ```
   PORT=3001
   MONGO_DB_URL=mongodb://localhost:27017/clicenter
   NODE_ENV=development
   ```

3. **Executar o servidor:**

   ```bash
   # Desenvolvimento
   npm run server:dev

   # Produção
   npm run server:build
   npm run server:start
   ```

## API Endpoints

### Usuários

| Método | Endpoint                       | Descrição                |
| ------ | ------------------------------ | ------------------------ |
| POST   | `/api/users`                   | Criar novo usuário       |
| GET    | `/api/users`                   | Listar todos os usuários |
| GET    | `/api/users/:id`               | Buscar usuário por ID    |
| PUT    | `/api/users/:id`               | Atualizar usuário        |
| DELETE | `/api/users/:id`               | Deletar usuário          |
| PATCH  | `/api/users/:id/toggle-status` | Ativar/Desativar usuário |

### Health Check

| Método | Endpoint  | Descrição                    |
| ------ | --------- | ---------------------------- |
| GET    | `/health` | Verificar status do servidor |

## Modelo de Usuário

```typescript
interface IUser {
  name: string; // Nome do usuário (obrigatório)
  email: string; // Email único (obrigatório)
  role: 'admin' | 'user'; // Papel do usuário
  isActive: boolean; // Status ativo/inativo
  createdAt: Date; // Data de criação
  updatedAt: Date; // Data de atualização
}
```

## Validações

- Nome: obrigatório, máximo 100 caracteres
- Email: obrigatório, formato válido, único
- Role: deve ser 'admin' ou 'user'
- ID: obrigatório para operações específicas

## Segurança

- Helmet para headers de segurança
- CORS configurado
- Rate limiting (100 requests por 15 minutos)
- Validação de entrada
- Tratamento de erros centralizado

## Respostas da API

Todas as respostas seguem o padrão:

```json
{
  "success": true/false,
  "data": {...} | "message": "..."
}
```
