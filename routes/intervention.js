const intervention = require('express').Router();


intervention.get('/all', (req, res) => {
    global.db.query('SELECT Time(Reclamation) as Reclamation , ID, Num_Machine, id_categorie_intervention, Matricule_mecanicien, Debut, Fin, Date, TypeMachine, Etat_Intervention, chaine FROM `intervient` WHERE Etat_Intervention="En Attente"', (error, results, fields) => {
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


intervention.get('/mecano/:Matricule', (req, res) => {
    global.db.query(`SELECT Prenom_mecanicien FROM \`mécanicien\` WHERE Matricule_mecanicien=${req.params.Matricule}`, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json(results);
        }
    })
});
//Intervention par catégorie 
intervention.get('/interventionCategorie', (req, res) => {
    global.db.query(`SELECT catégorie_intervention.Type_intervention, COUNT(*) AS Compte
FROM \`catégorie_intervention\`, \`intervient\`
WHERE catégorie_intervention.id_categorie_intervention=intervient.id_categorie_intervention
GROUP BY Type_intervention`, (error, results, fields) => {
if (error) {
    console.error(error);
    res.status(400).json(error);
} else {
    res.json(results);
}
console.log(results);
})
});


// Nombre d'intervention par catégorie par Type de machine
intervention.get('/interventionCategorieMachine', (req, res) => {
    global.db.query(`SELECT catégorie_intervention.Type_intervention, intervient.TypeMachine, COUNT(*) AS Compte
    FROM \`catégorie_intervention\`, \`intervient\`
    WHERE catégorie_intervention.id_categorie_intervention=intervient.id_categorie_intervention
    GROUP BY TypeMachine
    `, (error, results, fields) => {
if (error) {
    console.error(error);
    res.status(400).json(error);
} else {
    res.json(results);
}
console.log(results);
})
});

// Nombre d'intervention par type de machine
intervention.get('/interventionTypeMachine', (req, res) => {
    global.db.query(`SELECT TypeMachine , COUNT(*) AS Compte
    FROM \`intervient\`
    GROUP BY TypeMachine`, (error, results, fields) => {
if (error) {
    console.error(error);
    res.status(400).json(error);
} else {
    res.json(results);
}
console.log(results);
})
});

// temps d'attente vs temps intervention
intervention.get('/interventionAttente', (req, res) => {
    global.db.query(`SELECT SUM(TIMESTAMPDIFF(MINUTE, Time(Reclamation), Time(Debut))) AS Attente , SUM(TIMESTAMPDIFF(MINUTE, Time(Debut) , Time(Fin))) AS Intervention
    FROM \`intervient\``, (error, results, fields) => {
if (error) {
    console.error(error);
    res.status(400).json(error);
} else {
    res.json(results);
}
console.log(results);
})
});




intervention.post('/create', (req, res) => {
    console.log(req.body);
    var mecanicien = req.body.mecanicien;
    var NumMachine = req.body.NumMachine;
    var Debut = req.body.Debut;
    var Fin = req.body.Fin;
    var Categorie = req.body.Categorie ;
    var chaine = req.body.chaine;
    var TypeMachine = req.body.TypeMachine;
    var sql = `INSERT INTO \`intervient\` (Matricule_mecanicien, Num_Machine,  Debut, Fin, id_categorie_intervention, chaine, TypeMachine) VALUES ( ${mecanicien}, ${NumMachine}, FROM_UNIXTIME(${Debut}), FROM_UNIXTIME(${Fin}), "${Categorie}",  "${chaine}", "${TypeMachine}")`;
    console.log(sql)
    global.db.query(sql, [mecanicien, NumMachine,  Debut, Fin, Categorie, chaine, TypeMachine], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json("intervention ajouté");
            
        }
        console.log(req.body)
    })
});

intervention.put('/update', (req, res) => {
    console.log(req.body);
    var mecanicien = req.body.mecanicien;
    var NumMachine = req.body.NumMachine;
    var Debut = req.body.Debut;
    var Fin = req.body.Fin;
    var Categorie = req.body.Categorie ;
    var chaine = req.body.chaine;
    var TypeMachine = req.body.TypeMachine;
    var sql = `UPDATE \`intervient\`
        INNER JOIN (SELECT MIN(id) AS id
          FROM \`intervient\`
          GROUP BY Etat_Intervention) m ON intervient.id = m.id and Etat_Intervention="En Attente"
      SET intervient.Matricule_mecanicien=${mecanicien}, intervient.Num_Machine=${NumMachine},  intervient.Debut=FROM_UNIXTIME(${Debut}), intervient.Fin=FROM_UNIXTIME(${Fin}), intervient.id_categorie_intervention=${Categorie}, intervient.chaine="${chaine}", intervient.Etat_Intervention = "Réalisée"  `;


    global.db.query( sql, [mecanicien, NumMachine,  Debut, Fin, Categorie, chaine, TypeMachine] ,(error, results, fields) => {   

    if (error) {
        console.error(error);
        res.status(400).json(error);
    } else {
        res.json("update");
        
    }
})
});
module.exports = intervention;

