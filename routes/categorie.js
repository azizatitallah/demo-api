
const categorie = require('express').Router();




categorie.get('/all', (req, res) => {
    var Type_intervention = req.body.Type_intervention;

    global.db.query('SELECT * FROM `catégorie_intervention` ', (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json(results);
        }
    })
});

module.exports = categorie;

