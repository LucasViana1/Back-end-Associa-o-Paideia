const express = require('express');
const router = express.Router();

const Operacoes = require("../model/Operacoes");
const Respostas = require("../model/Respostas");
//let multer = require("multer");

router.post("/", function(req, resp, next){
    let resposta = new Respostas();
    //"req.body" possui os dados que sera salvo no banco
    Operacoes.insereInscrito(req.body, function(error, retorno){
        
        if(error){
            resposta.erro = true;
            resposta.msg = "Aconteceu um erro!";
            console.log("erro: ", erro);
        } else{
            //verifica se algo foi salvo no banco 
            if(resposta.affectedRows > 0){
                resposta.msg = "Inscrição enviada com sucesso!";
            }else{
                resposta.erro = true;
                resposta.msg = "Falha na incrição";
                console.log("erro: ", erro);
            }
        }
        
        console.log("resposta: ", resposta);
        resp.json(resposta);
    });
});

module.exports = router;