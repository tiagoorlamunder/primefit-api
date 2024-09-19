const express = require('express');
const { getUserInfo } = require('../controllers/user');

// Cria uma instância do roteador do Express
const router = express.Router();

// Define a rota para obter informações do usuário, chamando a função 'getUserInfo' do controlador de usuário
router.get('/info', getUserInfo);

// Exporta o roteador para ser usado em outras partes da aplicação
module.exports = router;
