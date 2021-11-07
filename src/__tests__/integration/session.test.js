const { User } = require('../../app/models');

describe('Authentication', () => {
  it('should receive JWT token when authenticated with valid credentials', async () => {
    const user = await User.create({name: 'Pedro', email: 'pedro@example.com', password_hash: '123456789'});

    console.log(user);
    expect(user.email).toBe('pedro@example.com');
  });
});

// Integração, testam funcionalidades que podem fazer chamadas de API,Cadastro no banco de dados "funções-não-puras" , "efeitos colaterais"
//  Agradecimentos >> https://stackoverflow.com/questions/57874114/intellisense-for-jest-not-working-in-vs-code