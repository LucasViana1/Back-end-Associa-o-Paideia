const mysql = require("mysql");

//pool de conexoes ao banco gerenciados pelo mysql
let conexao = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'focus'
});


//exportar a conexao para outros modulos
module.exports = conexao;