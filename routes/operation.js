const operation = require('express').Router();

operation.get('/alloperateur', (req, res) => {
    global.db.query('SELECT * FROM `opérateur`', (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json(results);
        }
    })
});


operation.get('/alloperation', (req, res) => {
    global.db.query(`SELECT * FROM \`opération\``, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json(results);
        }
    })
});

operation.get('/all', (req, res) => {
    global.db.query('SELECT * FROM `effectue`', (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json(results);
        }
    })
});





operation.post('/create', (req, res) => {
    console.log(req.body);
    var Matricule = req.body.Matricule;
    var Code_Operation = req.body.Code_Operation;
   
    var sql = `INSERT INTO \`Affecter\` (Matricule, Code_Operation) VALUES ( ${Matricule}, ${Code_Operation}) `;
    
    global.db.query(sql, [Matricule, Code_Operation], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json("intervention ajouté");
            
        }
    })
});


module.exports = operation;

