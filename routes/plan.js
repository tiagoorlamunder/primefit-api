const express = require('express');
const { getPlans, subscribe, changePlan, associatePlan } = require('../controllers/plan');
const Plan = require('../models/plan');
const authMiddleware = require('../middleware/auth');
const checkAdmin = require('../middleware/checkAdmin');
const router = express.Router();

// Define a rota para obter todos os planos, utilizando a função 'getPlans' do controlador de planos
router.get('/', getPlans);

// Aplica o middleware de autenticação para as rotas abaixo
router.use(authMiddleware);

// Define a rota para assinar um plano, utilizando a função 'subscribe' do controlador de planos
router.post('/subscribe', subscribe);

// Define a rota para alterar o plano do usuário, utilizando a função 'changePlan' do controlador de planos
router.post('/change-plan', changePlan);

// Define a rota para associar um plano ao usuário, utilizando a função 'associatePlan' do controlador de planos
router.post('/associate', associatePlan);

// Aplica o middleware de verificação de administrador para as rotas abaixo
router.use(checkAdmin);

// Define a rota para criar um novo plano
router.post('/', async (req, res) => {
    const plan = new Plan({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    try {
        // Salva o novo plano no banco de dados
        const newPlan = await plan.save();
        // Retorna o plano criado com o status HTTP 201
        res.status(201).json(newPlan);
    } catch (err) {
        // Retorna erro caso ocorra algum problema durante a criação do plano
        res.status(400).json({ message: err.message });
    }
});

// Define a rota para atualizar informações de um plano existente
router.patch('/:id', async (req, res) => {
    try {
        // Busca o plano pelo ID fornecido
        const plan = await Plan.findById(req.params.id);
        if (plan == null) {
            // Retorna erro se o plano não for encontrado
            return res.status(404).json({ message: 'Plano não encontrado' });
        }

        // Atualiza os campos do plano se os valores forem fornecidos na requisição
        if (req.body.name != null) {
            plan.name = req.body.name;
        }
        if (req.body.description != null) {
            plan.description = req.body.description;
        }
        if (req.body.price != null) {
            plan.price = req.body.price;
        }
        if (req.body.features != null) {
            plan.features = req.body.features;
        }

        // Salva as alterações no banco de dados
        const updatedPlan = await plan.save();
        // Retorna o plano atualizado
        res.json(updatedPlan);
    } catch (err) {
        // Retorna erro caso ocorra algum problema durante a atualização do plano
        res.status(400).json({ message: err.message });
    }
});

// Define a rota para excluir um plano existente
router.delete('/:id', async (req, res) => {
    try {
        // Busca o plano pelo ID fornecido
        const plan = await Plan.findById(req.params.id);
        if (plan == null) {
            // Retorna erro se o plano não for encontrado
            return res.status(404).json({ message: 'Plano não encontrado' });
        }

        // Remove o plano do banco de dados
        await Plan.findByIdAndDelete(req.params.id);
        // Retorna mensagem de sucesso após a exclusão
        res.json({ message: 'Plano excluído' });
    } catch (err) {
        // Retorna erro caso ocorra algum problema durante a exclusão do plano
        res.status(500).json({ message: err.message });
    }
});

// Exporta o roteador para ser usado em outras partes da aplicação
module.exports = router;
