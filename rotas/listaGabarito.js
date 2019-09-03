//arquivo de extenção do api.js, possuirá as demais rotas do sistema
const express = require('express');
const router = express.Router();

const Operacoes = require("../model/Operacoes");
const Respostas = require("../model/Respostas");

router.get("/", function(req, resp, next){
    //"erro" e "retorno" são parametros do callback
    Operacoes.getQtdPerguntasSimulado(function(error, retorno){
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

module.exports = router;