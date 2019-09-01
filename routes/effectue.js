const effectue = require('express').Router();

effectue.get('/all', (req, res) => {
    global.db.query('SELECT * FROM `effectue`', (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json(results);
        }
    })
});

effectue.put('/:Matricule/:Code_operation', (req, res) => {
    console.log(req.body);
    global.db.query( ` UPDATE \`effectue\` SET \`Etat\`="realisé", \`Nombre\`=Nombre+1,  \`date\`= CURRENT_TIMESTAMP WHERE (\`Matricule\`=${req.params.Matricule}) AND (\`Code_Operation\`=${req.params.Code_operation}) AND (Date >= CURDATE()) AND (Date < CURDATE() + INTERVAL 1 DAY)` ,  (error, results, fields) => {   
       
    if (error) {
        console.error(error);
        res.status(400).json(error);
    } else {
        res.json("update");
        
    }
})
});

module.exports = effectue;

