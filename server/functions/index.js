const functions = require('firebase-functions');
const cors = require('cors')
const express = require("express");
const app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://cholegod:F5ckM3D4dd7@cruzandoanimales-fk5mo.azure.mongodb.net/CruzandoAnimales?retryWrites=true&w=majority";

app.use(cors({origin: false}))

var toSend;

// Traer todos los villagers
app.get('/get_all_villagers', (req, res) => {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        const db = client.db('CruzandoAnimales');
        const collection = db.collection('villagers');
        collection.find().toArray((err, data) => {
            toSend=data;
            res.send(toSend)
        })
    });
})

// Traer n villagers
app.get('/get_many_villagers/:many', (req, res) => {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        const db = client.db('CruzandoAnimales');
        const collection = db.collection('villagers');
        collection.find().limit(req.params.many).toArray((err, data) => {
            toSend=data;
            res.send(toSend)
        })
    });
})

//Traer todos los ítems
app.get('/get_all_items', (req, res) => {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        const db = client.db('CruzandoAnimales');
        const collection = db.collection('items');
        collection.find().toArray((err, data) => {
            toSend=data;
            res.send(toSend)
        })
    });
})

// Traer n ítems
app.get('/get_many_items/:many', (req, res) => {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        const db = client.db('CruzandoAnimales');
        const collection = db.collection('items');
        
        collection.find().limit(+req.params.many).toArray((err, data) => {
            toSend=data;
            res.send(toSend)
        })
    });
})

// Traer todo el doc de un villager
app.get('/get_villager/:name', (req, res) => {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        const db = client.db('CruzandoAnimales');
        const collection = db.collection('villagers');
        collection.findOne({name: new RegExp(req.params.name)}, (err, data) => {
            toSend=data;
            res.send(toSend)
        })
    });
})

// Traer la imagen de un villager
app.get('/get_villager_image/:name', (req, res) => {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        const db = client.db('CruzandoAnimales');
        const collection = db.collection('villagers');
        collection.findOne({name: req.params.name}, {projection : { _id : 0, url : 1 }}, (err, data) => {
            toSend=data.url;
            res.send(toSend)
        })
    });
})

// Traer todo el doc de un ítem
app.get('/get_item/:name', (req, res) => {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        const db = client.db('CruzandoAnimales');
        const collection = db.collection('items');
        collection.findOne({name: new RegExp(req.params.name)}, (err, data) => {
            toSend=data;
            res.send(toSend)
        })
    });
})

// Traer la imagen de un ítem
app.get('/get_item_image/:name', (req, res) => {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        const db = client.db('CruzandoAnimales');
        const collection = db.collection('items');
        collection.findOne({name: req.params.name}, {projection : { _id : 0, image_url : 1 }}, (err, data) => {
            toSend=data.image_url;
            res.send(toSend)
        })
    });
})

// Traer los ítems bajo C categoria
app.get('/get_item_category/:category', (req, res) => {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        const db = client.db('CruzandoAnimales');
        const collection = db.collection('items');
        collection.find({category: new RegExp(req.params.category)}).toArray((err, data) => {
            toSend=data;
            res.send(toSend)
        })
    });
})

// Traer todo el doc de un user
app.get('/get_user/:id', (req, res) => {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        const db = client.db('CruzandoAnimales');
        const collection = db.collection('users');
        collection.findOne({username: req.params.id}, (err, data) => {
            toSend=data;
            res.send(toSend)
        })
    });
})

// Traer los villagers favoritos de un user
app.get('/get_user_villagers/:id', (req, res) => {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        const db = client.db('CruzandoAnimales');
        const collection = db.collection('users');
        collection.findOne({username: req.params.id}, {projection : { _id : 0, villagers : 1 }}, (err, data) => {
            toSend=data;
            res.send(toSend)
        })
    });
})

// Autorizar el acceso a un usuario
app.post('/auth_user', (req, res) => {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        const db = client.db('CruzandoAnimales');
        const collection = db.collection('users');
        collection.findOne({username : req.body.username}, { projection : {_id : 0, username : 1, password : 1} }, (err, data) => {
            if(req.body.password == data.password){
                console.log("Welcome, " + req.body.username + "!");
                res.send({status : true, username : req.body.username})
            } else {
                console.log("Incorrect user and/or password");
                res.send({status : false})
            }
            
        })
    });
})

// Registrar un nuevo usuario
app.post('/register_user/', (req, res) => {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        const db = client.db('CruzandoAnimales');
        const collection = db.collection('users');
        collection.insertOne(req.body, (err, data) => {
            if (!err) {
                console.log("User " + req.body.username + " inserted");
                res.send({status : true, username : req.body.username})
            } else {
                console.log("Username already exists");
                res.send({status : false})
                throw err
            }
        })
    });
})

// Modificar los datos del villager del usuario
app.post('/update_villager/', (req, res) => {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        const db = client.db('CruzandoAnimales');
        const collection = db.collection('users');
        collection.updateOne({username : req.body.username}, { villager_name : req.body.villager_name, villager_birthday : req.body.villager_birthday }, (err, data) => {
            console.log("Villager updated");
        })
    });
})

// Agregar un villager a los favoritos del usuario
app.post('/add_villager', (req, res) => {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        const db = client.db('CruzandoAnimales');
        const collection = db.collection('villagers');
        var villager
        collection.findOne({name : req.body.villager}, (err, data) => {
            villager = data
            const collection2 = db.collection('users');
            collection2.updateOne({username : req.body.username}, { $push : { villagers : villager } }, (err, data) => {
            console.log("Villager inserted");
            console.log(villager)
            res.send({status: true})
            })
        })
        
        
    });
})

// Modificar los datos de la isla de un usuario
app.post('/update_island/', (req, res) => {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        const db = client.db('CruzandoAnimales');
        const collection = db.collection('users');
        collection.updateOne({username : req.body.username}, { island : { name : req.body.island.name, fruit : req.body.island.fruit }}, (err, data) => {
            console.log("Island updated");
        })
    });
})

// Traer todas las categorias de ítems existentes
app.get('/get_categories', (req, res) => {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        const db = client.db('CruzandoAnimales');
        const collection = db.collection('categories');
        collection.find().toArray((err, data) => {
            toSend=data;
            res.send(toSend)
        })
    });
})

exports.api = functions.https.onRequest(app);

