const db = require('./db')

const Inscritos = db.sequelize.define('inscritos', {
    nome: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.STRING
    },
    ativo: {
        type: db.Sequelize.INTEGER
    },
    espera: {
        type: db.Sequelize.INTEGER
    }
})//POSTERIORMENTE REMOVER OS CAMPOS "ATIVO" E "ESPERA"

//Criar a tabela
//Inscritos.sync({force: true})

module.exports = Inscritos