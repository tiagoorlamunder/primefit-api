const express = require('express');
const { 
    getUserInfo, 
    getAllUsers, 
    createUser, 
    updateUser, 
    deleteUser 
} = require('../controllers/user');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Aplica o middleware de autenticação para todas as rotas abaixo
router.use(authMiddleware);

// Define a rota para obter todos os usuários, chamando a função 'getAllUsers' do controlador de usuário
router.get('/', getAllUsers);

// Define a rota para obter informações de um usuário específico, chamando a função 'getUserInfo' do controlador de usuário
router.get('/info', getUserInfo);

// Define a rota para criar um novo usuário, chamando a função 'createUser' do controlador de usuário
router.post('/', createUser);

// Define a rota para atualizar um usuário, chamando a função 'updateUser' do controlador de usuário
router.put('/:id', updateUser);

// Define a rota para deletar um usuário, chamando a função 'deleteUser' do controlador de usuário
router.delete('/:id', deleteUser);

// Exporta o roteador para ser usado em outras partes da aplicação
module.exports = router;
