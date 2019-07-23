const mysql = require("mysql");

//pool de conexoes ao banco gerenciados pelo mysql
let conexao = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'focus'
});
/*
let conexao = mysql.createPool({
    host: 'sql10.freesqldatabase.com',
    user: 'sql10299044',
    password: '2Hq2eb4mkH',
    database: 'sql10299044'
});*/


//exportar a conexao para outros modulos
module.exports = conexao;