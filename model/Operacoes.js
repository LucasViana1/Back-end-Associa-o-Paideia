//camada model do projeto, possui as operações que podem ser realizadas
const db = require("../conecta");//credenciais de conexao ao banco

//exportando a classe
module.exports = class Operacoes{
    //todos os metodos implementado receberam parametros e funções de callback
    static getInscritos(callback){
        //o "callback" retorna informações uteis sobre as operações realizadas no banco
        return db.query("SELECT * FROM inscritos" , callback);//depois implementar clausula WHERE
    }
    static insereInscrito(dados, callback){
        console.log(dados.nome);
        return db.query("INSERT INTO inscritos (nome,email,senha) VALUES(?,?,?)", [dados.nome, dados.email, dados.senha], callback);
        
        
    }
}