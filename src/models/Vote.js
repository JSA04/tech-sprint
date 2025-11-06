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
    }, 
    {
        tableName: "votes",
    },
);

Vote.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});
User.hasMany(Vote, {
    foreignKey: 'userId',
    as: 'votes',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
}, {
    tableName: 'votes'
});

Vote.belongsTo(Idea, {
    foreignKey: 'ideaId',
    as: 'idea'
});
Idea.hasMany(Vote, {
    foreignKey: 'ideaId',
    as: 'votes',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

module.exports = Vote;