const db = require("./db");

const ResultadoSimulado = db.sequelize.define("resultadosimulado", {
  idUser: {
    type: db.Sequelize.INTEGER
  },
  // coluna nova de identificação
  idSimulado: {
    type: db.Sequelize.TINYINT
  },
  // coluna nova de identificação
  nomeSimulado: {
    type: db.Sequelize.STRING
  },
  modelo: {
    type: db.Sequelize.TINYINT
  },
  pergunta: {
    type: db.Sequelize.TINYINT
  },
  selecionado: {
    type: db.Sequelize.CHAR("1")
  },
  acertou: {
    type: db.Sequelize.CHAR("1")
  }
});

//Criar a tabela
// ResultadoSimulado.sync({ force: true });

module.exports = ResultadoSimulado;
