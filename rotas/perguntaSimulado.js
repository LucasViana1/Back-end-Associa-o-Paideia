const express = require('express');
const router = express.Router();

const Operacoes = require("../model/Operacoes");
const Respostas = require("../model/Respostas");

router.get("/:id?", function(req, resp, next){
    Operacoes.getSimulado(req.params.id, function(error, retorno){
        let resposta = new Respostas();
        if(error){
            resposta.erro = true;
            resposta.msg = "Aconteceu um erro!";
            console.log("erro: ", erro);
        } else{
            resposta.dados = retorno;
            //console.log("retorno pergunta: "+resposta.dados[0].pergunta)
        }
        resp.json(resposta);
    });
});

module.exports = router;