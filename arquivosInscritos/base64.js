//CONVERSAO IMG P/ BASE64
var fs = require('fs');
// função para codificar dados de arquivo para string codificada base64
function base64_encode(file) {
    // ler dados binários
    var bitmap = fs.readFileSync(file);
    // converter dados binários em string codificada na base64
    return new Buffer(bitmap).toString('base64');
}
// função para criar arquivo de string codificada em base64
function base64_decode(base64str, file) {
    // Para criar o objeto buffer a partir da string codificada base64, é importante informar ao construtor que a string é codificada na base64
    var bitmap = new Buffer(base64str, 'base64');
    // buffer de gravação para arquivo
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}
// converter imagem em string codificada em base64
var base64str = base64_encode('teste.png');
console.log(base64str);
// converter string base64 de volta para a imagem
base64_decode(base64str, 'copy_teste.png');