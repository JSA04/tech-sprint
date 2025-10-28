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
  console.log('Connected to the database!');
} catch (error) {
  console.error('Not possible to connect to database:', error);
}

module.exports = sequelize;