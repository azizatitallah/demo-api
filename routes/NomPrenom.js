
const NomPrenom = require('express').Router();

NomPrenom.get('/nom', (req, res) => {
    var Type_intervention = req.body.Type_intervention;

    global.db.query('SELECT OP.Nom_op , OP.Prénom_op FROM `opérateur` as OP', (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json(results);
        }
    })
});

module.exports = NomPrenom;

