const express = require('express');//servidor web (http)
const bodyparser = require('body-parser');//le cabeçalho e converte dados
const cors = require('cors');//permite acesso seguro a recursos de outros dominios/sites

const api = express();//contem a instancia do express para inicialização
//const porta = 3000;//será escutado pelo "listener" do express 
const router = express.Router(); //verbos do http (get,delete,post,put,etc) para requisições

const cadastraInscrito = require("./rotas/cadastraInscrito");//talvez remover
const formInscricao = require("./rotas/formInscricao");
const listaInscritos = require("./rotas/listaInscritos");
const listaDetalhesInscrito = require("./rotas/listaDetalhesInscrito");

//"use" trabalha as requisições conforme a demanda
api.use(cors());//trata requisições que não é da mesma origem que a API
api.use(bodyparser.urlencoded({extended: true}))//"urlencoded" recupe informações de formularios(por exemplo) e os converte
api.use(bodyparser.json({limit: '20mb', extended: true}))//limita tamanho dos arquivos enviados (imagem,video,etc)

//quando requisitada a rota raiz
//req -> requisição; resp -> resposta; arrow function (=>)
//resp.json envia a resposta ao cliente com um objeto json definido como parametro
router.get("/", (req,resp) => resp.json({
    mensagem: 'API em execução...'
}));
const insereInscricao = require("./models/InscritosTable")
const insereArquivo = require("./models/ArquivosTable")
const insereUsuario = require("./models/UsuariosTable")//insere ou pesquisa usuario
const candidatoTable = require("./models/CandidatoTable")
const socioeconomicoTable = require("./models/SocioeconomicoTable")
const estudosTable = require("./models/EstudosTable")
const valoresTable = require("./models/ValoresTable")
const arquivosTable = require("./models/ArquivosTable")

//trata envio de arquivos, definindo suas configurações
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req,res,cb) => {
        cb(null, 'uploads/')
    },
    filename: (req,file,cb) => {
        cb(null, Date.now()+'-'+file.originalname)
    }
})
const upload = multer({storage})

