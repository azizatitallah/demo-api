const operateur = require('express').Router();





operateur.post('/presence', (req, res) => {
    
    var Matricule = req.body.Matricule;
    console.log(req.body);
    var sql = `INSERT INTO \`travaille\` (Matricule) VALUES ( "${Matricule}")`;
    
    global.db.query(sql, [Matricule], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {002
            res.json("intervention ajouté");
            
        }
    })
});


module.exports = operateur;

