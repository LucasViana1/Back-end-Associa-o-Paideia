const db = require('./db')

const Gabaritos = db.sequelize.define('gabaritos', {
    modelo: {
        type: db.Sequelize.TINYINT
    },
    materia: {
        type: db.Sequelize.STRING
    },
    pergunta: {
        type: db.Sequelize.TINYINT
    },
    enunciado: {
        type: db.Sequelize.TEXT
    },
    resp_a: {
        type: db.Sequelize.TEXT
    },
    resp_b: {
        type: db.Sequelize.TEXT
    },
    resp_c: {
        type: db.Sequelize.TEXT
    },
    resp_d: {
        type: db.Sequelize.TEXT
    },
    resp_e: {
        type: db.Sequelize.TEXT
    },
    correta: {
        type: db.Sequelize.CHAR('1')
    },
    img: {
        type: db.Sequelize.STRING
    }    

})

//Criar a tabela
//Gabaritos.sync({force: true})

module.exports = Gabaritos