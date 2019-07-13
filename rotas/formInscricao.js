const express = require('express');
const router = express.Router();

//const Operacoes = require("../model/Operacoes");
//const Respostas = require("../model/Respostas");

router.get("/", function(req, resp){
    resp.sendFile(__dirname + "/formulario.html");
});

module.exports = router;