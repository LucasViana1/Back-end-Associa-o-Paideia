const db = require('./db')

const Arquivos = db.sequelize.define('arquivos', {
    email: {
        type: db.Sequelize.STRING
    },
    rg: {
        type: db.Sequelize.TEXT
    }
})//POSTERIORMENTE REMOVER OS CAMPOS "ATIVO" E "ESPERA"

//Criar a tabela
//Arquivos.sync({force: true})

module.exports = Arquivos