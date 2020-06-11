const functions = require('firebase-functions');
const cors = require('cors')
const express = require("express");

const app = express();
app.use(cors({origin: true}))

app.get('/villagers', (req, res) => {
    res.send({status: "charlie <3"});
})

app.get('/items', (req, res) => {
    res.send({whatever: "william"})
})


exports.api = functions.https.onRequest(app);

