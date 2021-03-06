const express = require("express"); //servidor web (http)
const bodyparser = require("body-parser"); //le cabeçalho e converte dados
const cors = require("cors"); //permite acesso seguro a recursos de outros dominios/sites

const api = express(); //contem a instancia do express para inicialização
//const porta = 3000;//será escutado pelo "listener" do express
const router = express.Router(); //verbos do http (get,delete,post,put,etc) para requisições

const cadastraInscrito = require("./rotas/cadastraInscrito"); //talvez remover
const formInscricao = require("./rotas/formInscricao");
const listaInscritos = require("./rotas/listaInscritos");
const listaDetalhesInscrito = require("./rotas/listaDetalhesInscrito");
const listaDadosCompletos = require("./rotas/listaDadosCompletos");
const listaGabarito = require("./rotas/listaGabarito");
const perguntaSimulado = require("./rotas/perguntaSimulado");
const perguntaSimuladoQ1 = require("./rotas/perguntaSimuladoQ1");
const registrosTempo = require("./rotas/registrosTempo");
const respostasAlunoSimples = require("./rotas/respAlunoSimples");
const respostasAlunoCompleto = require("./rotas/respAlunoCompleto");
const simuladoAdmCompleto = require("./rotas/simuladoAdmCompleto");
const resultadoAlunoSimulado = require("./rotas/resultadoAlunoSimulado");

//"use" trabalha as requisições conforme a demanda
api.use(cors()); //trata requisições que não é da mesma origem que a API
api.use(
  bodyparser.urlencoded({
    extended: true,
  })
); //"urlencoded" recupe informações de formularios(por exemplo) e os converte
api.use(
  bodyparser.json({
    limit: "20mb",
    extended: true,
  })
); //limita tamanho dos arquivos enviados (imagem,video,etc)

//quando requisitada a rota raiz
//req -> requisição; resp -> resposta; arrow function (=>)
//resp.json envia a resposta ao cliente com um objeto json definido como parametro
router.get("/", (req, resp) =>
  resp.json({
    mensagem: "API em execução...",
  })
);
const insereInscricao = require("./models/InscritosTable");
const insereArquivo = require("./models/ArquivosTable");
const insereUsuario = require("./models/UsuariosTable"); //insere ou pesquisa usuario
const candidatoTable = require("./models/CandidatoTable");
const socioeconomicoTable = require("./models/SocioeconomicoTable");
const estudosTable = require("./models/EstudosTable");
const valoresTable = require("./models/ValoresTable");
const arquivosTable = require("./models/ArquivosTable");
const controleTable = require("./models/ControleTable");
const gabaritoTable = require("./models/GabaritosTable");
const simuladoTable = require("./models/SimuladoTable");
const resultadoSimuladoTable = require("./models/ResultadoSimuladoTable");
const alunosimuladoTable = require("./models/AlunoSimuladoTable");

const operacoes = require("./model/Operacoes");

//trata envio de arquivos, definindo suas configurações
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage,
});

//INSERE INSCRIÇÃO NO BANCO, MUDAR ESSA LINHA PARA PASTA DEDICADA A ROTAS! :
//POSSIVELMENTE REMOVER ESSE TRECHO!
api.post("/enviaInscricao", upload.single("rgFile"), function (req, res) {
  var fs = require("fs");

  function base64_encode(file) {
    // ler dados binários
    var bitmap = fs.readFileSync(file);
    // converter dados binários em string codificada na base64
    return new Buffer(bitmap).toString("base64");
  }
  var base64str = base64_encode(req.body);
  //console.log(req);
  //console.log(req.body);
  console.log(base64str);
  //var nomeArquivoRG = req.file.filename;
  //console.log(nomeArquivoRG)

  //insere dados no banco
  /*insereInscricao.create({
        nome: req.body.nome,
		email: req.body.email,
        senha: req.body.senha
    }).then(function(){
        //res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
        //res.send("Pagamento cadastro com sucesso!")
    }).catch(function(erro){
        res.send("Erro: " + erro)
    })*/

  /*const base64img =  require('base64-img');
    base64img.base64('./teste.png', function(err, data) {
        console.log(data);
    })*/
  //POSTERIORMENTE IMPLEMENTAR FORMA DE SALVAR BASE64 DAS IMAGENS NO BANCO E APAGA-LAS DA PASTA DE UPLOADS

  /*insereArquivo.create({
		email: req.body.email,
		rg: nomeArquivoRG
    }).then(function(){
        res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
        //res.send("Pagamento cadastro com sucesso!")
    }).catch(function(erro){
        res.send("Erro: " + erro)
    })*/
});

const mail = require("./email/ServicoEmail");

//console.log(Math.floor(Math.random() * 99999))

