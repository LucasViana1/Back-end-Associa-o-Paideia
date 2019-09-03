const db = require('./db')

const Simulado = db.sequelize.define('simulados', {
    idUser: {
        type: db.Sequelize.INTEGER
    },
    modelo: {
        type: db.Sequelize.TINYINT
    },
    pergunta: {
        type: db.Sequelize.TINYINT
    },
    selecionado: {
        type: db.Sequelize.CHAR('1')
    },
    acertou: {
        type: db.Sequelize.CHAR('1')
    },

})

//Criar a tabela
//Simulado.sync({force: true})

module.exports = Simulado