const api = require('express').Router();
const product = require('./product.js');
const intervention = require('./intervention.js');
const NomPrenom= require('./NomPrenom');
const categorie = require('./categorie.js');
const operation = require('./operation.js');
const operateur = require('./operateur.js');
const effectue = require('./effectue.js');
api.use('/product', product);
api.use('/intervention', intervention);
api.use('/operation', operation);
api.use('/NomPrenom', NomPrenom);
api.use('/categorie', categorie);
api.use('/operateur', operateur);
api.use('/effectue', effectue);
api.get('/', (req, res) => {
    res.status(200).json('This is My first True End Point');
});

api.get('/test', (req, res) => {
    res.status(200).json('This is a real Test Now');
});

api.get('/Salem/:name', (req, res) => {

    const hiSentence =`Saleem ${req.params.name}!`;

    if (req.params.name == 'asma') {
        res.json(hiSentence);
    } else {
        res.send(`${hiSentence}
        Haven't You Seen Is Asma?`);
    }
});

module.exports = api;