//CADASTRA NOVO USUARIO
api.post("/cadastraUser", function (req, res) {
  //impede que seja inserido duplicatas, talvez add mais um parametro de verificação
  //para quando implementar logica de usuario que ja possui cadastro tentar se cadastrar novamente
  insereUsuario
    .findAll({
      where: {
        //nome: req.body.nome,
        //sobrenome: req.body.sobrenome,
        email: req.body.email,
        //senha: req.body.senha,
      },
    })
    .then(function (dados) {
      if (dados == "") {
        var codigoRandom = Math.floor(Math.random() * 99999);
        //insere usuario no banco
        insereUsuario
          .create({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email: req.body.email,
            senha: req.body.senha,
            adm: 0,
            ativo: 0,
            inscrito_atual: 0,
            codigo: codigoRandom,
          })
          .then(function () {
            //res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
            //res.send("Pagamento cadastro com sucesso!")
          })
          .catch(function (erro) {
            res.send("Erro: " + erro);
          });
        mail.cadastroMail(
          req.body.email,
          req.body.senha,
          req.body.nome,
          codigoRandom
        );
        res.send("cadastro ok!");
      } else {
        //requisição duplicada ou tentativa de segundo cadastro por parte do usuário
        res.send("cadastro duplicado!");
      }
    });
});
//CADASTRA DADOS PESSOAIS DO CANDIDATO
api.post("/insereDadosPessoais", function (req, res) {
  console.log("data inserida: " + req.body.data_nasc);

  candidatoTable
    .findAll({
      where: {
        idUser: req.body.idUser,
      },
    })
    .then(function (dados) {
      if (dados == "") {
        //insere usuario no banco
        candidatoTable
          .create({
            idUser: req.body.idUser,
            nome_completo: req.body.nome_completo,
            data_nasc: req.body.data_nasc,
            cidade_nasc: req.body.cidade_nasc,
            estado_nasc: req.body.estado_nasc,
            tel1: req.body.tel1,
            tel2: req.body.tel2,
            cpf: req.body.cpf,
            rg: req.body.rg,
            cidadao: req.body.cidadao,
            curso_desejado: req.body.curso_desejado,
          })
          .then(function () {})
          .catch(function (erro) {
            res.send("Erro: " + erro);
          });
      } else {
        //ja possui registro na tabela para esse ID de usuario: UPDATE
        candidatoTable.update(
          {
            idUser: req.body.idUser,
            nome_completo: req.body.nome_completo,
            data_nasc: req.body.data_nasc,
            cidade_nasc: req.body.cidade_nasc,
            estado_nasc: req.body.estado_nasc,
            tel1: req.body.tel1,
            tel2: req.body.tel2,
            cpf: req.body.cpf,
            rg: req.body.rg,
            cidadao: req.body.cidadao,
          },
          {
            where: {
              idUser: req.body.idUser,
            },
          }
        );
      }
    });
});
//CADASTRA DADOS SOCIOECONOMICOS DO CANDIDATO (ATUALIZADO!!!)
api.post("/insereDadosSocioeconomicos", function (req, res) {
  socioeconomicoTable
    .findAll({
      where: {
        idUser: req.body.idUser,
      },
    })
    .then(function (dados) {
      if (dados == "") {
        //insere socioeconomico no banco
        socioeconomicoTable
          .create({
            idUser: req.body.idUser,
            sexo: req.body.sexo,
            idade: req.body.idade,
            mora_tempo: req.body.mora_tempo,
            local: req.body.local,
            mora_pessoas_qtd: req.body.mora_pessoas_qtd,
            mora_tipo: req.body.mora_tipo,
            trab_candidato: req.body.trab_candidato,
            trab_pais: req.body.trab_pais,
            fundamental: req.body.fundamental,
            medio: req.body.medio,
            ler: req.body.ler,
            ler_qtd: req.body.ler_qtd,
            informado: req.body.informado,
            internet: req.body.internet,
            fez_vestibular: req.body.fez_vestibular,
            trab_estudo: req.body.trab_estudo,
            motivo_estudar: req.body.motivo_estudar,
            transporte: req.body.transporte,
            // checkbox
            televisao_atividade: req.body.televisao_atividade,
            musica_atividade: req.body.musica_atividade,
            cinema_atividade: req.body.cinema_atividade,
            leitura_atividade: req.body.leitura_atividade,
            internet_atividade: req.body.internet_atividade,
            esporte_atividade: req.body.esporte_atividade,
            nenhuma_atividade: req.body.nenhuma_atividade,
            // checkbox
            mora_pessoas_perentesco_sozinho:
              req.body.mora_pessoas_perentesco_sozinho,
            mora_pessoas_perentesco_pai: req.body.mora_pessoas_perentesco_pai,
            mora_pessoas_perentesco_mae: req.body.mora_pessoas_perentesco_mae,
            mora_pessoas_perentesco_esposo:
              req.body.mora_pessoas_perentesco_esposo,
            mora_pessoas_perentesco_avo: req.body.mora_pessoas_perentesco_avo,
            mora_pessoas_perentesco_amigo:
              req.body.mora_pessoas_perentesco_amigo,
          })
          .then(function () {
            //res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
            //res.send("Pagamento cadastro com sucesso!")
          })
          .catch(function (erro) {
            res.send("Erro: " + erro);
          });
      } else {
        //ja possui registro na tabela para esse ID de usuario: UPDATE
        socioeconomicoTable.update(
          {
            idUser: req.body.idUser,
            sexo: req.body.sexo,
            idade: req.body.idade,
            mora_tempo: req.body.mora_tempo,
            local: req.body.local,
            mora_pessoas_qtd: req.body.mora_pessoas_qtd,
            mora_tipo: req.body.mora_tipo,
            trab_candidato: req.body.trab_candidato,
            trab_pais: req.body.trab_pais,
            fundamental: req.body.fundamental,
            medio: req.body.medio,
            ler: req.body.ler,
            ler_qtd: req.body.ler_qtd,
            informado: req.body.informado,
            internet: req.body.internet,
            fez_vestibular: req.body.fez_vestibular,
            trab_estudo: req.body.trab_estudo,
            motivo_estudar: req.body.motivo_estudar,
            transporte: req.body.transporte,
            // checkbox
            televisao_atividade: req.body.televisao_atividade,
            musica_atividade: req.body.musica_atividade,
            cinema_atividade: req.body.cinema_atividade,
            leitura_atividade: req.body.leitura_atividade,
            internet_atividade: req.body.internet_atividade,
            esporte_atividade: req.body.esporte_atividade,
            nenhuma_atividade: req.body.nenhuma_atividade,
            // checkbox
            mora_pessoas_perentesco_sozinho:
              req.body.mora_pessoas_perentesco_sozinho,
            mora_pessoas_perentesco_pai: req.body.mora_pessoas_perentesco_pai,
            mora_pessoas_perentesco_mae: req.body.mora_pessoas_perentesco_mae,
            mora_pessoas_perentesco_esposo:
              req.body.mora_pessoas_perentesco_esposo,
            mora_pessoas_perentesco_avo: req.body.mora_pessoas_perentesco_avo,
            mora_pessoas_perentesco_amigo:
              req.body.mora_pessoas_perentesco_amigo,
          },
          {
            where: {
              idUser: req.body.idUser,
            },
          }
        );
      }
    });

  //busca tabela de usuarios atraves do id, ULTIMO FORMULARIO DE PREENCHIMENTO (ATUALIZAR IMPLEMENTAÇÃO ABAIXO)
  insereUsuario
    .findAll({
      where: {
        id: req.body.idUser,
      },
    })
    .then(function (dados) {
      if (dados == "") {
        res.send("Nenhum registro encontrado!");
      } else {
        //TESTE DE RETORNO DE NUMERO DE INSCRITOS
        var qtd = 0;
        operacoes.getQtdInscritos(function (error, retorno) {
          //console.log("retorno: "+retorno[0].id)
          retorno.forEach((element) => {
            console.log("retorno: " + element.cancelado);
            if (element.cancelado == null) {
              qtd++;
            }
          });
          console.log("total: " + qtd);

          var retornoString = JSON.parse(JSON.stringify(dados));
          console.log("dados encontrados: " + retornoString[0].email);
          console.log("Retorno String: " + retornoString[0].id);
          console.log("qtd inscritos: " + qtd);
          let matricula = parseInt(retornoString[0].id);
          matricula = matricula + 1935;
          //79 ou 84
          if (qtd <= 84) {
            // if(qtd <= 79){
            //lista regular: email lista regular, "inscrito_atual" = 1, "espera" = 0
            insereUsuario.update(
              {
                inscrito_atual: 1,
                espera: 0,
                matricula: matricula,
              },
              {
                where: {
                  id: req.body.idUser,
                },
              }
            );

            //envia email, inscritos 2018/2019: 238, inscritos antes 2018: 1697, total inscritos anteriores a 2 sem 2019:
            mail.listaRegularMail(
              retornoString[0].email,
              retornoString[0].nome,
              matricula
            );
            //console.log("Numero de matricula: "+matricula)
          }
          //3 (80) regular, 2 (40) espera, 5 (120) total (TESTE EM HOMOLOGAÇÃO)
          //79 (2) ou 84, 119 (4)
          else if (qtd > 84 && qtd <= 119) {
            // else if(qtd > 79 && qtd <= 119){
            //lista de espera: email lista espera, "inscrito_atual" = 1, "espera" = 1
            insereUsuario.update(
              {
                inscrito_atual: 1,
                espera: 1,
                matricula: matricula,
              },
              {
                where: {
                  id: req.body.idUser,
                },
              }
            );
            //envia email
            mail.listaEsperaMail(
              retornoString[0].email,
              retornoString[0].nome,
              matricula
            );

            //se for o 120º candidato, tabela "controle" é marcada e as inscrições são travadas
            //119 (4)
            if (qtd == 119) {
              controleTable.update(
                {
                  fim: 1,
                },
                {
                  where: {
                    id: 1,
                  },
                }
              );
            }
          } else {
            //impede que exceda 120 inscritos
            mail.listaCheiaMail(retornoString[0].email, retornoString[0].nome);
          }
        });

        // DEPOIS REMOVER O COMENTARIO ABAIXO:
        // mail.finalizaInscricaoMail(retornoString[0].email, retornoString[0].nome)
      } //fim else
    })
    .catch(function (erro) {
      res.send("Erro encontrado: " + erro);
    });
});
//CADASTRA DADOS SOCIOECONOMICOS DO CANDIDATO (ANTIGO 2019)
// api.post('/insereDadosSocioeconomicos', function(req,res){

//     socioeconomicoTable.findAll({
//         where: {
//             idUser: req.body.idUser,
//         }
//     }).then(function(dados){
//         if(dados == ''){
//             //insere socioeconomico no banco
//             socioeconomicoTable.create({
//                 idUser: req.body.idUser,
//                 qtd_pessoas: req.body.qtd_pessoas,
//                 qtd_filhos: req.body.qtd_filhos,
//                 casa: req.body.casa,
//                 local_casa: req.body.local_casa,
//                 transporte: req.body.transporte,
//                 escol_pai: req.body.escol_pai,
//                 escol_mae: req.body.escol_mae,
//                 trab_pai: req.body.trab_pai,
//                 trab_mae: req.body.trab_mae,
//                 trab_candidato: req.body.trab_candidato,
//                 pessoas_renda: req.body.pessoas_renda,
//                 renda_total: req.body.renda_total,

