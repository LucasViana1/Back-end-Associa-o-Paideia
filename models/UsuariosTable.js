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
        type: db.Sequelize.INTEGER
    }
})//IMPLEMENTAR DEMAIS CAMPOS FUTURAMENTE

//Criar a tabela
//Usuarios.sync({force: true})

module.exports = Usuarios