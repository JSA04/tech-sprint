const { Sequelize } = require("sequelize");
require("dotenv").config();

/** 
* Configurações de conexão da aplicação
* Lembre-se de preencher as informações do Banco de Dados no .env corretamente!
*/
const sequelize = new Sequelize(
  process.env.DB_SEQUELIZE_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    timezone: "-03:00",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: process.env.DB_LOGGING === "true" ? console.log : false,
  }
);

module.exports = sequelize;