//                 tv: req.body.tv,
//                 dvd: req.body.dvd,
//                 radio: req.body.radio,
//                 pc: req.body.pc,
//                 automovel: req.body.automovel,
//                 lava_roupa: req.body.lava_roupa,
//                 geladeira: req.body.geladeira,
//                 tel_fixo: req.body.tel_fixo,
//                 celular: req.body.celular,
//                 acesso_internet: req.body.acesso_internet,
//                 tv_ass: req.body.tv_ass,
//                 lava_louca: req.body.lava_louca,

//                 trab_atual: req.body.trab_atual,
//                 trab_despesas: req.body.trab_despesas,
//                 trab_sustento: req.body.trab_sustento,
//                 trab_independente: req.body.trab_independente,
//                 trab_experi: req.body.trab_experi,
//                 trab_p_estudos: req.body.trab_p_estudos,

//                 trab_horas: req.body.trab_horas,
//                 estuda_e_trab: req.body.estuda_e_trab,
//                 motivo_estudar: req.body.motivo_estudar,
//                 eja: req.body.eja,
//                 eja_tipo: req.body.eja_tipo,
//                 tem_internet: req.body.tem_internet,
//                 //tem_computador: req.body.tem_computador,
//                 acesso_internet: req.body.acesso_internet,

//                 curso_lingua: req.body.curso_lingua,
//                 curso_info: req.body.curso_info,
//                 curso_prepara: req.body.curso_prepara,
//                 curso_tecnico: req.body.curso_tecnico,
//                 curso_outro: req.body.curso_outro,

//                 jornal: req.body.jornal,
//                 sites: req.body.sites,
//                 manuais: req.body.manuais,
//                 ficcao: req.body.ficcao,
//                 saude: req.body.saude,
//                 religiao: req.body.religiao,
//                 humor: req.body.humor,
//                 info_geral: req.body.info_geral,
//                 nao_ficcao: req.body.nao_ficcao,
//                 estilo: req.body.estilo,
//                 educa: req.body.educa,
//                 adolecente: req.body.adolecente,
//                 lazer: req.body.lazer,
//                 cientifica: req.body.cientifica,

//                 aval_grupo: req.body.aval_grupo,
//                 aval_esporte: req.body.aval_esporte,
//                 aval_biblioteca: req.body.aval_biblioteca,
//                 aval_local: req.body.aval_local,
//                 aval_respeito: req.body.aval_respeito,
//                 aval_laboratorio: req.body.aval_laboratorio,
//                 aval_sala: req.body.aval_sala,
//                 aval_lingua: req.body.aval_lingua,
//                 aval_interesse: req.body.aval_interesse,
//                 aval_ambiental: req.body.aval_ambiental,
//                 aval_horario: req.body.aval_horario,
//                 aval_segurancao: req.body.aval_segurancao,
//                 aval_informatica: req.body.aval_informatica,
//                 aval_atencao: req.body.aval_atencao,

//                 aval_conhecimento_prof: req.body.aval_conhecimento_prof,
//                 aval_dedica_prof: req.body.aval_dedica_prof,
//                 aval_passeios: req.body.aval_passeios,
//                 aval_acessibilidade: req.body.aval_acessibilidade,

//             }).then(function(){
//                 //res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
//                 //res.send("Pagamento cadastro com sucesso!")
//             }).catch(function(erro){
//                 res.send("Erro: " + erro)
//             })

//         } else{
//             //ja possui registro na tabela para esse ID de usuario: UPDATE
//             socioeconomicoTable.update({
//                 idUser: req.body.idUser,
//                 qtd_pessoas: req.body.qtd_pessoas,
//                 qtd_filhos: req.body.qtd_filhos,
//                 casa: req.body.casa,
//                 local_casa: req.body.local_casa,
//                 transporte: req.body.transporte,
//                 escol_pai: req.body.escol_pai,
//                 escol_mae: req.body.escol_mae,
//                 trab_pai: req.body.trab_pai,
//                 trab_mae: req.body.trab_mae,
//                 trab_candidato: req.body.trab_candidato,
//                 pessoas_renda: req.body.pessoas_renda,
//                 renda_total: req.body.renda_total,

//                 tv: req.body.tv,
//                 dvd: req.body.dvd,
//                 radio: req.body.radio,
//                 pc: req.body.pc,
//                 automovel: req.body.automovel,
//                 lava_roupa: req.body.lava_roupa,
//                 geladeira: req.body.geladeira,
//                 tel_fixo: req.body.tel_fixo,
//                 celular: req.body.celular,
//                 acesso_internet: req.body.acesso_internet,
//                 tv_ass: req.body.tv_ass,
//                 lava_louca: req.body.lava_louca,

//                 trab_atual: req.body.trab_atual,
//                 trab_despesas: req.body.trab_despesas,
//                 trab_sustento: req.body.trab_sustento,
//                 trab_independente: req.body.trab_independente,
//                 trab_experi: req.body.trab_experi,
//                 trab_p_estudos: req.body.trab_p_estudos,

//                 trab_horas: req.body.trab_horas,
//                 estuda_e_trab: req.body.estuda_e_trab,
//                 motivo_estudar: req.body.motivo_estudar,
//                 eja: req.body.eja,
//                 eja_tipo: req.body.eja_tipo,
//                 tem_internet: req.body.tem_internet,
//                 //tem_computador: req.body.tem_computador,
//                 acesso_internet: req.body.acesso_internet,

//                 curso_lingua: req.body.curso_lingua,
//                 curso_info: req.body.curso_info,
//                 curso_prepara: req.body.curso_prepara,
//                 curso_tecnico: req.body.curso_tecnico,
//                 curso_outro: req.body.curso_outro,

//                 jornal: req.body.jornal,
//                 sites: req.body.sites,
//                 manuais: req.body.manuais,
//                 ficcao: req.body.ficcao,
//                 saude: req.body.saude,
//                 religiao: req.body.religiao,
//                 humor: req.body.humor,
//                 info_geral: req.body.info_geral,
//                 nao_ficcao: req.body.nao_ficcao,
//                 estilo: req.body.estilo,
//                 educa: req.body.educa,
//                 adolecente: req.body.adolecente,
//                 lazer: req.body.lazer,
//                 cientifica: req.body.cientifica,

//                 aval_grupo: req.body.aval_grupo,
//                 aval_esporte: req.body.aval_esporte,
//                 aval_biblioteca: req.body.aval_biblioteca,
//                 aval_local: req.body.aval_local,
//                 aval_respeito: req.body.aval_respeito,
//                 aval_laboratorio: req.body.aval_laboratorio,
//                 aval_sala: req.body.aval_sala,
//                 aval_lingua: req.body.aval_lingua,
//                 aval_interesse: req.body.aval_interesse,
//                 aval_ambiental: req.body.aval_ambiental,
//                 aval_horario: req.body.aval_horario,
//                 aval_segurancao: req.body.aval_segurancao,
//                 aval_informatica: req.body.aval_informatica,
//                 aval_atencao: req.body.aval_atencao,

//                 aval_conhecimento_prof: req.body.aval_conhecimento_prof,
//                 aval_dedica_prof: req.body.aval_dedica_prof,
//                 aval_passeios: req.body.aval_passeios,
//                 aval_acessibilidade: req.body.aval_acessibilidade,

//             },{
//                 where: {
//                     idUser: req.body.idUser,
//                 }
//             });
//         }
//     })

