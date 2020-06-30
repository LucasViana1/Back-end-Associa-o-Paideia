//serviço de email temporario, posteriormente implementar em outro arquivo
const nodemailer = require("nodemailer");

const remetente = process.env.EMAILUSER;
const senhaRemetente = process.env.EMAILPASSWORD;

const respAuto =
  "<p>Favor não responder esse e-mail, se quiser entrar em contato conosco utilize o e-mail <em>contato@associacaopaideia.org.br</em></p>";
//serviço de transporte de email
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //smtp-relay.gmail.com
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: remetente,
    pass: senhaRemetente,
  },
  tls: {
    rejectUnauthorized: false, //rejeita autorização acesso ao email, talvez remover
  },
});

exports.cadastroMail = function (destinatario, senha, nome, codigo) {
  //detalhes do email
  const mailOptions = {
    //posteriormente alterar o email adm por algum outro
    from: remetente,
    to: destinatario, // destinatario
    subject: "CONFIRMAÇÃO DE CADASTRO", // assunto
    html: "<h1>Olá " +
      nome +
      "!</h1>" +
      "<h2>Seu cadastro ao Sistema da Associação Paideia foi realizado com sucesso!</h2><br>" +
      "<p>O cadastro é necessário para que seja dado prosseguimento a inscrição.</p><br>" +
      "<h3>APENAS ESSE CADASTRO NÃO GARANTE SUA VAGA!</h3><br>" +
      "<p>Você já pode preencher seu formulario de inscrição, dados para acesso:</p>" +
      "<p><b>Login: </b>" +
      destinatario +
      "</p>" +
      "<p><b>Senha: </b>" +
      senha +
      "</p>" +
      "<p><b>Código (para válidar o primeiro acesso): </b>" +
      codigo +
      "</p>" +
      "<br>" +
      '<h3>Acesse através do link: <a href="https://www.associacaopaideia.org.br/acesso">https://www.associacaopaideia.org.br/acesso</a></h3>' +
      "<br>" +
      respAuto,
  };
  //envia efetivamente o email com base nas configurações anteriores
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log("Erro gerado: " + err);
    else console.log("Info gerado: " + info);
  });
};

exports.listaEsperaMail = function (destinatario, nome, matricula) {
  const mailOptions = {
    from: remetente,
    to: destinatario,
    subject: "CONFIRMAÇÃO DE INSCRIÇÃO", // assunto
    html: "<h2>Olá " +
      nome +
      "!</h2><br>" +
      "<p>Sua inscrição para o segundo semestre de 2020 foi efetuada com sucesso e sua inscrição consta na lista de espera " +
      "(lembramos que você precisa participar de todas as etapas igualmente).</p>" +
      "<p>Seu número de matrícula é: " +
      matricula +
      ". </p><br>" +
      "Em anexo o termo de responsabilidade, que deverá ser entregue impresso no dia da reunião de confirmação" +
      "<br>" +
      respAuto,

    attachments: {
      path: __dirname + "/termo_responsabilidade.pdf",
    },
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log("Erro gerado: " + err);
    } else console.log("Info gerado: " + info);
  });
};

exports.listaRegularMail = function (destinatario, nome, matricula) {
  const mailOptions = {
    from: remetente,
    to: destinatario,
    subject: "CONFIRMAÇÃO DE INSCRIÇÃO", // assunto
    html: "<h2>Olá " +
      nome +
      "!</h2><br>" +
      "<p>Sua inscrição para o segundo semestre de 2020 foi efetuada com sucesso e sua inscrição consta na lista regular.</p>" +
      "<p>Seu número de matrícula é: " +
      matricula +
      " </p><br>" +
      "Em anexo o termo de responsabilidade, que deverá ser preenchido, digitalizado e enviado no E-mail de contato da Associação (caso não tenha sido enviado durante a inscrição!)" +
      "<br>" +
      "<p>A Prova Diagnóstica não é instrumento de seleção e sim um mapa que utilizamos como instrumento para orientação nos estudos. " +
      "Faça a Prova Diagnóstica com o máximo de atenção e comprometimento. Ela estará disponível em nosso sistema apenas nos dias 04/07/2020 e 25/07/2020 " +
      "durante todo o dia (das 00:00 até 23:59), " +
      "acesse o simulado pelo link (esse link estará disponível apenas nos dias de simulado) " +
      '<a href="https://www.associacaopaideia.org.br/simulado">https://www.associacaopaideia.org.br/simulado</a>' +
      "<br>" +
      " Nós do Focus Pré-vestibular desejamos a você boas vindas e um ano pleno de realizações. </p>" +
      "<br>" +
      respAuto,
    attachments: {
      path: __dirname + "/termo_responsabilidade.pdf",
    },
  };
  //envia efetivamente o email com base nas configurações anteriores
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log("Erro gerado: " + err);
      //console.log("destinatario: "+destinatario)
      //console.log("nome: "+nome)
    } else console.log("Info gerado: " + info);
  });
};

