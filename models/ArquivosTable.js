const db = require('./db')

const Arquivos = db.sequelize.define('arquivos', {
    idUser: {
        type: db.Sequelize.INTEGER
    },
    tipo: {
        type: db.Sequelize.STRING
    },
    arquivo: {
        type: db.Sequelize.TEXT
    }
})//POSTERIORMENTE REMOVER OS CAMPOS "ATIVO" E "ESPERA"

//Criar a tabela
//Arquivos.sync({force: true})

module.exports = Arquivos