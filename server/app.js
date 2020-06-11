const express = require('express')
const app = express()
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://cholegod:F5ckM3D4dd7@cruzandoanimales-fk5mo.azure.mongodb.net/CruzandoAnimales?retryWrites=true&w=majority";
 
app.get('/api/test', (req, res) => {
    var toSend;
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
 
app.listen(3000, () => console.log('blog server running on port 3000!'))
