const request = require('supertest');

const app = require('../../app');
const factory = require('../utils/factories');
const truncate = require('../utils/truncate');

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      });

      expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credential', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '545754152'
      });

      expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticate', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123'
      });

      expect(response.body).toHaveProperty('token');
  });

  it('should be able to acess private routes when authenticate', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`);
    
      expect(response.status).toBe(200);
  });

  it('should not be able to access private routes without jwt token', async () => {
    const response = await request(app)
    .get('/dashboard')
  
    expect(response.status).toBe(401);
  });

  it('should not be able to access private routes with invalid jwt token', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer 123123`);
    
      expect(response.status).toBe(401);
  });
});

// Integração, testam funcionalidades que podem fazer chamadas de API,Cadastro no banco de dados "funções-não-puras" , "efeitos colaterais"
//  Agradecimentos >> https://stackoverflow.com/questions/57874114/intellisense-for-jest-not-working-in-vs-code