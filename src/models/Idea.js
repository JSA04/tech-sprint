const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const Category = require("./Category");

/**
 * Entidade que representa as ideias no Banco de Dados
 */
const Idea = db.define(
  "Idea",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Título não pode estar vazio",
        },
        len: {
          args: [3, 30],
          msg: "Título deve ter entre 3 e 30 caracteres",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Descrição não pode estar vazia",
        },
      },
    },
  },
  {
    tableName: "ideas",
  }
);

Idea.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

const User = require("./User");
Idea.belongsTo(User, {
  foreignKey: "createdBy",
  as: "creator",
});

module.exports = Idea;
