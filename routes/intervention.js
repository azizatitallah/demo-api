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
    
    var mecanicien = req.body.mecanicien;
    var NumMachine = req.body.NumMachine;
    var Reclamation = req.body.Reclamation;
    var Debut = req.body.Debut;
    var Fin = req.body.Fin;
    var Categorie = req.body.Categorie ;
    var chaine = req.body.chaine;
    var TypeMachine = req.body.TypeMachine;
    console.log(req.body)
    var sql = `INSERT INTO \`intervention\` (mecanicien, NumMachine, Reclamation, Debut, Fin, Categorie, chaine, TypeMachine) VALUES ( "${mecanicien}", "${NumMachine}", "${Reclamation}",Debut , Fin, "${Categorie}",  "${chaine}", "${TypeMachine}")`;
    
    global.db.query(sql, [mecanicien, NumMachine, Reclamation, Debut, Fin, Categorie, chaine, TypeMachine], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json("intervention ajouté");
            
        }
        console.log(req.body)
    })
});


module.exports = intervention;

