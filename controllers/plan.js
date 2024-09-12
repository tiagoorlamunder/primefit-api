const Plan = require('../models/plan');
const User = require('../models/user');

const getPlans = async (req, res) => {
    try {
        const plans = await Plan.find();
        res.json(plans);
    } catch (error) {
        res.status(500).send('Erro ao obter planos.');
    }
};

const subscribe = async (req, res) => {
    const { userId, planId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).send('Usuário não encontrado.');

        const plan = await Plan.findById(planId);
        if (!plan) return res.status(404).send('Plano não encontrado.');

        user.plan = planId;
        await user.save();
        res.send('Assinatura realizada com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao realizar assinatura.');
    }
};

const changePlan = async (req, res) => {
    const { userId, newPlanId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).send('Usuário não encontrado.');

        const plan = await Plan.findById(newPlanId);
        if (!plan) return res.status(404).send('Novo plano não encontrado.');

        user.plan = newPlanId;
        await user.save();
        res.send('Plano alterado com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao alterar plano.');
    }
};

module.exports = { getPlans, subscribe, changePlan };
