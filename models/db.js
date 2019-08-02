const Sequelize = require("sequelize")

/*const sequelize = new Sequelize('focus', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: 'America/Sao_Paulo'
})*/

/*const sequelize = new Sequelize('focus', 'root', 'B9BkPJp6xd3z',{
    host: '35.184.237.68',
    dialect: 'mysql',
    timezone: 'America/Sao_Paulo'
})*/

const sequelize = new Sequelize(process.env.DBDATABASE, process.env.DBUSER, process.env.DBPASSWORD,{
    host: process.env.DBHOST,
    dialect: 'mysql',
    timezone: 'America/Sao_Paulo'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}