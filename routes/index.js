const api = require('express').Router();
const product = require('./product.js');
const intervention = require('./intervention.js');
api.use('/product', product);
api.use('/intervention', intervention);
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