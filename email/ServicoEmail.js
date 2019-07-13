//serviço de email temporario, posteriormente implementar em outro arquivo
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