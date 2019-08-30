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
intervention.get('/mecano', (req, res) => {
    global.db.query('SELECT * FROM `mécanicien`', (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json(results);
        }
    })
});


intervention.post('/create', (req, res) => {
    console.log(req.body);
    var mecanicien = req.body.mecanicien;
    var NumMachine = req.body.NumMachine;
    var Reclamation = req.body.Reclamation;
    var Debut = req.body.Debut;
    var Fin = req.body.Fin;
    var Categorie = req.body.Categorie ;
    var chaine = req.body.chaine;
    var TypeMachine = req.body.TypeMachine;
    var sql = `INSERT INTO \`intervient\` (Matricule_mecanicien, Num_Machine, Reclamation, Debut, Fin, id_categorie_intervention, chaine, TypeMachine) VALUES ( ${mecanicien}, ${NumMachine}, "${Reclamation}", FROM_UNIXTIME(${Debut}), FROM_UNIXTIME(${Fin}), "${Categorie}",  "${chaine}", "${TypeMachine}")`;
    console.log(sql)
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

