const User = require('../models/user');

const getUserPlan = async (req, res) => {
    const { userId } = req.query;
    try {
        const user = await User.findById(userId).populate('plan');
        if (!user) return res.status(404).send('Usuário não encontrado.');

        res.json(user.plan);
    } catch (error) {
        res.status(500).send('Erro ao obter plano.');
    }
};

module.exports = { getUserPlan };
