const { Sequelize } = require('sequelize');

const DB_SEQUELIZE_TABLE = process.env.DB_SEQUELIZE_TABLE;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const sequelize = new Sequelize(DB_SEQUELIZE_TABLE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
});

try {
  sequelize.authenticate();
  console.log('🔌 Conexão com o PostgreSQL estabelecida com sucesso!');
} catch (error) {
  console.error('❌ Não foi possível conectar ao banco de dados:', error);
}

module.exports = sequelize;