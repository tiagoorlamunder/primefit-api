const User = require('../models/user');

// Função para obter informações do usuário
const getUserInfo = async (req, res) => {
    // Extrai o ID do usuário dos parâmetros de consulta
    const { userId } = req.query;
    try {
        // Busca o usuário pelo ID e popula o campo do plano associado
        const user = await User.findById(userId).populate('plan');
        if (!user) return res.status(404).send('Usuário não encontrado.');

        // Prepara um objeto com as informações do usuário
        const userInfo = {
            name: user.username, // Nome do usuário
            email: user.email, // Email do usuário
            phone: user.phone, // Telefone do usuário
            planName: user.plan ? user.plan.name : null, // Nome do plano, se existir
            planDescription: user.plan ? user.plan.description : null // Descrição do plano, se existir
        };

        // Retorna as informações do usuário como resposta
        res.json(userInfo);
    } catch (error) {
        // Responde com erro em caso de falha
        res.status(500).send('Erro ao obter informações do usuário.');
    }
};

module.exports = { getUserInfo };
