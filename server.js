const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conecte ao MongoDB
mongoose.connect('mongodb://localhost:27017/primefit');

// Defina o modelo para Planos de Assinatura
const PlanSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
});
const Plan = mongoose.model('Plan', PlanSchema);

// Rota para obter todos os planos
app.get('/api/plans', async (req, res) => {
    try {
        const plans = await Plan.find();
        res.json(plans);
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`);
});
