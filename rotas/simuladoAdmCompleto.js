//arquivo de extenção do api.js, possuirá as demais rotas do sistema
const express = require("express");
const router = express.Router();

const Operacoes = require("../model/Operacoes");
const Respostas = require("../model/Respostas");

router.get("/", function(req, resp, next) {
  Operacoes.getSimuladoAdmCompleto(function(error, retorno) {
    let resposta = new Respostas();
    if (error) {
      resposta.erro = true;
      resposta.msg = "Aconteceu um erro!";
      console.log("erro: ", erro);
    } else {
      resposta.dados = retorno;
    }
    resp.json(resposta);
  });
});

module.exports = router;
