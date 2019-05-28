const api = require('express').Router();

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

api.get('/products', (req, res) => {
    global.db.query(`SELECT * FROM \`products\` `, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json(results);
        }
    })
});

api.get('/product/:id', (req, res) => {
    global.db.query(`SELECT * FROM \`products\` WHERE id = ${req.params.id}`, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json(results);
        }
    })
});

module.exports = api;