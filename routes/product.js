const product = require('express').Router();

product.get('/all', (req, res) => {
    global.db.query('SELECT * FROM `products` ', (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json(results);
        }
    })
});

product.get('/:id', (req, res) => {
    global.db.query(`SELECT * FROM \`products\` WHERE id = ${req.params.id}`, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json(results);
        }
    })
});

module.exports = product;