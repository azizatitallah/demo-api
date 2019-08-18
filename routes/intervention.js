const intervention = require('express').Router();

intervention.get('/all', (req, res) => {
    global.db.query('SELECT * FROM `intervention`', (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json(results);
        }
    })
});

intervention.post('/create', (req, res) => {
    var ID = req.body.ID;
    var mecanicien = req.body.mecanicien;
    var Date = req.body.Date;
    var NumMachine = req.body.NumMachine;
    var Reclamation = req.body.Reclamation;
    var Debut = req.body.Debut;
    var Fin = req.body.Fin;
    var Categorie = req.body.Categorie ;
    var chaine = req.body.chaine;
    var TypeMachine = req.body.TypeMachine;
    var sql = `INSERT INTO \`intervention\` (ID, mecanicien, Date, NumMachine, Reclamation, Debut, Fin, Categorie, chaine, TypeMachine) VALUES ("${ID}", "${mecanicien}", "${Date}", "${NumMachine}", "${Reclamation}", "${Debut}", "${Fin}", "${Categorie}",  "${chaine}", "${TypeMachine}")`;
    
    global.db.query(sql, [ID, mecanicien, Date, NumMachine, Reclamation, Debut, Fin, Categorie, chaine, TypeMachine], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json("intervention ajouté");
            
        }
    })
});


module.exports = intervention;

