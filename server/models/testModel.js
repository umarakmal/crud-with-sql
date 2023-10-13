const { Sequelize } = require("sequelize");
const db = require("../db/database");

const { DataTypes } = Sequelize;

const Test = db.define('test', {
    name: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },

}, {
    timestamps: true,
    freezeTableName: true
});

module.exports = Test;