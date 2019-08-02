const mysql = require("mysql");

//pool de conexoes ao banco gerenciados pelo mysql
/*let conexao = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'focus'
});*/

let conexao = mysql.createPool({
    host: '35.184.237.68',
    //user: process.env.DBUSER,
    user: 'root',
    password: 'B9BkPJp6xd3z',
    database: 'focus'
});


//exportar a conexao para outros modulos
module.exports = conexao;