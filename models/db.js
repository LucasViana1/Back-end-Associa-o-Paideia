const Sequelize = require("sequelize")

const sequelize = new Sequelize('focus', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: 'America/Sao_Paulo'
})


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}