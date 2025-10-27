const { DataTypes } = require('sequelize');
const db = require('../db/conn');
const Category = require('./Category');

const Idea = db.define('Idea', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
}, {
    tableName: 'ideas'
});

Idea.belongsTo(Category, {
    foreignKey: 'id',
    as: 'categoryId'
});
Idea.hasOne(Category, {
    foreignKey: 'id',
    as: 'category',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});


module.exports = Idea;