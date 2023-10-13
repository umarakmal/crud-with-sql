const { Sequelize } = require("sequelize");

const db = new Sequelize('testingdb', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

module.exports = db;