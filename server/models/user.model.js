const { Sequelize } = require("sequelize");
const db = require("../db/database");

const { DataTypes } = Sequelize;

const User = db.define('users', {
    name: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

module.exports = User;