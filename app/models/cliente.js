var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = new Schema({
    nome: String,
    cpf: Number,
    dataNascimento: Date,
    telefone: Number
});

module.exports = mongoose.model('Cliente', ClienteSchema);