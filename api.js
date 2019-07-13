const express = require('express');//servidor web (http)
const bodyparser = require('body-parser');//le cabeçalho e converte dados
const cors = require('cors');//permite acesso seguro a recursos de outros dominios/sites

const api = express();//contem a instancia do express para inicialização
const porta = 3000;//será escutado pelo "listener" do express
const router = express.Router(); //verbos do http (get,delete,post,put,etc) para requisições

const listaInscritos = require("./rotas/listaInscritos");
const cadastraInscrito = require("./rotas/cadastraInscrito");
const formInscricao = require("./rotas/formInscricao");

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
api.post('/enviaInscricao', upload.single('rgFile'), function(req, res){

    console.log(req.body);
    console.log(req.file);
    var nomeArquivoRG = req.file.filename;

    //insere dados no banco
    insereInscricao.create({
        nome: req.body.nome,
		email: req.body.email,
        senha: req.body.senha
    }).then(function(){
        //res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
        //res.send("Pagamento cadastro com sucesso!")
    }).catch(function(erro){
        res.send("Erro: " + erro)
    })

    /*const base64img =  require('base64-img');
    base64img.base64('./teste.png', function(err, data) {
        console.log(data);
    })*/
    //POSTERIORMENTE IMPLEMENTAR FORMA DE SALVAR BASE64 DAS IMAGENS NO BANCO E APAGA-LAS DA PASTA DE UPLOADS

    insereArquivo.create({
		email: req.body.email,
		rg: nomeArquivoRG
    }).then(function(){
        res.redirect('/')//redireciona para a rota indicada caso o registro tenha sido inserido com sucesso
        //res.send("Pagamento cadastro com sucesso!")
    }).catch(function(erro){
        res.send("Erro: " + erro)
    })
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

api.listen(porta);//faz com que a aplicação fica executando em loop
console.log("Run API Express");