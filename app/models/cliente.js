/**
 * Arquivo: produto.js
 * Author: Pedro Curti
 * Descrição: arquivo responsável por tratar o modelo da classe 'Cliente'
 * Data: 04/12/2021
 */

 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 
 var ClienteSchema = new Schema({
     nome: String,
     cpf: Number,
     dataNascimento: Number,
     telefone: Number
 });
 
 module.exports = mongoose.model('Cliente', ClienteSchema);