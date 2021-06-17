const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const slug = require('slug');
const bcrypt = require('bcryptjs');

var faker = require('faker');
var request = require('request');
const path = require('path');
const { Http2ServerResponse } = require('http2');
const { database } = require('faker');

const app = express();

// Uses do Helmet (cabeçalhos de segurança)
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());

app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Rota de instalação do banco de dados
app.get('/install', (req, res) => {
    faker.locale = 'pt_BR'
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }, function (err, client) {
        try {
            const db = client.db('teste-dfcom')
            const collection = db.collection('produtos')
            for (i = 0;i < 100;i++) {
                produto = faker.commerce.product()
                produto = {
                    nome: faker.commerce.product(),
                    descricao: faker.commerce.productAdjective(),
                    preco: faker.commerce.price() / 10,
                    productId: i
                }
                produto.slug = slug(produto.nome)
                collection.updateOne({ slug: produto.slug }, { $set: produto }, { upsert: true }, function (err, doc) {
                    // console.log("Adicionou: " + JSON.stringify(doc));
                })
            }
        } catch (err) {
            console.log('Erro no Banco de dados');
            throw err
        }

    })
    res.sendStatus(200)
});

// Rota para retornar todos os produtos do catálogo na resposta (formato JSON)
app.get('/todos', (req, res) => {
    var produtos = []
    try {
        MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }, function (err, client) {
            const db = client.db('teste-dfcom')
            const collection = db.collection('produtos')
            const catalogo = collection.find()
            catalogo.forEach(element => {
                produtos.push(element)
            }, function (err, doc) {
                res.json(produtos)
            });
        })
    } catch (err) {
        res.sendStatus(404)
    }
});

//Rota para persistir os favoritos no MongoDB
app.post('/favme', (req, res) => {
    MongoClient.connect(process.env.MONGO_URL, {useNewUrlParser: true}, function(err,client){
        const db = client.db('teste-dfcom')
        const usrCol = db.collection('users')
        usrCol.updateOne({ userId: req.body.userId }, { $set: {"favorites" :req.body.myFavs} }, function (err, doc) {
            return
        })
    })
})

// Rota para realizar o login
app.post('/login', (req, res) => {
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }, function (err, client) {
        const db = client.db('teste-dfcom');
        const usrCol = db.collection('users');
        usrCol.findOne({ email: req.body.username }, function (err, doc) {
            if (err) {
                res.sendStatus(404).json(tokenFail);
                return;
            }
            if (doc) {
                bcrypt.compare(req.body.password, doc.hash, function (err, result) {
                    if (err) {
                        res.status(500).json(tokenFail).end();
                    }
                    if (result) {
                        idToken = {myId: doc.userId, myFavs: doc.favorites }
                        res.status(200).json(idToken).end();
                    } else {
                        res.status(401).json(tokenFail).end();
                    }
                });
            } else {
                res.status(500).json(tokenFail);
                return
            }
        });
        client.close();
    })
});

app.listen(process.env.BACK_PORT)
console.log(new Date() + ' Servidor iniciado, ouvindo requisições na porta ' + process.env.PORT);

module.exports = app;