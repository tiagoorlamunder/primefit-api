const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/primefit');

// Modelos
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const PlanSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
});

const User = mongoose.model('User', UserSchema);
const Plan = mongoose.model('Plan', PlanSchema);

// Rotas de autenticação
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send('Usuário registrado com sucesso!');
    } catch (error) {
        res.status(400).send('Erro ao registrar usuário.');
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Credenciais inválidas.');
        }
        const token = jwt.sign({ userId: user._id }, 'secreta', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send('Erro ao fazer login.');
    }
});

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
