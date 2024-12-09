// Importando o módulo supertest para realizar requisições HTTP em testes
const request = require('supertest');

// Descrevendo o conjunto de testes relacionados ao login
describe('Testando o login', () => {
  
  // Definindo a URL da API, que pode ser lida do arquivo .env ou uma URL padrão
  const apiUrl = process.env.API_URL || 'https://primefit-api.onrender.com';

  // Teste 1: Verificando se o login é realizado com credenciais válidas
  it('deve realizar login com credenciais válidas', async () => {
    
    // Realizando a requisição POST para a rota de login com credenciais válidas
    const loginResponse = await request(apiUrl)
      .post('/api/auth/login')
      .send({
        username: 'testuser@example.com',  // Usuário de exemplo
        password: 'rightpassword',         // Senha correta
      });

    // Verificando se o status da resposta é 200 (sucesso)
    expect(loginResponse.statusCode).toBe(200);
    
    // Verificando se a resposta contém um token
    expect(loginResponse.body.token).toBeDefined();
  });

  // Teste 2: Verificando se o login retorna erro com credenciais inválidas
  it('deve retornar erro 401 com credenciais inválidas', async () => {
    
    // Realizando a requisição POST para a rota de login com credenciais inválidas
    const loginResponse = await request(apiUrl)
      .post('/api/auth/login')
      .send({
        username: 'testuser@example.com',  // Mesmo usuário de exemplo
        password: 'wrongpassword',         // Senha incorreta
      });

    // Imprimindo o corpo da resposta para depuração
    console.log(loginResponse.body);  // Verifique o que está sendo retornado

    // Verificando se o status da resposta é 401 (não autorizado)
    expect(loginResponse.statusCode).toBe(401);
    
    // Verificando se a mensagem de erro é 'Credenciais inválidas.'
    expect(loginResponse.body.message).toBe('Credenciais inválidas.');
  });
});
