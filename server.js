// Carrega variáveis de ambiente do arquivo .env
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const planRoutes = require('./routes/plan');
const userRoutes = require('./routes/user');

// Cria uma instância do aplicativo Express
const app = express();

// Configura o middleware para permitir requisições de diferentes origens
app.use(cors());

// Configura o middleware para analisar o corpo das requisições como JSON
app.use(express.json());

// Conecta ao banco de dados
connectDB();

// Define as rotas da API para autenticação, planos e usuários
app.use('/api/auth', authRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/user', userRoutes);

// Define a porta para o servidor, usando a variável de ambiente PORT ou a porta 5000 como padrão
const PORT = process.env.PORT || 5000;

// Inicia o servidor e exibe uma mensagem no console quando estiver rodando
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`);
});

module.exports = app; // Exporte o app para o teste
