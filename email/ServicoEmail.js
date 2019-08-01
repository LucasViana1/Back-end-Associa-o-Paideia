//serviço de email temporario, posteriormente implementar em outro arquivo
const nodemailer = require('nodemailer');
//serviço de transporte de email
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',//smtp-relay.gmail.com
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'devopsprog@gmail.com',
        pass: '98111111'
    },
    tls: {
        rejectUnauthorized: false//rejeita autorização acesso ao email, talvez remover
    }
   });

exports.cadastroMail = function(destinatario,senha,nome,codigo){
    //detalhes do email
    const mailOptions = {
        //posteriormente alterar o email adm por algum outro
        from: 'devopsprog@gmail.com', // remetente
        to: destinatario, // destinatario
        subject: 'Confirmação de cadastro', // assunto
        html: 
        '<h1>Olá '+nome+'!</h1>'+
        '<h2>Seu cadastro ao Sistema da Associação Paideia foi realizado com sucesso!</h2><br>'+
        '<p>O cadastro é necessário para que seja dado prosseguimento a inscrição.</p><br>'+
        '<h3>APENAS ESSE CADASTRO NÃO GARANTE SUA VAGA!</h3><br>'+
        '<p>Você já pode preencher seu formulario de inscrição, dados para acesso:</p>'+
            '<p><b>Login: </b>'+destinatario+'</p>'+
            '<p><b>Senha: </b>'+senha+'</p>'+
            '<p><b>Código (para válidar o primeiro acesso): </b>'+codigo+'</p>'+
        '<br>'+
        '<h3>Acesse através do link: <a href="http://localhost:8080/login">http://localhost:8080/login</a></h3>'
    };
    //envia efetivamente o email com base nas configurações anteriores
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log("Erro gerado: " + err)
        else
            console.log("Info gerado: " + info);
    });
}

exports.listaEsperaMail = function(destinatario,nome){
    const mailOptions = {
        from: 'devopsprog@gmail.com', // remetente
        to: destinatario,
        subject: 'CONFIRMAÇÃO DE INSCRIÇÃO', // assunto
        html: 
        '<h2>Olá '+nome+'!</h2><br>'+
        '<p>Sua inscrição para o segundo semestre de 2019 foi efetuada com sucesso e sua inscrição consta na lista de espera '+
        '(lembramos que você precisa participar de todas as etapas igualmente).</p>'+
        '<p>Seu número de matrícula é: 0000 (INSERIR VALOR CORRETO). </p><br>'+
        'Em anexo o termo de responsabilidade, que deverá ser entregue impresso no dia da entrevista.',
        attachments: {
           path: __dirname + "/termo_responsabilidade.pdf"
        }      
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if(err){
            console.log("Erro gerado: " + err)
        }   
        else
            console.log("Info gerado: " + info);
    });

}

exports.listaRegularMail = function(destinatario,nome){
    const mailOptions = {
        from: 'devopsprog@gmail.com', // remetente
        to: destinatario,
        subject: 'CONFIRMAÇÃO DE INSCRIÇÃO', // assunto
        html: 
        '<h2>Olá '+nome+'!</h2><br>'+
        '<p>Sua inscrição para o segundo semestre de 2019 foi efetuada com sucesso e sua inscrição consta na lista regular.</p>'+
        '<p>Seu número de matrícula é: 0000 (INSERIR VALOR CORRETO). </p><br>'+
        'Em anexo o termo de responsabilidade, que deverá ser entregue impresso no dia da entrevista.',
        attachments: {
           path: __dirname + "/termo_responsabilidade.pdf"
        }
        
    };
    //envia efetivamente o email com base nas configurações anteriores
    transporter.sendMail(mailOptions, function (err, info) {
        if(err){
            console.log("Erro gerado: " + err)
            //console.log("destinatario: "+destinatario)
            //console.log("nome: "+nome)
        }   
        else
            console.log("Info gerado: " + info);
    });

}

exports.listaCheiaMail = function(destinatario,nome){
    const mailOptions = {
        from: 'devopsprog@gmail.com', // remetente
        to: destinatario,
        subject: 'VAGAS EXCEDIDAS', // assunto
        html: 
        '<h2>Olá '+nome+'!</h2><br>'+
        '<p>Desculpe mas sua matrícula não pode ser concluída pelo fato de todas as vagas já terem sido preenchidas, tente novamente no próximo semestre.</p>'      
    };
    //envia efetivamente o email com base nas configurações anteriores
    transporter.sendMail(mailOptions, function (err, info) {
        if(err){
            console.log("Erro gerado: " + err)
            //console.log("destinatario: "+destinatario)
            //console.log("nome: "+nome)
        }   
        else
            console.log("Info gerado: " + info);
    });

}

exports.recuperaSenhaMail = function(destinatario,senha,nome){
    //detalhes do email
    const mailOptions = {
        //posteriormente alterar o email adm por algum outro
        from: 'devopsprog@gmail.com', // remetente
        to: destinatario, // destinatario
        subject: 'RECUPERAÇÃO DE SENHA', // assunto
        html: 
        '<h1>Olá '+nome+'!</h1>'+
        '<h3><p>Segue abaixo os dados para acesso ao site:</p></h3>'+
            '<p><b>Login: </b>'+destinatario+'</p>'+
            '<p><b>Senha: </b>'+senha+'</p>'+
        '<br>'+
        '<h3>Acesse através do link: <a href="http://localhost:8080/login">http://localhost:8080/login</a></h3>'
    };
    //envia efetivamente o email com base nas configurações anteriores
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log("Erro gerado: " + err)
        else
            console.log("Info gerado: " + info);
    });
}