exports.cancelaInscricao = function (destinatario) {
  const mailOptions = {
    from: remetente,
    to: destinatario,
    subject: "INSCRIÇÃO CANCELADA", // assunto
    html: "<h2>Caro (a) candidato (a).</h2><br>" +
      "<p>Verificamos em nosso sistema que você não executou corretamente alguns dos passos necessários para efetivar sua inscrição, podendo ser:</p> " +
      "<ul>" +
      "<li>Cópia do RG, CPF e uma fotografia recente 3x4 do (a) candidato (a) – pode utilizar uma “selfie” com boa qualidade e luz;</li>" +
      "<li>Cópia do RG e CPF dos responsáveis legais (menores de 18 anos);</li>" +
      "<li>Cópia do Termo de Responsabilidade em duas vias, assinado pelo (a) candidato (a) ou pelos responsáveis legais, quando menor de 18 anos de idade (necessário apenas à impressão e entrega na data da entrevista);</li>" +
      "<li>Cópia do Comprovante de endereço (conta de luz, água, telefone, aluguel, IPTU e IPVA), desde que seja atualizado (último mês vigente ou do ano vigente de 2020);</li>" +
      "<li>Cópia do Cartão Cidadão (folha individual);</li>" +
      "<li>Comprovante de matrícula do Ensino Médio, se o candidato estiver cursando ou Certificado de Conclusão, se já concluiu;</li>" +
      "<li>Histórico escolar do Ensino Médio;</li>" +
      "<li>Boleto ou Atestado que comprove Bolsa no Ensino Médio (no caso de alunos bolsistas de Escolas Particulares);</li>" +
      "<li>Comprovante de matrícula no terceiro termo do EJA (Ensino de Jovens e Adultos);</li>" +
      "</ul>" +
      "<br>" +
      "<p>Pedimos para que entre com contato conosco pelo e-mail e tire suas dúvidas: contato@associacaopaideia.org.br.</p>" +
      "<br>" +
      "Atenciosamente," +
      "Focus Cursinho.",
  };
  //envia efetivamente o email com base nas configurações anteriores
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log("Erro gerado: " + err);
      //console.log("destinatario: "+destinatario)
      //console.log("nome: "+nome)
    } else console.log("Info gerado: " + info);
  });
};

exports.listaCheiaMail = function (destinatario, nome) {
  const mailOptions = {
    from: remetente,
    to: destinatario,
    subject: "VAGAS EXCEDIDAS", // assunto
    html: "<h2>Olá " +
      nome +
      "!</h2><br>" +
      "<p>Desculpe mas sua matrícula não pode ser concluída pelo fato de todas as vagas já terem sido preenchidas, tente novamente no próximo semestre.</p>" +
      "<br>" +
      respAuto,
  };
  //envia efetivamente o email com base nas configurações anteriores
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log("Erro gerado: " + err);
      //console.log("destinatario: "+destinatario)
      //console.log("nome: "+nome)
    } else console.log("Info gerado: " + info);
  });
};

exports.recuperaSenhaMail = function (destinatario, senha, nome) {
  //detalhes do email
  const mailOptions = {
    //posteriormente alterar o email adm por algum outro
    from: remetente,
    to: destinatario, // destinatario
    subject: "RECUPERAÇÃO DE SENHA", // assunto
    html: "<h1>Olá " +
      nome +
      "!</h1>" +
      "<h3><p>Segue abaixo os dados para acesso ao site:</p></h3>" +
      "<p><b>Login: </b>" +
      destinatario +
      "</p>" +
      "<p><b>Senha: </b>" +
      senha +
      "</p>" +
      "<br>" +
      '<h3>Acesse através do link: <a href="https://www.associacaopaideia.org.br/acesso">https://www.associacaopaideia.org.br/acesso</a></h3>' +
      "<br>" +
      respAuto,
  };
  //envia efetivamente o email com base nas configurações anteriores
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log("Erro gerado: " + err);
    else console.log("Info gerado: " + info);
  });
};