// })
//CADASTRA DADOS ESTUDOS E FORMAÇÃO
api.post("/insereDadosEstudos", function (req, res) {
  estudosTable
    .findAll({
      where: {
        idUser: req.body.idUser,
      },
    })
    .then(function (dados) {
      if (dados == "") {
        //insere estudos/formacao usuario no banco
        estudosTable
          .create({
            idUser: req.body.idUser,
            ensino_fundamental: req.body.ensino_fundamental,
            conclusao_fundamental: req.body.conclusao_fundamental,
            ensino_medio: req.body.ensino_medio,
            conclusao_medio: req.body.conclusao_medio,
            turno_medio: req.body.turno_medio,
            ano_medio: req.body.ano_medio,
            tecnico: req.body.tecnico,
            fez_cursinho: req.body.fez_cursinho,
            tipo_cursinho: req.body.tipo_cursinho,
            cursinho_particular: req.body.cursinho_particular,
            fez_vestibular: req.body.fez_vestibular,
            superior: req.body.superior,
            //area_desejo: req.body.area_desejo,
            biologica: req.body.biologica,
            exatas: req.body.exatas,
            humanas: req.body.humanas,
            curso_univ1: req.body.curso_univ1,
            curso_univ2: req.body.curso_univ2,
            curso_univ3: req.body.curso_univ3,
            fuvest: req.body.fuvest,
            comvest: req.body.comvest,
            vunesp: req.body.vunesp,
            enem: req.body.enem,
            fatec: req.body.fatec,
            outro_curso_uni: req.body.outro_curso_uni,
          })
          .then(function () {
            //res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
            //res.send("Pagamento cadastro com sucesso!")
          })
          .catch(function (erro) {
            res.send("Erro: " + erro);
          });
      } else {
        //ja possui registro na tabela para esse ID de usuario: UPDATE
        estudosTable.update(
          {
            idUser: req.body.idUser,
            ensino_fundamental: req.body.ensino_fundamental,
            conclusao_fundamental: req.body.conclusao_fundamental,
            ensino_medio: req.body.ensino_medio,
            conclusao_medio: req.body.conclusao_medio,
            turno_medio: req.body.turno_medio,
            ano_medio: req.body.ano_medio,
            tecnico: req.body.tecnico,
            fez_cursinho: req.body.fez_cursinho,
            tipo_cursinho: req.body.tipo_cursinho,
            cursinho_particular: req.body.cursinho_particular,
            fez_vestibular: req.body.fez_vestibular,
            superior: req.body.superior,
            //area_desejo: req.body.area_desejo,
            biologica: req.body.biologica,
            exatas: req.body.exatas,
            humanas: req.body.humanas,
            curso_univ1: req.body.curso_univ1,
            curso_univ2: req.body.curso_univ2,
            curso_univ3: req.body.curso_univ3,
            fuvest: req.body.fuvest,
            comvest: req.body.comvest,
            vunesp: req.body.vunesp,
            enem: req.body.enem,
            fatec: req.body.fatec,
          },
          {
            where: {
              idUser: req.body.idUser,
            },
          }
        );
      }
    });
});

//TESTANDO O RETORNO DA QUANTIDADE DE ALUNOS
/*const qtdIncritos = require('./qtdIncritos')
var teste = qtdIncritos.getTodos()
console.log("total real: "+teste)*/

