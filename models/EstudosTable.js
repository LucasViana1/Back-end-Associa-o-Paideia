const db = require('./db')

const Estudos = db.sequelize.define('estudos', {
    idUser: {
        type: db.Sequelize.INTEGER
    },
    ensino_fundamental: {
        type: db.Sequelize.STRING
    },
    conclusao_fundamental: {
        type: db.Sequelize.STRING
    },
    ensino_medio: {
        type: db.Sequelize.STRING
    },
    conclusao_medio: {
        type: db.Sequelize.STRING
    },
    turno_medio: {
        type: db.Sequelize.STRING
    },
    ano_medio: {
        type: db.Sequelize.STRING
    },
    tecnico: {
        type: db.Sequelize.STRING
    },
    fez_cursinho: {
        type: db.Sequelize.STRING
    },
    tipo_cursinho: {
        type: db.Sequelize.STRING
    },
    cursinho_particular: {
        type: db.Sequelize.STRING
    },
    fez_vestibular: {
        type: db.Sequelize.STRING
    },
    superior: {
        type: db.Sequelize.STRING
    },
    area_desejo: {
        type: db.Sequelize.STRING
    },
    curso_univ1: {
        type: db.Sequelize.STRING
    },
    curso_univ2: {
        type: db.Sequelize.STRING
    },
    curso_univ3: {
        type: db.Sequelize.STRING
    },
    fuvest: {
        type: db.Sequelize.STRING
    },
    comvest: {
        type: db.Sequelize.STRING
    },
    vunesp: {
        type: db.Sequelize.STRING
    },
    enem: {
        type: db.Sequelize.STRING
    },
    fatec: {
        type: db.Sequelize.STRING
    }
  
})

//Criar a tabela
//Estudos.sync({force: true})

module.exports = Estudos