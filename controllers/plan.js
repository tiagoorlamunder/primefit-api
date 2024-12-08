const Plan = require('../models/plan');
const User = require('../models/user');

// Função para obter todos os planos
const getPlans = async (req, res) => {
    try {
        // Busca todos os planos no banco de dados
        const plans = await Plan.find();
        // Retorna a lista de planos como resposta
        res.json(plans);
    } catch (error) {
        // Responde com erro em caso de falha
        res.status(500).json({ message: 'Erro ao obter planos.' });
    }
};

// Função para assinar um plano
const subscribe = async (req, res) => {
    const { userId, planId } = req.body;
    try {
        // Busca o usuário pelo ID
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

        // Busca o plano pelo ID
        const plan = await Plan.findById(planId);
        if (!plan) return res.status(404).json({ message: 'Plano não encontrado.' });

        // Associa o plano ao usuário
        user.plan = planId;
        await user.save();
        // Responde com sucesso
        res.json({ message: 'Assinatura realizada com sucesso!' });
    } catch (error) {
        // Responde com erro em caso de falha
        res.status(500).json({ message: 'Erro ao realizar assinatura.' });
    }
};

// Função para alterar o plano do usuário
const changePlan = async (req, res) => {
    const { userId, newPlanId } = req.body;
    try {
        // Busca o usuário pelo ID
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

        // Busca o novo plano pelo ID
        const plan = await Plan.findById(newPlanId);
        if (!plan) return res.status(404).json({ message: 'Novo plano não encontrado.' });

        // Atualiza o plano do usuário
        user.plan = newPlanId;
        await user.save();
        // Responde com sucesso
        res.json({ message: 'Plano alterado com sucesso!' });
    } catch (error) {
        // Responde com erro em caso de falha
        res.status(500).json({ message: 'Erro ao alterar plano.' });
    }
};

// Função para associar um plano ao usuário (similar a 'subscribe')
const associatePlan = async (req, res) => {
    const { userId, planId } = req.body;
    try {
        // Busca o usuário pelo ID
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

        // Busca o plano pelo ID
        const plan = await Plan.findById(planId);
        if (!plan) return res.status(404).json({ message: 'Plano não encontrado.' });

        // Associa o plano ao usuário
        user.plan = planId;
        await user.save();
        // Responde com sucesso
        res.json({ message: 'Plano associado com sucesso!' });
    } catch (error) {
        // Responde com erro em caso de falha
        res.status(500).json({ message: 'Erro ao associar plano.' });
    }
};

module.exports = { getPlans, subscribe, changePlan, associatePlan };