//CADASTRA VALORES
api.post("/insereDadosValores", function (req, res) {
  valoresTable
    .findAll({
      where: {
        idUser: req.body.idUser,
      },
    })
    .then(function (dadosVerifica) {
      if (dadosVerifica == "") {
        //insere valores no banco
        valoresTable
          .create({
            idUser: req.body.idUser,
            racista: req.body.racista,
            parente: req.body.parente,
            amigo: req.body.amigo,
            vizinho: req.body.vizinho,
            prof: req.body.prof,
            pessoa: req.body.pessoa,

            sofreu_econo: req.body.sofreu_econo,
            sofreu_etnica: req.body.sofreu_etnica,
            sofreu_genero: req.body.sofreu_genero,
            sofreu_lgbt: req.body.sofreu_lgbt,
            sofreu_religiao: req.body.sofreu_religiao,

            sofreu_sem_religiao: req.body.sofreu_sem_religiao,
            sofreu_origem: req.body.sofreu_origem,
            sofreu_idade: req.body.sofreu_idade,
            sofreu_deficiencia: req.body.sofreu_deficiencia,
            sofreu_aparencia: req.body.sofreu_aparencia,
            sofreu_moradia: req.body.sofreu_moradia,

            pre_econo: req.body.pre_econo,
            pre_etnica: req.body.pre_etnica,
            pre_mulher: req.body.pre_mulher,
            pre_lgbt: req.body.pre_lgbt,

            pre_religiosa: req.body.pre_religiosa,
            pre_origem: req.body.pre_origem,
            pre_sem_religiao: req.body.pre_sem_religiao,
            pre_jovens: req.body.pre_jovens,
            pre_idosos: req.body.pre_idosos,
            pre_deficiencia: req.body.pre_deficiencia,
            pre_fisica: req.body.pre_fisica,
            pre_moradia: req.body.pre_moradia,
          })
          .then(function () {
            //res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
            //res.send("Pagamento cadastro com sucesso!")
          })
          .catch(function (erro) {
            res.send("Erro: " + erro);
          });

        //busca tabela de usuarios atraves do id
        insereUsuario
          .findAll({
            where: {
              id: req.body.idUser,
            },
          })
          .then(function (dados) {
            if (dados == "") {
              res.send("Nenhum registro encontrado!");
            } else {
              //TESTE DE RETORNO DE NUMERO DE INSCRITOS
              var qtd = 0;
              operacoes.getQtdInscritos(function (error, retorno) {
                //console.log("retorno: "+retorno[0].id)
                retorno.forEach((element) => {
                  console.log("retorno: " + element.cancelado);
                  if (element.cancelado == null) {
                    qtd++;
                  }
                });
                console.log("total: " + qtd);

                var retornoString = JSON.parse(JSON.stringify(dados));
                console.log("dados encontrados: " + retornoString[0].email);
                console.log("Retorno String: " + retornoString[0].id);
                console.log("qtd inscritos: " + qtd);
                let matricula = parseInt(retornoString[0].id);
                matricula = matricula + 1935;
                //79 ou 84
                if (qtd <= 84) {
                  // if(qtd <= 79){
                  //lista regular: email lista regular, "inscrito_atual" = 1, "espera" = 0
                  insereUsuario.update(
                    {
                      inscrito_atual: 1,
                      espera: 0,
                      matricula: matricula,
                    },
                    {
                      where: {
                        id: req.body.idUser,
                      },
                    }
                  );

                  //envia email, inscritos 2018/2019: 238, inscritos antes 2018: 1697, total inscritos anteriores a 2 sem 2019:
                  mail.listaRegularMail(
                    retornoString[0].email,
                    retornoString[0].nome,
                    matricula
                  );
                  //console.log("Numero de matricula: "+matricula)
                }
                //3 (80) regular, 2 (40) espera, 5 (120) total (TESTE EM HOMOLOGAÇÃO)
                //79 (2) ou 84, 119 (4)
                else if (qtd > 84 && qtd <= 119) {
                  // else if(qtd > 79 && qtd <= 119){
                  //lista de espera: email lista espera, "inscrito_atual" = 1, "espera" = 1
                  insereUsuario.update(
                    {
                      inscrito_atual: 1,
                      espera: 1,
                      matricula: matricula,
                    },
                    {
                      where: {
                        id: req.body.idUser,
                      },
                    }
                  );
                  //envia email
                  mail.listaEsperaMail(
                    retornoString[0].email,
                    retornoString[0].nome,
                    matricula
                  );

                  //se for o 120º candidato, tabela "controle" é marcada e as inscrições são travadas
                  //119 (4)
                  if (qtd == 119) {
                    controleTable.update(
                      {
                        fim: 1,
                      },
                      {
                        where: {
                          id: 1,
                        },
                      }
                    );
                  }
                } else {
                  //impede que exceda 120 inscritos
                  mail.listaCheiaMail(
                    retornoString[0].email,
                    retornoString[0].nome
                  );
                }
              });

              // DEPOIS REMOVER O COMENTARIO ABAIXO:
              // mail.finalizaInscricaoMail(retornoString[0].email, retornoString[0].nome)
            } //fim else
          })
          .catch(function (erro) {
            res.send("Erro encontrado: " + erro);
          });
      } else {
        //ja possui o registro inserido recentemente no banco de dados
        console.log(dadosVerifica);
      }
    });
});
//CADASTRA ARQUIVOS DO CANDIDATO
api.post("/insereDadosArquivos", function (req, res) {
  //melhorar esse trecho de inserção de multiplos registros

  arquivosTable
    .findAll({
      where: {
        idUser: req.body.idUser,
        tipo: "FOTO",
      },
    })
    .then(function (dados) {
      if (dados == "") {
        //caso não exista duplicata
        //inserir foto
        if (req.body.foto != null && req.body.foto != "") {
          arquivosTable
            .create({
              idUser: req.body.idUser,
              tipo: "FOTO",
              arquivo: req.body.foto,
            })
            .then(function () {
              //console.log("AQUI: "+req.body.foto)
            })
            .catch(function (erro) {
              res.send("Erro: " + erro);
            });
        }
      } else {
        //caso já exista registro antigo
        arquivosTable.update(
          {
            idUser: req.body.idUser,
            tipo: "FOTO",
            arquivo: req.body.foto,
          },
          {
            where: {
              idUser: req.body.idUser,
              tipo: "FOTO",
            },
          }
        );
      }
    });

  arquivosTable
    .findAll({
      where: {
        idUser: req.body.idUser,
        tipo: "RG",
      },
    })
    .then(function (dados) {
      if (dados == "") {
        //caso não exista duplicata
        //inserir rg OBRIGATORIO (NUNCA NULO)
        arquivosTable
          .create({
            idUser: req.body.idUser,
            tipo: "RG",
            arquivo: req.body.rgCandidato,
          })
          .then(function () {
            //res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
            //res.send("Pagamento cadastro com sucesso!")
          })
          .catch(function (erro) {
            res.send("Erro: " + erro);
          });
      } else {
        arquivosTable.update(
          {
            idUser: req.body.idUser,
            tipo: "RG",
            arquivo: req.body.rgCandidato,
          },
          {
            where: {
              idUser: req.body.idUser,
              tipo: "RG",
            },
          }
        );
      }
    });

  arquivosTable
    .findAll({
      where: {
        idUser: req.body.idUser,
        tipo: "CPF",
      },
    })
    .then(function (dados) {
      if (dados == "") {
        //caso não exista duplicata
        //inserir cpf OBRIGATORIO (NUNCA NULO)
        arquivosTable
          .create({
            idUser: req.body.idUser,
            tipo: "CPF",
            arquivo: req.body.cpfCandidato,
          })
          .then(function () {
            //res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
            //res.send("Pagamento cadastro com sucesso!")
          })
          .catch(function (erro) {
            res.send("Erro: " + erro);
          });
      } else {
        //ja possui o registro inserido recentemente no banco de dados
        arquivosTable.update(
          {
            idUser: req.body.idUser,
            tipo: "CPF",
            arquivo: req.body.cpfCandidato,
          },
          {
            where: {
              idUser: req.body.idUser,
              tipo: "CPF",
            },
          }
        );
      }
    });

  arquivosTable
    .findAll({
      where: {
        idUser: req.body.idUser,
        tipo: "HISTORICO",
      },
    })
    .then(function (dados) {
      if (dados == "") {
        //caso não exista duplicata
        //inserir historico OBRIGATORIO (NUNCA NULO)
        arquivosTable
          .create({
            idUser: req.body.idUser,
            tipo: "HISTORICO",
            arquivo: req.body.historico,
          })
          .then(function () {
            /*vazio */
          })
          .catch(function (erro) {
            res.send("Erro: " + erro);
          });
      } else {
        //ja possui o registro inserido recentemente no banco de dados
        arquivosTable.update(
          {
            idUser: req.body.idUser,
            tipo: "HISTORICO",
            arquivo: req.body.historico,
          },
          {
            where: {
              idUser: req.body.idUser,
              tipo: "HISTORICO",
            },
          }
        );
      }
    });

  arquivosTable
    .findAll({
      where: {
        idUser: req.body.idUser,
        tipo: "BOLSA",
      },
    })
    .then(function (dados) {
      if (dados == "") {
        //caso não exista duplicata
        //inserir bolsa
        if (req.body.bolsa != null && req.body.bolsa != "") {
          arquivosTable
            .create({
              idUser: req.body.idUser,
              tipo: "BOLSA",
              arquivo: req.body.bolsa,
            })
            .then(function () {})
            .catch(function (erro) {
              res.send("Erro: " + erro);
            });
        }
      } else {
        //ja possui o registro inserido recentemente no banco de dados
        arquivosTable.update(
          {
            idUser: req.body.idUser,
            tipo: "BOLSA",
            arquivo: req.body.bolsa,
          },
          {
            where: {
              idUser: req.body.idUser,
              tipo: "BOLSA",
            },
          }
        );
      }
    });

  arquivosTable
    .findAll({
      where: {
        idUser: req.body.idUser,
        tipo: "EJA",
      },
    })
    .then(function (dados) {
      if (dados == "") {
        //caso não exista duplicata
        //inserir eja
        if (req.body.eja != null && req.body.eja != "") {
          arquivosTable
            .create({
              idUser: req.body.idUser,
              tipo: "EJA",
              arquivo: req.body.eja,
            })
            .then(function () {})
            .catch(function (erro) {
              res.send("Erro: " + erro);
            });
        }
      } else {
        //ja possui o registro inserido recentemente no banco de dados
        arquivosTable.update(
          {
            idUser: req.body.idUser,
            tipo: "EJA",
            arquivo: req.body.eja,
          },
          {
            where: {
              idUser: req.body.idUser,
              tipo: "EJA",
            },
          }
        );
      }
    });

  arquivosTable
    .findAll({
      where: {
        idUser: req.body.idUser,
        tipo: "MEDICO",
      },
    })
    .then(function (dados) {
      if (dados == "") {
        //caso não exista duplicata
        //inserir medico
        if (req.body.medico != null && req.body.medico != "") {
          arquivosTable
            .create({
              idUser: req.body.idUser,
              tipo: "MEDICO",
              arquivo: req.body.medico,
            })
            .then(function () {})
            .catch(function (erro) {
              res.send("Erro: " + erro);
            });
        }
      } else {
        //ja possui o registro inserido recentemente no banco de dados
        arquivosTable.update(
          {
            idUser: req.body.idUser,
            tipo: "MEDICO",
            arquivo: req.body.medico,
          },
          {
            where: {
              idUser: req.body.idUser,
              tipo: "MEDICO",
            },
          }
        );
      }
    });

  arquivosTable
    .findAll({
      where: {
        idUser: req.body.idUser,
        tipo: "ENDERECO",
      },
    })
    .then(function (dados) {
      if (dados == "") {
        //caso não exista duplicata
        //inserir endereco OBRIGATORIO (NUNCA NULO)
        arquivosTable
          .create({
            idUser: req.body.idUser,
            tipo: "ENDERECO",
            arquivo: req.body.endereco,
          })
          .then(function () {})
          .catch(function (erro) {
            res.send("Erro: " + erro);
          });
      } else {
        //ja possui o registro inserido recentemente no banco de dados
        arquivosTable.update(
          {
            idUser: req.body.idUser,
            tipo: "ENDERECO",
            arquivo: req.body.endereco,
          },
          {
            where: {
              idUser: req.body.idUser,
              tipo: "ENDERECO",
            },
          }
        );
      }
    });

  arquivosTable
    .findAll({
      where: {
        idUser: req.body.idUser,
        tipo: "CIDADAO",
      },
    })
    .then(function (dados) {
      if (dados == "") {
        //caso não exista duplicata
        //inserir cidadao OBRIGATORIO (NUNCA NULO)
        arquivosTable
          .create({
            idUser: req.body.idUser,
            tipo: "CIDADAO",
            arquivo: req.body.cidadao,
          })
          .then(function () {})
          .catch(function (erro) {
            res.send("Erro: " + erro);
          });
      } else {
        //ja possui o registro inserido recentemente no banco de dados
        arquivosTable.update(
          {
            idUser: req.body.idUser,
            tipo: "CIDADAO",
            arquivo: req.body.cidadao,
          },
          {
            where: {
              idUser: req.body.idUser,
              tipo: "CIDADAO",
            },
          }
        );
      }
    });

  arquivosTable
    .findAll({
      where: {
        idUser: req.body.idUser,
        tipo: "ENSINO_MEDIO",
      },
    })
    .then(function (dados) {
      if (dados == "") {
        //caso não exista duplicata
        //inserir ensinoMedio
        if (req.body.ensinoMedio != null && req.body.ensinoMedio != "") {
          arquivosTable
            .create({
              idUser: req.body.idUser,
              tipo: "ENSINO_MEDIO",
              arquivo: req.body.ensinoMedio,
            })
            .then(function () {})
            .catch(function (erro) {
              res.send("Erro: " + erro);
            });
        }
      } else {
        //ja possui o registro inserido recentemente no banco de dados
        arquivosTable.update(
          {
            idUser: req.body.idUser,
            tipo: "ENSINO_MEDIO",
            arquivo: req.body.ensinoMedio,
          },
          {
            where: {
              idUser: req.body.idUser,
              tipo: "ENSINO_MEDIO",
            },
          }
        );
      }
    });

  arquivosTable
    .findAll({
      where: {
        idUser: req.body.idUser,
        tipo: "RG_RESPONSAVEL",
      },
    })
    .then(function (dados) {
      if (dados == "") {
        //caso não exista duplicata
        //inserir rgResponsavel
        if (req.body.rgResponsavel != null && req.body.rgResponsavel != "") {
          arquivosTable
            .create({
              idUser: req.body.idUser,
              tipo: "RG_RESPONSAVEL",
              arquivo: req.body.rgResponsavel,
            })
            .then(function () {})
            .catch(function (erro) {
              res.send("Erro: " + erro);
            });
        }
      } else {
        //ja possui o registro inserido recentemente no banco de dados
        arquivosTable.update(
          {
            idUser: req.body.idUser,
            tipo: "RG_RESPONSAVEL",
            arquivo: req.body.rgResponsavel,
          },
          {
            where: {
              idUser: req.body.idUser,
              tipo: "RG_RESPONSAVEL",
            },
          }
        );
      }
    });

  arquivosTable
    .findAll({
      where: {
        idUser: req.body.idUser,
        tipo: "CPF_RESPONSAVEL",
      },
    })
    .then(function (dados) {
      if (dados == "") {
        //caso não exista duplicata
        //inserir cpfResponsavel
        if (req.body.cpfResponsavel != null && req.body.cpfResponsavel != "") {
          arquivosTable
            .create({
              idUser: req.body.idUser,
              tipo: "CPF_RESPONSAVEL",
              arquivo: req.body.cpfResponsavel,
            })
            .then(function () {})
            .catch(function (erro) {
              res.send("Erro: " + erro);
            });
        }
      } else {
        //ja possui o registro inserido recentemente no banco de dados
        arquivosTable.update(
          {
            idUser: req.body.idUser,
            tipo: "CPF_RESPONSAVEL",
            arquivo: req.body.cpfResponsavel,
          },
          {
            where: {
              idUser: req.body.idUser,
              tipo: "CPF_RESPONSAVEL",
            },
          }
        );
      }
    });
});

