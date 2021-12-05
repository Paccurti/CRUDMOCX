var express = require('express');
var app = express();
var BodyParser = require('body-parser');
var mongoose = require('mongoose');
var cliente = require('./app/models/cliente');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/node-crud-api');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.port || 8000;

var router = express.Router();

router.get('/', function(req, res){
    res.json({message: 'Faça seu Cadastro'})
});

app.use('/api', router);

app.listen(port);
console.log("Iniciando a app na porta" + port);