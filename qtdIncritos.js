const operacoes = require("./model/Operacoes")



exports.getTodos = function(){
    var qtd = 0
    operacoes.getQtdInscritos(function(error, retorno){
        //console.log("retorno: "+retorno[0].id)  
        retorno.forEach(element => {
            console.log("retorno: "+element.id)
            qtd++
        });  
        console.log('total: '+qtd) 
        
    })
    //console.log(x)
    //return qtd
    
}

