require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const request = require('supertest');
const jwt = require('jsonwebtoken');

describe('Testes para a rota /api/plans', () => {
    let token;
    const baseURL = process.env.API_URL || 'https://primefit-api.onrender.com';

    beforeAll(() => {
        // Gera um token JWT fictício para autenticação
        token = jwt.sign({ userId: 'fakeUserId', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    it('Deve retornar todos os planos com sucesso', async () => {
        const response = await request(baseURL)
            .get('/api/plans')
            .set('Authorization', `Bearer ${token}`);

        // Verifica se o status é 200 e se a resposta contém um array de planos
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
