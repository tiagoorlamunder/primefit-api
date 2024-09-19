const User = require('../models/user');

const getUserInfo = async (req, res) => {
    const { userId } = req.query;
    try {
        const user = await User.findById(userId).populate('plan');
        if (!user) return res.status(404).send('Usuário não encontrado.');

        const userInfo = {
            name: user.username,
            email: user.email,
            phone: user.phone,
            planName: user.plan ? user.plan.name : null,
            planDescription: user.plan ? user.plan.description : null
        };

        res.json(userInfo);
    } catch (error) {
        res.status(500).send('Erro ao obter informações do usuário.');
    }
};

module.exports = { getUserInfo };
