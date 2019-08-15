const Sequelize = require("sequelize")

const banco = process.env.DBDATABASE || 'focus'
const user = process.env.DBUSER || 'root'
const senha = process.env.DBPASSWORD 
const server = process.env.DBHOST || 'localhost'

const sequelize = new Sequelize(banco, user, senha,{
    host: server,
    dialect: 'mysql',
    timezone: 'America/Sao_Paulo'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}