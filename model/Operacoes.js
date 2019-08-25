//camada model do projeto, possui as operações que podem ser realizadas
const db = require("../conecta");//credenciais de conexao ao banco
var todosInscritos = "SELECT candidatos.cpf, candidatos.cidadao, usuarios.id, usuarios.nome, usuarios.email, usuarios.espera, usuarios.cancelado, usuarios.matricula FROM candidatos INNER JOIN usuarios ON candidatos.idUser = usuarios.id WHERE usuarios.inscrito_atual = 1";

var dadosCandidato = "SELECT candidatos.idUser, candidatos.nome_completo, candidatos.data_nasc, candidatos.cidade_nasc, candidatos.estado_nasc, candidatos.tel1, candidatos.tel2, candidatos.cpf, candidatos.rg, candidatos.cidadao, usuarios.email, arquivos.tipo, arquivos.arquivo FROM candidatos INNER JOIN usuarios ON candidatos.idUser = usuarios.id INNER JOIN arquivos ON arquivos.idUser = usuarios.id WHERE usuarios.id = ?";

//var dadosCompletos = "SELECT * FROM candidatos INNER JOIN estudos INNER JOIN usuarios INNER JOIN arquivos INNER JOIN socioeconomicos INNER JOIN valores ON usuarios.id = estudos.idUser WHERE usuarios.id = ?"
var dadosCompletos = "SELECT * FROM candidatos INNER JOIN usuarios ON candidatos.idUser = usuarios.id INNER JOIN socioeconomicos ON socioeconomicos.idUser = usuarios.id INNER JOIN valores ON valores.idUser = usuarios.id INNER JOIN estudos ON estudos.idUser = usuarios.id WHERE usuarios.id = ?"
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
        return db.query(dadosCandidato, [id], callback);//depois implementar clausula WHERE
    }
    static getCandidatoCompleto(id, callback){
        return db.query(dadosCompletos, [id], callback);//depois implementar clausula WHERE
    }
    static getQtdInscritos(callback){
        return db.query("SELECT * FROM usuarios WHERE inscrito_atual = 1" , callback);//depois implementar clausula WHERE
    }
    static insereInscrito(dados, callback){
        console.log(dados.nome);
        return db.query("INSERT INTO inscritos (nome,email,senha) VALUES(?,?,?)", [dados.nome, dados.email, dados.senha], callback);
        
        
    }
}