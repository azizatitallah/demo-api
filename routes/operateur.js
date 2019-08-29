const operateur = require('express').Router();





operateur.post('/presence', (req, res) => {
    console.log(req.body);
    var Matricule = req.body.Matricule;
    var sql = `INSERT INTO \`travaille\` (Matricule) VALUES`;
    for (var i = 0; i < Matricule.length; i++) {   
        console.log(Matricule[i]);
        sql = `${sql} (${Matricule[i]}),`; 
    }
    
    global.db.query(sql, [Matricule] ,(error, results, fields)  => {
       
        if (error) {
            console.error(error);
            res.status(400).json(error);
        }  else {
            res.json("intervention ajouté");
            
        }
    })

});


module.exports = operateur;

