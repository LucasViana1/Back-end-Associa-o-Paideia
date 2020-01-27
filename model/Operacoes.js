//camada model do projeto, possui as operações que podem ser realizadas
const db = require("../conecta"); //credenciais de conexao ao banco
var todosInscritos =
  "SELECT candidatos.cpf, candidatos.cidadao, usuarios.id, usuarios.nome, usuarios.email, usuarios.espera, usuarios.cancelado, usuarios.matricula FROM candidatos INNER JOIN usuarios ON candidatos.idUser = usuarios.id WHERE usuarios.inscrito_atual = 1";

var dadosCandidato =
  "SELECT candidatos.idUser, candidatos.nome_completo, candidatos.curso_desejado, candidatos.data_nasc, candidatos.cidade_nasc, candidatos.estado_nasc, candidatos.tel1, candidatos.tel2, candidatos.cpf, candidatos.rg, candidatos.cidadao, usuarios.email, arquivos.tipo, arquivos.arquivo FROM candidatos INNER JOIN usuarios ON candidatos.idUser = usuarios.id INNER JOIN arquivos ON arquivos.idUser = usuarios.id WHERE usuarios.id = ?";

// <<<<<<< HEAD
// //var dadosCompletos = "SELECT * FROM candidatos INNER JOIN estudos INNER JOIN usuarios INNER JOIN arquivos INNER JOIN socioeconomicos INNER JOIN valores ON usuarios.id = estudos.idUser WHERE usuarios.id = ?"
// var dadosCompletos =
//   "SELECT * FROM candidatos INNER JOIN usuarios ON candidatos.idUser = usuarios.id INNER JOIN socioeconomicos ON socioeconomicos.idUser = usuarios.id INNER JOIN valores ON valores.idUser = usuarios.id INNER JOIN estudos ON estudos.idUser = usuarios.id WHERE usuarios.id = ?";
// var dadosGabaritos =
//   "SELECT count(*) AS qtdPerguntas FROM gabaritos where modelo = 1";
// =======
//var dadosCompletos = "SELECT * FROM candidatos INNER JOIN usuarios ON candidatos.idUser = usuarios.id INNER JOIN socioeconomicos ON socioeconomicos.idUser = usuarios.id INNER JOIN valores ON valores.idUser = usuarios.id INNER JOIN estudos ON estudos.idUser = usuarios.id WHERE usuarios.id = ?"
var dadosCompletos = "SELECT * FROM candidatos INNER JOIN usuarios ON candidatos.idUser = usuarios.id INNER JOIN socioeconomicos2020s ON socioeconomicos2020s.idUser = usuarios.id WHERE usuarios.id = ?";


var dadosGabaritos = "SELECT count(*) AS qtdPerguntas FROM gabaritos where modelo = 1"
// >>>>>>> a9894a3934b29b7e9e22dec7f2865da36ef9c70c
//var checagemSimulado = "SELECT * FROM gabaritos g INNER JOIN simulados s on g.modelo = s.modelo and g.pergunta = s.pergunta WHERE s.idUser = ? ORDER BY g.pergunta DESC"
//var checagemSimulado = "SELECT * FROM gabaritos g INNER JOIN simulados s on g.modelo = s.modelo and g.pergunta = s.pergunta + 1 WHERE s.idUser = ? ORDER BY g.pergunta DESC"
var checagemSimulado =
  "SELECT g.modelo,g.materia,g.pergunta,g.enunciado,g.resp_a,g.resp_b,g.resp_c,g.resp_d,g.resp_e,g.img,s.idUser FROM gabaritos g LEFT JOIN simulados s on g.modelo = s.modelo and g.pergunta = s.pergunta + 1 WHERE s.idUser = ? ORDER BY g.pergunta DESC";
var simuladoQ1 =
  "SELECT g.modelo,g.materia,g.pergunta,g.enunciado,g.resp_a,g.resp_b,g.resp_c,g.resp_d,g.resp_e,g.img FROM gabaritos g WHERE modelo = ? ORDER BY pergunta";
var registroTempo = "SELECT * FROM alunosimulados WHERE idUser = ?";
var respAlunoSimples =
  "SELECT s.modelo, s.pergunta, s.acertou, g.materia, s.selecionado FROM simulados s INNER JOIN gabaritos g on s.pergunta = g.pergunta and s.modelo = g.modelo WHERE idUser = ? GROUP BY s.pergunta";
var respAlunoCompleto =
  "SELECT s.modelo, s.pergunta, s.acertou, s.selecionado, g.materia, g.enunciado, g.resp_a, g.resp_b, g.resp_c, g.resp_d, g.resp_e, g.correta, g.img, u.nome, s.createdAt FROM simulados s INNER JOIN gabaritos g on s.pergunta = g.pergunta and s.modelo = g.modelo INNER JOIN usuarios u on u.id = s.idUser WHERE idUser = ?";
var simuladoAdmCompleto = "select u.nome, u.sobrenome, s.idUser, s.modelo, s.pergunta, s.selecionado, s.acertou, g.materia from simulados s inner join usuarios u on s.idUser = u.id inner join gabaritos g on g.pergunta = s.pergunta and g.modelo = s.modelo  order by u.nome, s.pergunta ";

//exportando a classe
module.exports = class Operacoes {
  //todos os metodos implementado receberam parametros e funções de callback
  static getInscritos(callback) {
    //o "callback" retorna informações uteis sobre as operações realizadas no banco
    return db.query(todosInscritos, callback); //depois implementar clausula WHERE
    /*modelo inner join:
        SELECT candidatos.cpf, usuarios.nome, usuarios.email FROM candidatos
        INNER JOIN usuarios ON candidatos.idUser = usuarios.id*/
  }
  static getCandidato(id, callback) {
    return db.query(dadosCandidato, [id], callback); //depois implementar clausula WHERE
  }
  static getCandidatoCompleto(id, callback) {
    return db.query(dadosCompletos, [id], callback); //depois implementar clausula WHERE
  }
  static getQtdInscritos(callback) {
    return db.query(
      "SELECT * FROM usuarios WHERE inscrito_atual = 1",
      callback
    ); //depois implementar clausula WHERE
  }
  static insereInscrito(dados, callback) {
    console.log(dados.nome);
    return db.query(
      "INSERT INTO inscritos (nome,email,senha) VALUES(?,?,?)",
      [dados.nome, dados.email, dados.senha],
      callback
    );
  }
  static getQtdPerguntasSimulado(callback) {
    return db.query(dadosGabaritos, callback); //depois implementar clausula WHERE
  }
  static getSimulado(id, callback) {
    return db.query(checagemSimulado, [id], callback); //depois implementar clausula WHERE
  }
  static getSimuladoQ1(id, callback) {
    return db.query(simuladoQ1, [id], callback); //nesse caso id = nº modelo
  }
  static getRegistroTempo(id, callback) {
    return db.query(registroTempo, [id], callback);
  }
  static getRespAlunoSimples(id, callback) {
    return db.query(respAlunoSimples, [id], callback);
  }
  static getRespAlunoCompleto(id, callback) {
    return db.query(respAlunoCompleto, [id], callback);
  }
  static getSimuladoAdmCompleto(callback) {
    return db.query(simuladoAdmCompleto, callback); 
  }
  
};
