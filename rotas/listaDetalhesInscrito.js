//arquivo de extenção do api.js, possuirá as demais rotas do sistema
const express = require('express');
const router = express.Router();

const Operacoes = require("../model/Operacoes");
const Respostas = require("../model/Respostas");

router.get("/:id?", function(req, resp, next){
    //"erro" e "retorno" são parametros do callback
    //req.params retorna o valor definido na url de requisição
    Operacoes.getCandidato(req.params.id, function(error, retorno){
        //respondendo a requisição com a resposta padrao ja definida em "Respostas"
        let resposta = new Respostas();//instanciando
        //se ocorreu algum erro
        if(error){
            resposta.erro = true;
            resposta.msg = "Aconteceu um erro!";
            console.log("erro: ", erro);
        } else{
        //se não ocorreu nenhum erro, envia os dados de retorno
            resposta.dados = retorno;
        }
        resp.json(resposta);//respondendo a requisição ao cliente
    });
});

//INICIO TESTE

router.post("/", function(req, resp, next){
    let resposta = new Respostas();

    Operacoes.insereInscrito(req.body, function(error, retorno){
        console.log(req.body);

        if(error){
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro."
            console.log("erro: ", error);
            //deletarArquivo(req.body.caminho);
        }else{
            if(retorno.affectedRows > 0){
                resposta.msg = "Cadastro realizado com sucesso."
            }else{
                resposta.erro = true;
                resposta.msg = "Não foi possível realizar o cadastro."
                console.log("erro: ", error);
                //deletarArquivo(req.body.caminho);
            }
        }
        console.log('resp:', resposta);
        resp.json(resposta);
    });

    /*else{
        resposta.erro = true;
        resposta.msg = "Não foi enviado um vídeo."
        console.log("erro: ",  resposta.msg);
        resp.json(resposta)
    }*/
});
//FIM TESTE

module.exports = router;