//camada model do projeto, possui as operações que podem ser realizadas
const db = require("../conecta");//credenciais de conexao ao banco
var todosInscritos = "SELECT candidatos.cpf, candidatos.cidadao, usuarios.id, usuarios.nome, usuarios.email FROM candidatos INNER JOIN usuarios ON candidatos.idUser = usuarios.id";
var dadosCandidato = "SELECT * FROM candidatos WHERE idUser = ?";
//exportando a classe
module.exports = class Operacoes{
    //todos os metodos implementado receberam parametros e funções de callback
    static getInscritos(callback){
        //o "callback" retorna informações uteis sobre as operações realizadas no banco  
        return db.query(todosInscritos , callback);//depois implementar clausula WHERE
        /*modelo inner join:
        SELECT candidatos.cpf, usuarios.nome, usuarios.email FROM candidatos
        INNER JOIN usuarios ON candidatos.idUser = usuarios.id*/
    }
    static getCandidato(id, callback){
        //o "callback" retorna informações uteis sobre as operações realizadas no banco  
        return db.query(dadosCandidato, [id], callback);//depois implementar clausula WHERE
        /*modelo inner join:
        SELECT candidatos.cpf, usuarios.nome, usuarios.email FROM candidatos
        INNER JOIN usuarios ON candidatos.idUser = usuarios.id*/
    }
    static insereInscrito(dados, callback){
        console.log(dados.nome);
        return db.query("INSERT INTO inscritos (nome,email,senha) VALUES(?,?,?)", [dados.nome, dados.email, dados.senha], callback);
        
        
    }
}