//CANCELA INSCRITO
api.post("/cancelaInscrito", function (req, res) {
  insereUsuario.update(
    {
      cancelado: 1,
    },
    {
      where: {
        id: req.body.idUser,
      },
    }
  );

  insereUsuario
    .findAll({
      where: {
        id: req.body.idUser,
      },
    })
    .then(function (dados) {
      //console.log(dados)
      //res.send(dados)
      var retorno = JSON.parse(JSON.stringify(dados));
      console.log("email inscrito cancelado: " + retorno[0].email);
      mail.cancelaInscricao(retorno[0].email);
    })
    .catch(function (erro) {
      res.send("Erro encontrado: " + erro);
    });

  res.send("Inscrito cancelado com sucesso!");
});

//VALIDA PRIMEIRO ACESSO DO USUÁRIO
api.post("/valida", function (req, res) {
  insereUsuario
    .findAll({
      where: {
        id: req.body.idUser,
        codigo: req.body.codigo,
      },
    })
    .then(function (dados) {
      //res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
      //res.send("Pesquisa ok!")
      if (dados == "") {
        res.send("Código incorreto!");
        console.log("erro");
      } else {
        console.log(dados);
        res.send(dados);

        //se o codigo for correto, "ativo" = 1
        insereUsuario.update(
          {
            ativo: 1,
          },
          {
            where: {
              id: req.body.idUser,
            },
          }
        );
      }
    })
    .catch(function (erro) {
      res.send("Erro encontrado: " + erro);
    });
});
//SESSAO USUARIO CADASTRADO
api.post("/login", function (req, res) {
  //insere usuario no banco
  insereUsuario
    .findAll({
      where: {
        email: req.body.email,
        senha: req.body.senha,
      },
    })
    .then(function (dados) {
      //res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
      //res.send("Pesquisa ok!")
      if (dados == "") {
        res.send("E-mail ou senha inválidos!");
      } else {
        res.send(dados);
      }
    })
    .catch(function (erro) {
      res.send("Erro encontrado: " + erro);
    });
});
//RECUPERAÇÃO DE SENHA
api.post("/recuperaSenha", function (req, res) {
  //insere usuario no banco
  insereUsuario
    .findAll({
      where: {
        email: req.body.email,
      },
    })
    .then(function (dados) {
      //res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
      //res.send("Pesquisa ok!")
      if (dados == "") {
        console.log("E-mail não cadastrado");
      } else {
        var retornoString = JSON.parse(JSON.stringify(dados));
        mail.recuperaSenhaMail(
          retornoString[0].email,
          retornoString[0].senha,
          retornoString[0].nome
        );
      }
    })
    .catch(function (erro) {
      res.send("Erro encontrado: " + erro);
    });
});

//(IMPLEMENTAR LOGICA PARECIDA COM ABAIXO PARA LISTAR TODOS INSCRITOS PARA ADM)
/*api.get('/login', function(req,res){
    //pesquisa usuario no banco
    insereUsuario.findAll({
       /* where: {
          email: req.body.email,
          senha: req.body.senha
        }*/
/*
    }).then(function(dados){
        console.log(dados)
        res.json(dados)
    })
})*/

/*TRECHO RESPONSÁVEL PARA BLOQUEAR A INSCRICAO QUANDO NÃO TIVER MAIS VAGAS */
api.get("/inscricao", function (req, res) {
  controleTable
    .findAll({
      where: {
        id: 1,
      },
    })
    .then(function (dados) {
      res.send(dados);
    })
    .catch(function (erro) {
      res.send("Erro encontrado: " + erro);
    });
  //res.send('teste')
});

