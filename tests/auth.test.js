const request = require('supertest');

describe('Testando o login', () => {
  const apiUrl = 'https://primefit-api.onrender.com';  // URL da API hospedada

  it('deve realizar login com credenciais válidas', async () => {
    const loginResponse = await request(apiUrl)
      .post('/api/auth/login')
      .send({
        username: 'testuser@example.com',
        password: 'rightpassword',
      });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.token).toBeDefined();
  });

  it('deve retornar erro 401 com credenciais inválidas', async () => {
    const loginResponse = await request(apiUrl)
      .post('/api/auth/login')
      .send({
        username: 'testuser@example.com',
        password: 'wrongpassword',
      });

    console.log(loginResponse.body);  // Verifique o que está sendo retornado

    expect(loginResponse.statusCode).toBe(401);
    expect(loginResponse.body.message).toBe('Credenciais inválidas.');
  });
});
