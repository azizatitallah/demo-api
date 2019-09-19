const operateur = require('express').Router();


//Marquer les operateurs presents 

operateur.post('/presence', (req, res) => {
    console.log(req.body);
    var Matricule = req.body.Matricule;
    var sql = `INSERT INTO \`travaille\` (Matricule) VALUES`;
    for (var i = 0; i < Matricule.length; i++) {   
        console.log(Matricule[i]);
        sql = `${sql} (${Matricule[i]}),`; 
    }

    sql = sql.substring(0, sql.length - 1);
    
    global.db.query(sql, [Matricule] ,(error, results, fields)  => {
       
        if (error) {
            console.error(error);
            res.status(400).json(error);
        }  else {
            res.json("intervention ajouté");    
        }
    })
});

//selectt les operateurs presents
operateur.get('/operateurPresent', (req, res) => {
    sql= `SELECT opérateur.Nom_op, opérateur.Prenom_op, Time(travaille.Début) as date, travaille.Fin
    FROM \`travaille\`, \`opérateur\`
    WHERE opérateur.Matricule=travaille.Matricule and Début >= CURDATE() AND Début < CURDATE() + INTERVAL 1 DAY `;
    global.db.query(sql, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json(results);
        }
    })
});


// Sortie operateurs

operateur.put('/:Matricule', (req, res) => {
        console.log(req.body);
   
        global.db.query( `UPDATE \`travaille\` SET Fin= NOW() WHERE Matricule=${req.params.Matricule}`,  (error, results, fields) => {   
    
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json("update");
            
        }
    })
});

module.exports = operateur;