//define nº modelo de simulado ao aluno
api.get("/modelo", function (req, res) {
  //TESTANDO Nº ALEATORIO PARA MODELO DE SIMULADO:
  /*let um = 0
    let dois = 0
    let tres = 0
    let quatro = 0*/
  //for(let i = 0; i < 64; i++){
  let numModeloSimulado = Math.floor(Math.random() * 4) + 1;
  /*switch(numModeloSimulado){
        case 1: um++; break;
        case 2: dois++; break;
        case 3: tres++; break;
        case 4: quatro++; break;
        default: console.log("numero aleatorio invalido! "+numModeloSimulado)
    }*/
  console.log("nº modelo gerado: " + numModeloSimulado);
  res.send("" + numModeloSimulado);
  //}
  /*console.log("qtd 1: "+um) 
    console.log("qtd 2: "+dois) 
    console.log("qtd 3: "+tres) 
    console.log("qtd 4: "+quatro) */

  /*controleTable.findAll({
        where: {
            id: 2
        }
    }).then(function(dados){
        
        let retornoString = JSON.parse(JSON.stringify(dados))
        let numModelo = parseInt(retornoString[0].fim)
        //numModelo = numModelo + 1
        console.log("dados modelo: "+numModelo)
        if(numModelo == 4) numModelo = 0//retorna ao inicio da contagem
        //anda para o proximo modelo de simulado
        controleTable.update({
            fim: numModelo + 1
        },{
            where: {
                id: 2
            }
        });
        
        res.send(dados) 
        
    }).catch(function(erro){res.send("Erro encontrado: " + erro)})
    //res.send('teste')*/
});

api.post("/cadastraSimulado", function (req, res) {
  //variaveis recebem requisição para facilitar organização/entendimento
  let alternativaCerta = req.body.correta;
  let numeroPergunta = req.body.pergunta;
  let diciplina = req.body.materia;
  let questao = req.body.enunciado;
  let A = req.body.resp_a;
  let B = req.body.resp_b;
  let C = req.body.resp_c;
  let D = req.body.resp_d;
  // let E = req.body.resp_e;

  function proximaLetra(letra) {
    let proxima = letra;
    switch (proxima) {
      case "a":
        proxima = "b";
        break;
      case "b":
        proxima = "c";
        break;
      case "c":
        proxima = "d";
        break;
      case "d":
        // proxima = "e";
        proxima = "a";
        break;
      // case "e":
      //   proxima = "a";
      //   break;
    }
    return proxima;
  }
  let certaModelo1 = alternativaCerta;
  let certaModelo2 = proximaLetra(certaModelo1);
  let certaModelo3 = proximaLetra(certaModelo2);
  let certaModelo4 = proximaLetra(certaModelo3);

  //ordem conforme foi cadastrada
  gabaritoTable.create({
    modelo: 1,
    pergunta: numeroPergunta,
    materia: diciplina,
    enunciado: questao,
    resp_a: A,
    resp_b: B,
    resp_c: C,
    resp_d: D,
    // resp_e: E,
    correta: certaModelo1,
    img: req.body.img,
  });
  //andando UMA casa da esq p/ dir
  gabaritoTable.create({
    modelo: 2,
    pergunta: numeroPergunta,
    materia: diciplina,
    enunciado: questao,
    resp_a: D,
    resp_b: A,
    resp_c: B,
    resp_d: C,
    // resp_e: D,
    correta: certaModelo2,
    img: req.body.img,
  });
  //andando DUAS da esq p/ dir
  gabaritoTable.create({
    modelo: 3,
    pergunta: numeroPergunta,
    materia: diciplina,
    enunciado: questao,
    resp_a: C,
    resp_b: D,
    resp_c: A,
    resp_d: B,
    // resp_e: C,
    correta: certaModelo3,
    img: req.body.img,
  });
  //andando TRES da esq p/ dir
  gabaritoTable.create({
    modelo: 4,
    pergunta: numeroPergunta,
    materia: diciplina,
    enunciado: questao,
    resp_a: B,
    resp_b: C,
    resp_c: D,
    resp_d: A,
    // resp_e: B,
    correta: certaModelo4,
    img: req.body.img,
  });
});

api.post("/simulado", function (req, res) {
  //verificar se aluno acertou questao
  gabaritoTable
    .findAll({
      where: {
        //modelo prova e nº pergunta
        modelo: req.body.modelo,
        pergunta: req.body.pergunta,
      },
    })
    .then(function (dados) {
      if (dados == "") {
        res.send("Sem retorno dos dados gabarito/simulado");
      } else {
        //se encontrado a pergunta no banco, é comparada com a resposta do aluno e verificado se está correta

        var retornoString = JSON.parse(JSON.stringify(dados));
        console.log("questao correta do gabarito: " + retornoString[0].correta);
        var correto = "";
        if (retornoString[0].correta == req.body.selecionado) {
          console.log("acertou");
          correto = "s";
          console.log(": " + correto);
        } else {
          console.log("errou");
          correto = "n";
          console.log(": " + correto);
        }
        simuladoTable.create({
          idUser: req.body.idUser,
          modelo: req.body.modelo,
          pergunta: req.body.pergunta,
          selecionado: req.body.selecionado,
          acertou: correto,
        });
        //res.send(correto)

        //RETORNAR DATETIME QUE FOI INSERIDO A QUESTÃO ANTERIOR
        //CONTINUAR APARTIR DAQ
        /*simuladoTable.findAll({
                where: {
                    idUser: req.body.idUser,
                   // modelo: req.body.modelo,//talvez redundante
                    pergunta: req.body.pergunta,
                    //ALTERAR PARAMETROS ACIMA
                }
            }).then(function(ret){ 
                var retStr = JSON.parse(JSON.stringify(ret))
                console.log('ret str: '+retStr[0].createdAt)//ALTERAR AQUI

                //res.send()//envia ao cliente

            }).catch(function(erro){
                res.send("Erro encontrado: " + erro)
            })*/
      }
    })
    .catch(function (erro) {
      res.send("Erro encontrado: " + erro);
    });
});

api.post("/alunosimulado", function (req, res) {
  alunosimuladoTable
    .findAll({
      where: {
        idUser: req.body.idUser,
      },
    })
    .then(function (dados) {
      if (dados == "") {
        alunosimuladoTable
          .create({
            idUser: req.body.idUser,
            horaInicio: req.body.horaInicio,
            horaFimMax: req.body.horaFimMax,
          })
          .then(function (resp) {
            console.log("resp alunosimulado: " + resp);
          })
          .catch(function (erro) {
            res.send("Erro: " + erro);
          });
      } else {
        // //ja possui registro na tabela para esse ID de usuario: UPDATE
        // alunosimuladoTable.update({
        //     idUser: req.body.idUser,
        //     horaInicio: req.body.horaInicio,
        //     horaFimMax: req.body.horaFimMax
        // },{
        //     where: {
        //         idUser: req.body.idUser,
        //     }
        // });
      }
    });
});

api.get("/gabaritos", function (req, res) {
  gabaritoTable
    .findAll({})
    .then(function (dados) {
      res.send(dados);
      //console.log("gabaritos: "+dados)
    })
    .catch(function (erro) {
      res.send("Erro encontrado: " + erro);
    });
  //res.send('teste')
});

// NOVAS FUNÇÕES SIMULADO ADM/INSCRITO:
api.get("/gabaritomodelos", function (req, res) {
  gabaritoTable.findAll({}).then(function (dados) {
    res.send(dados);
    //console.log("gabaritos: "+dados)
  });
});

// algoritmo para migrar resultado do simulado atual para a tabela que contem resultado de todos os simulados
// api.get("/migraresultados", async function(req, res) {
//   let dadosSimulado = await simuladoTable.findAll({});
//   let arrAlunosAll = [];
//   let arrResp = [];

//   for (let i = 0; i < dadosSimulado.length; i++) {
//     arrAlunosAll.push(dadosSimulado[i].idUser);
//   }
//   // elimina duplicatas
//   let arrAlunos = arrAlunosAll.filter(function(este, i) {
//     return arrAlunosAll.indexOf(este) === i;
//   });
//   // prepara arr de resposta com id do aluno e suas materias
//   for (let i = 0; i < arrAlunos.length; i++) {
//     arrResp[i] = {
//       idUser: arrAlunos[i],
//       totalPerguntas: 70, // PODE VARIAR
//       selecionadosAll: "", // array com opções selecionadas pelo user
//       certosAll: "" // array dizendo se as opções selecionadas estão certas
//     };
//   }

