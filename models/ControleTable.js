const db = require('./db')

const Controle = db.sequelize.define('controle', {
    fim: {
        type: db.Sequelize.TINYINT
    }
})

//Criar a tabela
//Controle.sync({force: true})

module.exports = Controle