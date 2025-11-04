const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Nome não pode estar vazio",
        },
        len: {
          args: [2, 100],
          msg: "Nome deve ter entre 2 e 100 caracteres",
        },
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "E-mail não pode estar vazio",
        },
        len: {
          args: [5, 100],
          msg: "E-mail deve ter entre 5 e 100 caracteres",
        },
      },
    },
    password: {
      type: DataTypes.CHAR,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Senha não pode estar vazia",
        },
      },
    },
  },
  {
    tableName: "users",
  }
);

module.exports = User;
