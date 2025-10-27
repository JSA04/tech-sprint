const { DataTypes } = require('sequelize');
const db = require('../db/conn');
const User = require('./User');
const Idea = require('./Idea');

const Vote = db.define('Vote', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    weight: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
});

Vote.belongsTo(User, {
    foreignKey: 'id',
    as: 'userId'
});
User.hasMany(Vote, {
    foreignKey: 'id',
    as: 'votes',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
}, {
    tableName: 'votes'
});

Vote.belongsTo(Idea, {
    foreignKey: 'id',
    as: 'ideaId'
});
Idea.hasMany(Vote, {
    foreignKey: 'id',
    as: 'votes',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

module.exports = Vote;