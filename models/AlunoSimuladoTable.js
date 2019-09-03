const db = require('./db')

const AlunoSimulado = db.sequelize.define('alunoSimulado', {
    idUser: {
        type: db.Sequelize.INTEGER
    },
    horaInicio: {
        type: db.Sequelize.STRING
    },
    horaFimMin: {
        type: db.Sequelize.STRING
    },
    horaFimMax: {
        type: db.Sequelize.STRING
    },
    horaEnvio: {
        type: db.Sequelize.STRING
    },
})

//Criar a tabela
//AlunoSimulado.sync({force: true})

module.exports = AlunoSimulado