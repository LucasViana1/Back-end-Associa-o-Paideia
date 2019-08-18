const db = require('./db')

const Valores = db.sequelize.define('valores', {
    idUser: {
        type: db.Sequelize.INTEGER
    },
    racista: {
        type: db.Sequelize.STRING
    },
    parente: {
        type: db.Sequelize.TINYINT
    },
    amigo: {
        type: db.Sequelize.TINYINT
    },
    vizinho: {
        type: db.Sequelize.TINYINT
    },
    prof: {
        type: db.Sequelize.TINYINT
    },
    pessoa: {
        type: db.Sequelize.TINYINT
    },
    sofreu_econo: {
        type: db.Sequelize.TINYINT
    },
    sofreu_etnica: {
        type: db.Sequelize.TINYINT
    },
    sofreu_genero: {
        type: db.Sequelize.TINYINT
    },
    sofreu_lgbt: {
        type: db.Sequelize.TINYINT
    },
    sofreu_religiao: {
        type: db.Sequelize.TINYINT
    },
    sofreu_sem_religiao: {
        type: db.Sequelize.TINYINT
    },
    sofreu_origem: {
        type: db.Sequelize.TINYINT
    },
    sofreu_idade: {
        type: db.Sequelize.TINYINT
    },
    sofreu_deficiencia: {
        type: db.Sequelize.TINYINT
    },
    sofreu_aparencia: {
        type: db.Sequelize.TINYINT
    },
    sofreu_moradia: {
        type: db.Sequelize.TINYINT
    },
    pre_econo: {
        type: db.Sequelize.TINYINT
    },
    pre_etnica: {
        type: db.Sequelize.TINYINT
    },
    pre_mulher: {
        type: db.Sequelize.TINYINT
    },
    pre_lgbt: {
        type: db.Sequelize.TINYINT
    },
    pre_religiosa: {
        type: db.Sequelize.TINYINT
    },
    pre_origem: {
        type: db.Sequelize.TINYINT
    },
    pre_sem_religiao: {
        type: db.Sequelize.TINYINT
    },
    pre_jovens: {
        type: db.Sequelize.TINYINT
    },
    pre_idosos: {
        type: db.Sequelize.TINYINT
    },
    pre_deficiencia: {
        type: db.Sequelize.TINYINT
    },
    pre_fisica: {
        type: db.Sequelize.TINYINT
    },
    pre_moradia: {
        type: db.Sequelize.TINYINT
    }
  
})

//Criar a tabela
//Valores.sync({force: true})

module.exports = Valores