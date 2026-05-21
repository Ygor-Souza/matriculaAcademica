const Sequelize = require("sequelize");
const sequelizeconnect = new Sequelize(
    "db_matriculaAcademica",
    "postgres",
    "postgres",
    {
        host: "localhost",
        port: "5432",
        dialect: "postgres",
    }
);

module.exports = sequelizeconnect;