//   for (let i = 0; i < dadosSimulado.length; i++) {
//     arrResp.find(item =>)
//   }

//   console.log(arrResp);
// });

// api.get("/migraresultados", async function(req, res) {
//   let dadosSimulado = await simuladoTable.findAll({}); // pega do banco todos simulados
//   // let dadosGabaritos = await gabaritoTable.findAll({}); // pega do banco todos gabaritos
//   let arrMateriasAll = [];
//   let arrAlunosAll = [];
//   let arrResp = [];

//   // for (let i = 0; i < dadosGabaritos.length; i++) {
//   //   arrMateriasAll.push(dadosGabaritos[i].materia);
//   // }
//   for (let i = 0; i < dadosSimulado.length; i++) {
//     arrAlunosAll.push(dadosSimulado[i].idUser);
//   }

//   // let arrMaterias = arrMateriasAll.filter(function(este, i) {
//   //   return arrMateriasAll.indexOf(este) === i;
//   // });

//   // elimina duplicatas
//   let arrAlunos = arrAlunosAll.filter(function(este, i) {
//     return arrAlunosAll.indexOf(este) === i;
//   });

//   // prepara arr de resposta com id do aluno e suas materias
//   for (let i = 0; i < arrAlunos.length; i++) {
//     arrResp[i] = {
//       idUser: arrAlunos[i],
//       materia: [
//         {
//           nome: "Biologia",
//           acertos: 0
//         },
//         {
//           nome: "História",
//           acertos: 0
//         },
//         {
//           nome: "Química",
//           acertos: 0
//         },
//         {
//           nome: "Geografia",
//           acertos: 0
//         },
//         {
//           nome: "Português",
//           acertos: 0
//         },
//         {
//           nome: "Matemática",
//           acertos: 0
//         },
//         {
//           nome: "Biologia",
//           acertos: 0
//         }
//       ]
//     };
//   }

//   for (let i = 0; i < dadosSimulado.length; i++) {
//     // idUser,
//     for (let j = 0; j < arrResp.length; j++) {
//       // dadosSimulado[i].
//     }
//   }

//   console.log(dadosSimulado);
//   res.send(dadosSimulado);
// });

// algoritmo para migrar resultado do simulado atual para a tabela que contem resultado de todos os simulados
// api.get("/migraresultados", async function(req, res) {
//   let dados = await simuladoTable.findAll({});

//   for (let i = 0; i < dados.length / 2; i++) {
//     resultadoSimuladoTable.create({
//       idUser: dados[i].idUser,
//       // ID E NOME DE SIMULADO DEVE SEMPRE SER MUDADOS!!!!!
//       idSimulado: 2,
//       nomeSimulado: "Simulado 2",
//       modelo: dados[i].modelo,
//       pergunta: dados[i].pergunta,
//       selecionado: dados[i].selecionado,
//       acertou: dados[i].acertou,
//       createdAtSimulado: dados[i].createdAt,
//       updatedAtSimulado: dados[i].updatedAt
//     });
//   }
//   // res.send("Dados em migração, verifique em sua base de dados...");
//   res.send(dados);
// });

/*api.post('/gabarito', function(req,res){
    //verificar se aluno acertou questao
    gabaritoTable.findAll({
        where: {
            //modelo prova e nº pergunta
            modelo: req.body.modelo,
            pergunta: req.body.pergunta
        }
    }).then(function(dados){ 
        if(dados == ''){
            res.send("Sem retorno dos dados gabarito/simulado") 
        } else{
            res.send("RETORNO OK: "+dados) 
        }    
    }).catch(function(erro){
        res.send("Erro encontrado: " + erro)
    })

    simuladoTable.create({
        idUser: req.body.idUser,
        modelo: req.body.modelo,
        pergunta: req.body.pergunta,
        selecionado: req.body.selecionado,
        //acertou:
    })

})*/

//arquivos em pdf:
const fs = require("fs");
api.get("/informacoes", function (request, response) {
  //var tempFile="/home/applmgr/Desktop/123456.pdf";
  var tempFile = "pdf/informacoes.pdf";
  fs.readFile(tempFile, function (err, data) {
    response.contentType("application/pdf");
    response.send(data);
  });
});
api.get("/edital", function (request, response) {
  //var tempFile="/home/applmgr/Desktop/123456.pdf";
  var tempFile = "pdf/edital.pdf";
  fs.readFile(tempFile, function (err, data) {
    response.contentType("application/pdf");
    response.send(data);
  });
});
api.get("/requerimento", function (request, response) {
  //var tempFile="/home/applmgr/Desktop/123456.pdf";
  var tempFile = "pdf/REQUERIMENTO - 2018.pdf";
  fs.readFile(tempFile, function (err, data) {
    response.contentType("application/pdf");
    response.send(data);
  });
});
api.get("/termo_responsabilidade", function (request, response) {
  //var tempFile="/home/applmgr/Desktop/123456.pdf";
  var tempFile = "pdf/termo_responsabilidade.pdf";
  fs.readFile(tempFile, function (err, data) {
    response.contentType("application/pdf");
    response.send(data);
  });
});

// // TESTE
// mail.listaRegularMail('lucasviana112@gmail.com', 'Lucas', '1234')

api.use("/", router); //permite utilizar a rota definida anteriormente

api.use("/inscritos", listaInscritos);
api.use("/detalhes", listaDetalhesInscrito);
api.use("/completo", listaDadosCompletos);
api.use("/cadastraSimulado", listaGabarito);
api.use("/simulado", perguntaSimulado);
api.use("/simuladoq1", perguntaSimuladoQ1);
api.use("/alunosimulado", registrosTempo);
api.use("/gabaritosimples", respostasAlunoSimples);
api.use("/gabaritocompleto", respostasAlunoCompleto);
api.use("/simuladoadmcompleto", simuladoAdmCompleto);
api.use("/resultadosimulados", resultadoAlunoSimulado);

/*if('2019-09-06 11:15:24' <= '2019-09-06 13:15:24'){
    console.log("okk")
}*/

//api.use("/inscricao", cadastraInscrito);
//api.use("/formulario", formInscricao);
/*
//SERVIÇO DE EMAIL temporario, posteriormente implementar em outro arquivo
const nodemailer = require('nodemailer');
//serviço de transporte de email
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',//smtp-relay.gmail.com
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'EMAIL',
        pass: 'SENHA'
    },
    tls: {
        rejectUnauthorized: false//rejeita autorização acesso ao email, talvez remover
    }
   });
//detalhes do email
const mailOptions = {
    //posteriormente alterar o email adm por algum outro
    from: '', // remetente
    to: '', // destinatario
    subject: 'assunto', // assunto
    html: '<h1>conteudo</h1>'// conteúdo
};
//envia efetivamente o email com base nas configurações anteriores
transporter.sendMail(mailOptions, function (err, info) {
    if(err)
        console.log("Erro gerado: " + err)
    else
        console.log("Info gerado: " + info);
});
*/
/*
//CONVERSAO IMG P/ BASE64
var fs = require('fs');
// função para codificar dados de arquivo para string codificada base64
function base64_encode(file) {
    // ler dados binários
    var bitmap = fs.readFileSync(file);
    // converter dados binários em string codificada na base64
    return new Buffer(bitmap).toString('base64');
}
// função para criar arquivo de string codificada em base64
function base64_decode(base64str, file) {
    // Para criar o objeto buffer a partir da string codificada base64, é importante informar ao construtor que a string é codificada na base64
    var bitmap = new Buffer(base64str, 'base64');
    // buffer de gravação para arquivo
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}
// converter imagem em string codificada em base64
var base64str = base64_encode('teste.png');
console.log(base64str);
// converter string base64 de volta para a imagem
base64_decode(base64str, 'copy_teste.png');
*/
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
api.listen(port);
//api.listen(porta);//faz com que a aplicação fica executando em loop
console.log("Run API Express porta: " + port);
