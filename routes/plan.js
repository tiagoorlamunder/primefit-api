const express = require('express');
const { getPlans, subscribe, changePlan, associatePlan } = require('../controllers/plan');

// Cria uma instância do roteador do Express
const router = express.Router();

// Define a rota para obter todos os planos, chamando a função 'getPlans' do controlador de planos
router.get('/', getPlans);

// Define a rota para assinar um plano, chamando a função 'subscribe' do controlador de planos
router.post('/subscribe', subscribe);

// Define a rota para alterar o plano do usuário, chamando a função 'changePlan' do controlador de planos
router.post('/change-plan', changePlan);

// Define a rota para associar um plano ao usuário, chamando a função 'associatePlan' do controlador de planos
router.post('/associate', associatePlan);

// Exporta o roteador para ser usado em outras partes da aplicação
module.exports = router;
