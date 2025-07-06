# CliCenter - Sistema de Gerenciamento Clínico

Sistema completo de gerenciamento clínico com autenticação JWT, interface moderna e responsiva.

## Tecnologias

### Frontend

- Next.js 15 (App Router)
- React 18
- Material-UI 6
- TypeScript
- Framer Motion

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT para autenticação
- bcryptjs para hash de senhas

## Como usar

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd clicenter
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure o MongoDB**
   - Instale MongoDB localmente ou use MongoDB Atlas
   - Certifique-se que o MongoDB está rodando

4. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` na pasta `server/`:

   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/clicenter
   JWT_SECRET=sua-chave-secreta-muito-segura-aqui
   NODE_ENV=development
   ```

5. **Crie os usuários de teste**

   ```bash
   npm run server:create-test-users
   ```

6. **Inicie o servidor**

   ```bash
   npm run server:dev
   ```

7. **Em outro terminal, inicie o frontend**

   ```bash
   npm run app:dev
   ```

8. **Acesse a aplicação**
   - URL: http://localhost:3000
   - Clique em "Ver credenciais de teste" para ver todas as opções
   - Credenciais disponíveis:
     - **Admin:** admin@teste.com / admin
     - **Médico:** medico@teste.com / medico
     - **Paciente:** paciente@teste.com / paciente

## Scripts Disponíveis

```bash
# Frontend
npm run app:dev      # Desenvolvimento
npm run app:build    # Build de produção
npm run app:start    # Iniciar produção

# Backend
npm run server:dev           # Desenvolvimento
npm run server:build         # Build de produção
npm run server:start         # Iniciar produção
npm run server:create-test-users  # Criar usuários de teste

# Linting e Formatação
npm run lint:check    # Verificar linting
npm run lint:fix      # Corrigir linting
npm run prettier:check # Verificar formatação
npm run prettier:fix   # Corrigir formatação
```

## Estrutura do Projeto

```
├── src/                    # Frontend (Next.js)
│   ├── app/               # App Router
│   ├── components/        # Componentes React
│   ├── contexts/          # Context API
│   └── pages/             # Páginas da aplicação
├── server/                # Backend (Node.js/Express)
│   ├── src/
│   │   ├── controllers/   # Controladores MVC
│   │   ├── middleware/    # Middlewares
│   │   ├── models/        # Modelos Mongoose
│   │   ├── routes/        # Rotas da API
│   │   ├── services/      # Serviços (Facade)
│   │   └── config/        # Configurações
│   └── examples/          # Exemplos de uso
└── docs/                  # Documentação
```

## Segurança

- ✅ Autenticação JWT
- ✅ Hash de senhas com bcryptjs
- ✅ Middleware de autorização por role
- ✅ Validação de dados
- ✅ Rate limiting
- ✅ Headers de segurança (Helmet)
- ✅ CORS configurado
