const mongoose = require('mongoose');

// Define o esquema para o modelo de plano
const PlanSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nome do plano
    description: { type: String, required: true }, // Descrição do plano
    price: { type: Number, required: true } // Preço do plano
});

// Cria e exporta o modelo 'Plan' baseado no esquema definido
module.exports = mongoose.model('Plan', PlanSchema);
