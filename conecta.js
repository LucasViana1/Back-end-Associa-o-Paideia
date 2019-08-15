const mysql = require("mysql");

const banco = process.env.DBDATABASE || 'focus'
const usuario = process.env.DBUSER || 'root'
const senha = process.env.DBPASSWORD 
const server = process.env.DBHOST || 'localhost'

let conexao = mysql.createPool({
    host: server,
    user: usuario,
    password: senha,
    database: banco
});


//exportar a conexao para outros modulos
module.exports = conexao;