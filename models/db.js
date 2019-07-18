const Sequelize = require("sequelize")

/*const sequelize = new Sequelize('focus', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: 'America/Sao_Paulo'
})*/

const sequelize = new Sequelize('sql10299044', 'sql10299044', '2Hq2eb4mkH',{
    host: 'sql10.freesqldatabase.com',
    dialect: 'mysql',
    timezone: 'America/Sao_Paulo'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}