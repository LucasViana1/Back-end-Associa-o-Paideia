const db = require('./db')

const Usuarios = db.sequelize.define('usuarios', {
    email: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.STRING
    },
    nome: {
        type: db.Sequelize.STRING
    },
    sobrenome: {
        type: db.Sequelize.STRING
    },
    adm: {
        type: db.Sequelize.TINYINT
    },
    ativo: {
        type: db.Sequelize.TINYINT
    },
    inscrito_atual: {
        type: db.Sequelize.TINYINT
    },
    espera: {
        type: db.Sequelize.TINYINT
    },
    codigo: {
        type: db.Sequelize.INTEGER
    },
    presenca: {
        type: db.Sequelize.STRING
    },
    cancelado: {
        type: db.Sequelize.TINYINT
    }
})//IMPLEMENTAR DEMAIS CAMPOS FUTURAMENTE

//Criar a tabela
//Usuarios.sync({force: true})

module.exports = Usuarios