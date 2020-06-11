const express = require('express')
const app = express()

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://cholegod:F5ckM3D4dd7@cruzandoanimales-fk5mo.azure.mongodb.net/<dbname>?retryWrites=true&w=majority";
 
app.get('/api/test', (req, res) => {
    /*var toSend;
    MongoClient.connect(uri, (err, client) => {
        if(!err) {
            const db = client.db('CruzandoAnimales');
            const collection = db.collection('villagers');

            collection.find().toArray((err, data) => {
                toSend = data
            })
        }
    });*/
    res.send("carlos")
})
 
app.listen(3000, () => console.log('blog server running on port 3000!'))
