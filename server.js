/**
 * 
 * Arquivo: server.js
 * Descrição: 
 * Author:
 * Data de Criação: 04/12/2021
 * 
 */

// Configurar o Setup da App:

//Chamadas dos pacotes:
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Cliente = require('./app/models/cliente');
mongoose.Promise = global.Promise;

//MLocal: MongoDb:
mongoose.connect('mongodb://localhost:27017/node-crud-api', {
    useMongoClient: true
});

//mongoose.connect('mongodb+srv://paccurti:Pa230597@cluster0.cmtrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  //  useMongoClient: true
//});

//Configuração da variável app para usar o 'bodyParser()':
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Definindo a porta onde será executada a api:
var port = process.env.port || 8000;

//Rotas da API:
//=============================================================================

//Criando uma instância das Rotas via Express:
var router = express.Router();

//Middleware para usar em todos os requests enviados para a API- Mensagem Padrão:
router.use(function(req, res, next) {
    console.log('Algo está acontecendo aqui....');
    next(); //aqui é para sinalizar o prosseguimento para a próxima rota.
});

//Rota de Teste do funcionamento (acessar através: GET: http://localhost:8000/api): 
router.get('/', function(req, res) {
    res.json({ message: 'Cadastrar Cliente' })
});

//API's:
//==============================================================================

//Rotas que terminarem com '/clientes' (servir: GET ALL & POST)
router.route('/clientes')

    /* 1) Método: Criar Cliente (acessar em: POST http://localhost:8000/api/clientes)  */
    .post(function(req, res) {
        var cliente = new Cliente();

        //Setando os campos do cliente (via request):
        cliente.nome = req.body.nome;
        cliente.cpf = req.body.cpf;
        cliente.dataNascimento = req.body.dataNascimento;
        cliente.telefone = req.body.telefone;

        cliente.save(function(error) {
            if(error)
                res.send('Erro ao tentar salvar o Cliente....: ' + error);
            
            res.json({ message: 'Cliente Cadastrado com Sucesso!' });
        });
    })

    /* 2) Método: Selecionar Todos Clientes (acessar em: GET http://localhost:8000/api/clientes)  */
    .get(function(req, res) {
        Cliente.find(function(error, clientes) {
            if(error) 
                res.send('Erro ao tentar Selecionar Todos os clientes...: ' + error);

            res.json(clientes);
        });
    });

    //Rotas que irão terminar em '/clientes/:cliente_id' (para: GET, PUT & DELETE: id):
    router.route('/clientes/:cliente_id')

    /* 3) Método: Selecionar por Id: (acessar em: GET http://localhost:8000/api/clientes/:cliente_id) */
    .get(function (req, res) {
        
        //Função para poder Selecionar um determinado cliente por ID - irá verificar se caso não encontrar um detemrinado
        //cliente pelo id... retorna uma mensagem de error:
        Cliente.findById(req.params.cliente_id, function(error, cliente) {
            if(error)
                res.send('Id do Cliente não encontrado....: ' + error);

            res.json(cliente);
        });
    })

    /* 4) Método: Atualizar por Id: (acessar em: PUT http://localhost:8000/api/clientes/:cliente_id) */
    .put(function(req, res) {

        Cliente.findById(req.params.cliente_id, function(error, cliente) {
            if (error) 
                res.send("Id do Cliente não encontrado....: " + error);

                 
                cliente.nome = req.body.nome;
                cliente.cpf = req.body.cpf;
                cliente.dataNascimento = req.body.dataNascimento;
                cliente.telefone = req.body.telefone;

                
                cliente.save(function(error) {
                    if(error)
                        res.send('Erro ao atualizar o cliente....: ' + error);

                    res.json({ message: 'Cliente atualizado com sucesso!' });
                });
            });
        })

        /* 5) Método: Excluir por Id (acessar: http://localhost:8000/api/clientes/:cliente_id) */
        .delete(function(req, res) {
            
            Cliente.remove({
                _id: req.params.cliente_id
                }, function(error) {
                    if (error) 
                        res.send("Id do Cliente não encontrado....: " + error);

                    res.json({ message: 'Cliente Excluído com Sucesso!' });
                });
            });


//Definindo um padrão das rotas prefixadas: '/api':
app.use('/api', router);

//Iniciando a Aplicação (servidor):
app.listen(port);
console.log("Iniciando a app na porta " + port);