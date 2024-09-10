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
    password: { type: String, required: true },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
    email: String,
    phone: String
});

const PlanSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
});

const BookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    classId: String,
    scheduledTime: Date
});

const User = mongoose.model('User', UserSchema);
const Plan = mongoose.model('Plan', PlanSchema);
const Booking = mongoose.model('Booking', BookingSchema);

// Rotas de autenticação
app.post('/api/register', async (req, res) => {
    const { username, password, email, phone } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, email, phone });
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

// Rota para realizar a assinatura de um plano
app.post('/api/subscribe', async (req, res) => {
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
});

// Rota para obter o plano atual do usuário
app.get('/api/user/plan', async (req, res) => {
    const { userId } = req.query;
    try {
        const user = await User.findById(userId).populate('plan');
        if (!user) return res.status(404).send('Usuário não encontrado.');

        res.json(user.plan);
    } catch (error) {
        res.status(500).send('Erro ao obter plano.');
    }
});

// Rota para alterar o plano do usuário
app.post('/api/user/change-plan', async (req, res) => {
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
});

// Rota para obter a disponibilidade de horários para aulas experimentais
app.get('/api/classes', async (req, res) => {
    // Para simplificar, retornamos uma lista estática. Isso deve ser substituído por dados reais.
    const sampleClasses = [
        { id: '1', time: '2024-09-15T09:00:00Z' },
        { id: '2', time: '2024-09-15T10:00:00Z' }
    ];
    res.json(sampleClasses);
});

// Rota para reservar uma aula experimental
app.post('/api/classes/booking', async (req, res) => {
    const { userId, classId, scheduledTime } = req.body;
    try {
        const booking = new Booking({ userId, classId, scheduledTime });
        await booking.save();
        res.send('Aula experimental reservada com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao reservar aula.');
    }
});

// Rota para obter o histórico de transações do usuário
app.get('/api/user/transactions', async (req, res) => {
    const { userId } = req.query;
    // Este exemplo não inclui uma implementação real para transações
    res.send('Histórico de transações não implementado.');
});

// Rota para criar e gerenciar planos de assinatura (Admin)
app.post('/api/admin/plan', async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const plan = new Plan({ name, description, price });
        await plan.save();
        res.send('Plano criado/atualizado com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao criar/atualizar plano.');
    }
});

app.delete('/api/admin/plan', async (req, res) => {
    const { planId } = req.body;
    try {
        await Plan.findByIdAndDelete(planId);
        res.send('Plano removido com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao remover plano.');
    }
});

// Rota para obter todos os agendamentos e reservas (Admin)
app.get('/api/admin/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('userId');
        res.json(bookings);
    } catch (error) {
        res.status(500).send('Erro ao obter agendamentos.');
    }
});

// Rota para gerar relatórios sobre assinaturas e finanças (Admin)
app.get('/api/admin/reports', async (req, res) => {
    const { startDate, endDate } = req.query;
    // Este exemplo não inclui uma implementação real para relatórios
    res.send('Relatórios não implementados.');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`);
});
