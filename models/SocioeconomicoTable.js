const db = require('./db')

const Socioeconomico = db.sequelize.define('socioeconomico', {
    idUser: {
        type: db.Sequelize.INTEGER
    },
    qtd_pessoas: {
        type: db.Sequelize.STRING
    },
    qtd_filhos: {
        type: db.Sequelize.STRING
    },
    casa: {
        type: db.Sequelize.STRING
    },
    local_casa: {
        type: db.Sequelize.STRING
    },
    transporte: {
        type: db.Sequelize.STRING
    },
    escol_pai: {
        type: db.Sequelize.STRING
    },
    escol_mae: {
        type: db.Sequelize.STRING
    },
    trab_pai: {
        type: db.Sequelize.STRING
    },
    trab_mae: {
        type: db.Sequelize.STRING
    },
    trab_candidato: {
        type: db.Sequelize.STRING
    },
    pessoas_renda: {
        type: db.Sequelize.STRING
    },
    renda_total: {
        type: db.Sequelize.STRING
    },
    tv: {
        type: db.Sequelize.STRING
    },
    dvd: {
        type: db.Sequelize.STRING
    },
    radio: {
        type: db.Sequelize.STRING
    },
    pc: {
        type: db.Sequelize.STRING
    },
    automovel: {
        type: db.Sequelize.STRING
    },
    lava_roupa: {
        type: db.Sequelize.STRING
    },
    geladeira: {
        type: db.Sequelize.STRING
    },
    tel_fixo: {
        type: db.Sequelize.STRING
    },
    celular: {
        type: db.Sequelize.STRING
    },
    acesso_internet: {
        type: db.Sequelize.STRING
    },
    tv_ass: {
        type: db.Sequelize.STRING
    },
    lava_louca: {
        type: db.Sequelize.STRING
    },
    trab_atual: {
        type: db.Sequelize.STRING
    },
    trab_despesas: {
        type: db.Sequelize.STRING
    },
    trab_sustento: {
        type: db.Sequelize.STRING
    },
    trab_independente: {
        type: db.Sequelize.STRING
    },
    trab_experi: {
        type: db.Sequelize.STRING
    },
    trab_p_estudos: {
        type: db.Sequelize.STRING
    },
    trab_horas: {
        type: db.Sequelize.STRING
    },
    estuda_e_trab: {
        type: db.Sequelize.STRING
    },
    motivo_estudar: {
        type: db.Sequelize.STRING
    },
    eja: {
        type: db.Sequelize.STRING
    },
    eja_tipo: {
        type: db.Sequelize.STRING
    },
    tem_internet: {
        type: db.Sequelize.STRING
    },
    tem_computador: {
        type: db.Sequelize.STRING
    },
    acesso_internet: {
        type: db.Sequelize.STRING
    },
    jornal: {
        type: db.Sequelize.STRING
    },
    curso_lingua: {
        type: db.Sequelize.STRING
    },
    curso_info: {
        type: db.Sequelize.STRING
    },
    curso_prepara: {
        type: db.Sequelize.STRING
    },
    curso_tecnico: {
        type: db.Sequelize.STRING
    },
    curso_outro: {
        type: db.Sequelize.STRING
    },
    sites: {
        type: db.Sequelize.STRING
    },
    manuais: {
        type: db.Sequelize.STRING
    },
    ficcao: {
        type: db.Sequelize.STRING
    },
    saude: {
        type: db.Sequelize.STRING
    },
    religiao: {
        type: db.Sequelize.STRING
    },
    humor: {
        type: db.Sequelize.STRING
    },
    info_geral: {
        type: db.Sequelize.STRING
    },
    nao_ficcao: {
        type: db.Sequelize.STRING
    },
    estilo: {
        type: db.Sequelize.STRING
    },
    educa: {
        type: db.Sequelize.STRING
    },
    adolecente: {
        type: db.Sequelize.STRING
    },
    lazer: {
        type: db.Sequelize.STRING
    },
    cientifica: {
        type: db.Sequelize.STRING
    },
    aval_grupo: {
        type: db.Sequelize.STRING
    },
    aval_esporte: {
        type: db.Sequelize.STRING
    },
    aval_biblioteca: {
        type: db.Sequelize.STRING
    },
    aval_local: {
        type: db.Sequelize.STRING
    },
    aval_respeito: {
        type: db.Sequelize.STRING
    },
    aval_laboratorio: {
        type: db.Sequelize.STRING
    },
    aval_sala: {
        type: db.Sequelize.STRING
    },
    aval_lingua: {
        type: db.Sequelize.STRING
    },
    aval_interesse: {
        type: db.Sequelize.STRING
    },
    aval_ambiental: {
        type: db.Sequelize.STRING
    },
    aval_horario: {
        type: db.Sequelize.STRING
    },
    aval_segurancao: {
        type: db.Sequelize.STRING
    },
    aval_informatica: {
        type: db.Sequelize.STRING
    },
    aval_atencao: {
        type: db.Sequelize.STRING
    },
    aval_conhecimento_prof: {
        type: db.Sequelize.STRING
    },
    aval_dedica_prof: {
        type: db.Sequelize.STRING
    },
    aval_passeios: {
        type: db.Sequelize.STRING
    },
    aval_acessibilidade: {
        type: db.Sequelize.STRING
    }
    
})

//Criar a tabela
//Socioeconomico.sync({force: true})

module.exports = Socioeconomico