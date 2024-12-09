
# PrimeFit API

Este repositório contém a API do projeto **PrimeFit**, desenvolvida para gerenciar os dados de usuários e planos de uma plataforma de academias.

## Estrutura do Projeto

```
📂 primefit-api
├── 📂 config
│   └── db.js (Configuração do banco de dados)
├── 📂 controllers
│   ├── authController.js
│   ├── userController.js
│   └── planController.js
├── 📂 models
│   ├── User.js
│   └── Plan.js
├── 📂 routes
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── planRoutes.js
├── server.js (Arquivo principal da aplicação)
└── README.md
```

## Funcionalidades

- **Autenticação**:
  - Registro de novos usuários.
  - Login com geração de tokens JWT.
- **Gestão de Usuários**:
  - Consulta de dados do usuário.
  - Atualização de informações (restrita).
- **Gestão de Planos**:
  - Consulta de planos disponíveis.
  - Atualização e remoção (restrito a administradores).

## Tecnologias Utilizadas

- **Node.js** e **Express**: Para criação do servidor.
- **MongoDB**: Banco de dados não relacional.
- **Mongoose**: Modelagem de dados.
- **JWT**: Autenticação segura.

## Configuração e Uso

1. Clone o repositório:
   ```bash
   git clone https://github.com/tiagoorlamunder/primefit-api.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o arquivo `.env` com as variáveis de ambiente:
   ```env
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```
5. Acesse a API em `http://localhost:5000`.

## Testes e Integração Contínua

- Configurado com SonarQube para análise de qualidade do código.
- CI/CD com deploy automatizado.

---

**Desenvolvido por Tiago Luiz Orlamünder**
