// Carrega variáveis de ambiente do arquivo .env
require('dotenv').config(); 

// Importa os módulos necessários: supertest para testar requisições HTTP e jwt para gerar tokens
const request = require('supertest');
const jwt = require('jsonwebtoken');

// Descreve o conjunto de testes para a rota /api/plans
describe('Testes para a rota /api/plans', () => {
    let token;  // Variável para armazenar o token JWT gerado
    const apiUrl = process.env.API_URL || 'http://127.0.0.1:5000';  // URL da API, podendo ser lida do .env

    // Hook antes de todos os testes para gerar o token JWT
    beforeAll(() => {
        // Gera um token JWT fictício para autenticação com dados de usuário e papel (role) de 'admin'
        token = jwt.sign({ userId: 'fakeUserId', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    // Teste 1: Verifica se a rota /api/plans retorna todos os planos com sucesso
    it('Deve retornar todos os planos com sucesso', async () => {
        // Realiza a requisição GET para a rota /api/plans com o cabeçalho Authorization configurado com o token
        const response = await request(apiUrl)
            .get('/api/plans')
            .set('Authorization', `Bearer ${token}`);  // Adiciona o token JWT no cabeçalho da requisição

        // Verifica se o status da resposta é 200 (sucesso)
        expect(response.status).toBe(200);
        
        // Verifica se o corpo da resposta é um array (esperado para a lista de planos)
        expect(Array.isArray(response.body)).toBe(true);
    });
});
