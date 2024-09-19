const mongoose = require('mongoose');

// Define o esquema para o modelo de usuário
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Nome de usuário, deve ser único
    password: { type: String, required: true }, // Senha do usuário
    plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' }, // Referência ao plano associado ao usuário
    email: { type: String, required: false }, // Email do usuário
    phone: { type: String, required: false } // Telefone do usuário
});

// Cria e exporta o modelo 'User' baseado no esquema definido
module.exports = mongoose.model('User', UserSchema);
