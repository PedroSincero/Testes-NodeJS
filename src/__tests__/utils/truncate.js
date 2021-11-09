// Percorre todas as tabelas do banco e deleta tudo
const { sequelize } = require('../../app/models');

module.exports = () => {
  return Promise.all(Object.keys(sequelize.models).map(key => {
    return sequelize.models[key].destroy({
      truncate: true,
      force: true,
    });
  }));
}