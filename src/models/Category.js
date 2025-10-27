const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Category = db.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Nome não pode estar vazio'
            },
            len: {
                args: [2, 30],
                msg: 'Nome deve ter entre 2 e 30 caracteres'
            }
        }
    },
}, {
    tableName: 'categories'
});
module.exports = Category;