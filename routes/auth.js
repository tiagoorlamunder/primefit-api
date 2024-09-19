const express = require('express');
const { register, login } = require('../controllers/auth');

// Cria uma instância do roteador do Express
const router = express.Router();

// Define a rota para o registro de novos usuários, chamando a função 'register' do controlador de autenticação
router.post('/register', register);

// Define a rota para o login de usuários, chamando a função 'login' do controlador de autenticação
router.post('/login', login);

// Exporta o roteador para ser usado em outras partes da aplicação
module.exports = router;
