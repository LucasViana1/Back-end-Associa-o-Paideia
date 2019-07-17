const db = require('./db')

const Candidato = db.sequelize.define('candidatos', {
    idUser: {
        type: db.Sequelize.INTEGER
    },
    data_nasc: {
        type: db.Sequelize.DATE
    },
    cidade_nasc: {
        type: db.Sequelize.STRING
    },
    estado_nasc: {
        type: db.Sequelize.STRING
    },
    tel1: {
        type: db.Sequelize.STRING
    },
    tel2: {
        type: db.Sequelize.STRING
    },
    cpf: {
        type: db.Sequelize.STRING
    },
    rg: {
        type: db.Sequelize.STRING
    },
    cidadao: {
        type: db.Sequelize.STRING
    }
    
})

//Criar a tabela
//Candidato.sync({force: true})

module.exports = Candidato