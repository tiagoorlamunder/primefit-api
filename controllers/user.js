const User = require('../models/user');

// Obter todos os usuários
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
    }
};

// Obter informações de um usuário específico
const getUserInfo = async (req, res) => {
    const { userId } = req.query;
    try {
        const user = await User.findById(userId).populate('plan').select('-password');
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        const userInfo = {
            name: user.username,
            email: user.email,
            phone: user.phone,
            planName: user.plan ? user.plan.name : null,
            planDescription: user.plan ? user.plan.description : null,
            permission: user.permission || false
        };

        res.json(userInfo);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar informações do usuário', error: error.message });
    }
};

// Criar um novo usuário
const createUser = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;
        const newUser = new User({ username, email, password, phone });
        await newUser.save();
        res.status(201).json({ message: 'Usuário criado com sucesso', userId: newUser._id });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar usuário', error: error.message });
    }
};

// Atualizar informações de um usuário
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Prevenir atualização da senha por esta rota
        delete updateData.password;

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select('-password');
        if (!updatedUser) return res.status(404).json({ message: 'Usuário não encontrado' });

        res.json({ message: 'Usuário atualizado com sucesso', user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar usuário', error: error.message });
    }
};

// Excluir um usuário
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: 'Usuário não encontrado' });

        res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir usuário', error: error.message });
    }
};

module.exports = { 
    getUserInfo, 
    getAllUsers, 
    createUser, 
    updateUser, 
    deleteUser 
};
