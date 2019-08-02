const mysql = require("mysql");

//pool de conexoes ao banco gerenciados pelo mysql
/*let conexao = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'focus'
});*/

let conexao = mysql.createPool({
    /*host: '35.184.237.68',
    user: 'root',
    password: 'B9BkPJp6xd3z',
    database: 'focus'*/
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE
});


//exportar a conexao para outros modulos
module.exports = conexao;