//INSERE INSCRIÇÃO NO BANCO, MUDAR ESSA LINHA PARA PASTA DEDICADA A ROTAS! :
//POSSIVELMENTE REMOVER ESSE TRECHO!
api.post('/enviaInscricao', upload.single('rgFile'), function(req, res){

    var fs = require('fs');
    function base64_encode(file) {
        // ler dados binários
        var bitmap = fs.readFileSync(file);
        // converter dados binários em string codificada na base64
        return new Buffer(bitmap).toString('base64');
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
})
//CADASTRA NOVO USUARIO
api.post('/cadastraUser', function(req,res){
    //insere usuario no banco
    insereUsuario.create({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        email: req.body.email,
        senha: req.body.senha,
        adm: 0
    }).then(function(){
        //res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
        //res.send("Pagamento cadastro com sucesso!")
    }).catch(function(erro){
        res.send("Erro: " + erro)
    })
})
//CADASTRA DADOS PESSOAIS DO CANDIDATO
api.post('/insereDadosPessoais', function(req,res){
    //insere usuario no banco
    candidatoTable.create({
        idUser: req.body.idUser,
        data_nasc: req.body.data_nasc,
        cidade_nasc: req.body.cidade_nasc,
        estado_nasc: req.body.estado_nasc,
        tel1: req.body.tel1,
        tel2: req.body.tel2,
        cpf: req.body.cpf,
        rg: req.body.rg,
        cidadao: req.body.cidadao
    }).then(function(){
        //res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
        //res.send("Pagamento cadastro com sucesso!")
    }).catch(function(erro){
        res.send("Erro: " + erro)
    })
})
//CADASTRA DADOS SOCIOECONOMICOS DO CANDIDATO
api.post('/insereDadosSocioeconomicos', function(req,res){
    //insere usuario no banco
    socioeconomicoTable.create({
        idUser: req.body.idUser,
        qtd_pessoas: req.body.qtd_pessoas,
        qtd_filhos: req.body.qtd_filhos,
        casa: req.body.casa,
        local_casa: req.body.local_casa,
        transporte: req.body.transporte,
        escol_pai: req.body.escol_pai,                                
        escol_mae: req.body.escol_mae,
        trab_pai: req.body.trab_pai,                
        trab_mae: req.body.trab_mae,
        trab_candidato: req.body.trab_candidato,
        pessoas_renda: req.body.pessoas_renda,
        renda_total: req.body.renda_total,
        
        tv: req.body.tv,
        dvd: req.body.dvd,
        radio: req.body.radio,
        pc: req.body.pc,
        automovel: req.body.automovel, 
        lava_roupa: req.body.lava_roupa,
        geladeira: req.body.geladeira,
        tel_fixo: req.body.tel_fixo,
        celular: req.body.celular,
        acesso_internet: req.body.acesso_internet,                                  
        tv_ass: req.body.tv_ass,
        lava_louca: req.body.lava_louca,

        trab_atual: req.body.trab_atual,
        trab_despesas: req.body.trab_despesas,                                
        trab_sustento: req.body.trab_sustento,
        trab_independente: req.body.trab_independente,                
        trab_experi: req.body.trab_experi,
        trab_p_estudos: req.body.trab_p_estudos,

        trab_horas: req.body.trab_horas,
        estuda_e_trab: req.body.estuda_e_trab,
        motivo_estudar: req.body.motivo_estudar,
        eja: req.body.eja,
        eja_tipo: req.body.eja_tipo,
        tem_internet: req.body.tem_internet,                                
        tem_computador: req.body.tem_computador,
        acesso_internet: req.body.acesso_internet, 

        curso_lingua: req.body.curso_lingua,
        curso_info: req.body.curso_info,
        curso_prepara: req.body.curso_prepara,
        curso_tecnico: req.body.curso_tecnico,
        curso_outro: req.body.curso_outro,

        jornal: req.body.jornal,
        sites: req.body.sites,
        manuais: req.body.manuais,                                
        ficcao: req.body.ficcao,
        saude: req.body.saude,                
        religiao: req.body.religiao,
        humor: req.body.humor,
        info_geral: req.body.info_geral,
        nao_ficcao: req.body.nao_ficcao,
        estilo: req.body.estilo,
        educa: req.body.educa,
        adolecente: req.body.adolecente,
        lazer: req.body.lazer,                                
        cientifica: req.body.cientifica,

        aval_grupo: req.body.aval_grupo,                
        aval_esporte: req.body.aval_esporte,
        aval_biblioteca: req.body.aval_biblioteca,
        aval_local: req.body.aval_local,
        aval_respeito: req.body.aval_respeito,
        aval_laboratorio: req.body.aval_laboratorio,
        aval_sala: req.body.aval_sala,
        aval_lingua: req.body.aval_lingua,
        aval_interesse: req.body.aval_interesse,                                
        aval_ambiental: req.body.aval_ambiental,
        aval_horario: req.body.aval_horario,                
        aval_segurancao: req.body.aval_segurancao,
        aval_informatica: req.body.aval_informatica,
        aval_atencao: req.body.aval_atencao,
        
        aval_conhecimento_prof: req.body.aval_conhecimento_prof,
        aval_dedica_prof: req.body.aval_dedica_prof,
        aval_passeios: req.body.aval_passeios,
        aval_acessibilidade: req.body.aval_acessibilidade,
               

    }).then(function(){
        //res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
        //res.send("Pagamento cadastro com sucesso!")
    }).catch(function(erro){
        res.send("Erro: " + erro)
    })
})
//CADASTRA DADOS ESTUDOS E FORMAÇÃO
api.post('/insereDadosEstudos', function(req,res){
    //insere usuario no banco
    estudosTable.create({
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
        area_desejo: req.body.area_desejo,
        curso_univ1: req.body.curso_univ1,
        curso_univ2: req.body.curso_univ2,
        curso_univ3: req.body.curso_univ3,
       
        fuvest: req.body.fuvest,
        comvest: req.body.comvest,
        vunesp: req.body.vunesp,
        enem: req.body.enem,
        fatec: req.body.fatec

    }).then(function(){
        //res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
        //res.send("Pagamento cadastro com sucesso!")
    }).catch(function(erro){
        res.send("Erro: " + erro)
    })
})
//CADASTRA VALORES
api.post('/insereDadosValores', function(req,res){
    //insere usuario no banco
    valoresTable.create({
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
    }).then(function(){
        //res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
        //res.send("Pagamento cadastro com sucesso!")
    }).catch(function(erro){
        res.send("Erro: " + erro)
    })
})
//CADASTRA ARQUIVOS DO CANDIDATO
api.post('/insereDadosArquivos', function(req,res){
    
    //inserir rg
    arquivosTable.create({
        idUser: req.body.idUser,
        tipo: 'RG',
        arquivo: req.body.rgCandidato
    }).then(function(){
        //res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
        //res.send("Pagamento cadastro com sucesso!")
    }).catch(function(erro){
        res.send("Erro: " + erro)
    })

    //inserir cpf
    arquivosTable.create({
        idUser: req.body.idUser,
        tipo: 'CPF',
        arquivo: req.body.cpfCandidato
    }).then(function(){
        //res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
        //res.send("Pagamento cadastro com sucesso!")
    }).catch(function(erro){
        res.send("Erro: " + erro)
    })
})
//SESSAO USUARIO CADASTRADO 
api.post('/login', function(req,res){
    //insere usuario no banco
    insereUsuario.findAll({
        where: {
            email: req.body.email,
            senha: req.body.senha
        }
    }).then(function(dados){
        //res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
        //res.send("Pesquisa ok!")  
        if(dados == ''){
            res.send("E-mail ou senha inválidos!") 
        } else{
            res.send(dados) 
        }
        
    }).catch(function(erro){
        res.send("Erro encontrado: " + erro)
    })
})

//(IMPLEMENTAR LOGICA PARECIDA COM ABAIXO PARA LISTAR TODOS INSCRITOS PARA ADM)
/*api.get('/login', function(req,res){
    //pesquisa usuario no banco
    insereUsuario.findAll({
       /* where: {
          email: req.body.email,
          senha: req.body.senha
        }*//*
    }).then(function(dados){
        console.log(dados)
        res.json(dados)
    })
})*/

//arquivos em pdf:
const fs = require('fs');
api.get('/informacoes', function(request, response){
    //var tempFile="/home/applmgr/Desktop/123456.pdf";
    var tempFile="pdf/informacoes.pdf";
    fs.readFile(tempFile, function (err,data){
        response.contentType("application/pdf");
        response.send(data);
    });
});
api.get('/edital', function(request, response){
    //var tempFile="/home/applmgr/Desktop/123456.pdf";
    var tempFile="pdf/edital.pdf";
    fs.readFile(tempFile, function (err,data){
        response.contentType("application/pdf");
        response.send(data);
    });
});
api.get('/requerimento', function(request, response){
    //var tempFile="/home/applmgr/Desktop/123456.pdf";
    var tempFile="pdf/REQUERIMENTO - 2018.pdf";
    fs.readFile(tempFile, function (err,data){
        response.contentType("application/pdf");
        response.send(data);
    });
});


api.use("/", router);//permite utilizar a rota definida anteriormente

api.use("/inscritos", listaInscritos);
api.use("/detalhes", listaDetalhesInscrito);
api.use("/inscricao", cadastraInscrito);
api.use("/formulario", formInscricao);
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