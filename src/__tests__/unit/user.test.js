// Testam funções puras, dado as mesma variaveis. não importando quantas vezes, elas terão o mesmo retorno, geralmente nunca tocam em efeitos colaterais. Em recursos que podem dar errado.
const bcrypt = require('bcrypt');

const { User } = require('../../app/models');
const truncate = require('../utils/truncate');

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password', async () => {
    const user = await User.create({
      name: 'John',
      email: 'john@example.com',
      password: 'password'
    });

    const encrypted = await bcrypt.compare('password', user.password_hash);

    expect(encrypted).toBe(true);
  })
})