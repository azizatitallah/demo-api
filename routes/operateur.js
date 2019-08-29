const operateur = require('express').Router();





operateur.post('/presence', (req, res) => {
    console.log(req.body);
    var Matricule = req.body.Matricule;

    for (var i = 0; i < Matricule.length; i++) {   
        console.log(Matricule[i]);
        Matricule1= Matricule[0];  
        Matricule2=  Matricule[1];
        Matricule3=  Matricule[2];
      var sql = `INSERT INTO \`travaille\` (Matricule) VALUES  ("${Matricule1}"), ("${Matricule2}"), ("${Matricule3}") `; 

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

