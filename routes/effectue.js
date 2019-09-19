const effectue = require('express').Router();

effectue.get('/all', (req, res) => {
    global.db.query('SELECT * FROM `Affecter` WHERE (date >= CURDATE()) AND (date < CURDATE() + INTERVAL 1 DAY)', (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json(results);
        }
    })
});

effectue.get('/Rendement', (req, res) => {
    global.db.query( `SELECT ( 100*(SUM(opération.Duree))/ TIMESTAMPDIFF(MINUTE, TIME(affecter.date), Time(effectue.date))) as rendement, TIME(effectue.date) as t
    
    FROM \`opération\`, \`effectue\`, \`affecter\`
    
 WHERE ((effectue.Code_Operation=49) OR(effectue.Code_Operation=48) OR (effectue.Code_Operation=46)) and (effectue.Code_Operation=opération.Code_Operation) and (affecter.Code_Operation=effectue.Code_Operation) and (effectue.Date >= CURDATE() AND effectue.Date < CURDATE() + INTERVAL 1 DAY) and (DATE(effectue.Date)=DATE(affecter.date))
 
 GROUP BY t`, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json(results);
        }
    })
})


effectue.put('/:Matricule/:Code_operation', (req, res) => {
    
    var Matricule = req.body.Matricule;
    var Code_Operation = req.body.Code_Operation;
    var sql= `INSERT INTO \`effectue\` (Matricule, Code_Operation) VALUES (${req.params.Matricule}, ${req.params.Code_operation})`;

    global.db.query(sql,[Matricule, Code_Operation] ,  (error, results, fields) => {   
        console.log("update");
    if (error) {
        console.error(error);
        res.status(400).json(error);
    } else {
        res.json("update");
        
    }
})
});

module.exports = effectue;


