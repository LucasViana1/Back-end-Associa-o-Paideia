const db = require('./db')

const Valores = db.sequelize.define('valores', {
    idUser: {
        type: db.Sequelize.INTEGER
    },
    racista: {
        type: db.Sequelize.STRING
    },
    parente: {
        type: db.Sequelize.STRING
    },
    amigo: {
        type: db.Sequelize.STRING
    },
    vizinho: {
        type: db.Sequelize.STRING
    },
    prof: {
        type: db.Sequelize.STRING
    },
    pessoa: {
        type: db.Sequelize.STRING
    },
    sofreu_econo: {
        type: db.Sequelize.STRING
    },
    sofreu_etnica: {
        type: db.Sequelize.STRING
    },
    sofreu_genero: {
        type: db.Sequelize.STRING
    },
    sofreu_lgbt: {
        type: db.Sequelize.STRING
    },
    sofreu_religiao: {
        type: db.Sequelize.STRING
    },
    sofreu_sem_religiao: {
        type: db.Sequelize.STRING
    },
    sofreu_origem: {
        type: db.Sequelize.STRING
    },
    sofreu_idade: {
        type: db.Sequelize.STRING
    },
    sofreu_deficiencia: {
        type: db.Sequelize.STRING
    },
    sofreu_aparencia: {
        type: db.Sequelize.STRING
    },
    sofreu_moradia: {
        type: db.Sequelize.STRING
    },
    pre_econo: {
        type: db.Sequelize.STRING
    },
    pre_etnica: {
        type: db.Sequelize.STRING
    },
    pre_mulher: {
        type: db.Sequelize.STRING
    },
    pre_lgbt: {
        type: db.Sequelize.STRING
    },
    pre_religiosa: {
        type: db.Sequelize.STRING
    },
    pre_origem: {
        type: db.Sequelize.STRING
    },
    pre_sem_religiao: {
        type: db.Sequelize.STRING
    },
    pre_jovens: {
        type: db.Sequelize.STRING
    },
    pre_idosos: {
        type: db.Sequelize.STRING
    },
    pre_deficiencia: {
        type: db.Sequelize.STRING
    },
    pre_fisica: {
        type: db.Sequelize.STRING
    },
    pre_moradia: {
        type: db.Sequelize.STRING
    }
  
})

//Criar a tabela
//Valores.sync({force: true})

module.exports = Valores