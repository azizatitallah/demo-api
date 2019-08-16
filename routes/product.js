const product = require('express').Router();

product.get('/all', (req, res) => {
    global.db.query('SELECT * FROM `products`', (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json(results);
        }
    })
});

product.get('/:id', (req, res) => {
    global.db.query(`SELECT * FROM \`products\` WHERE id = ${req.params.id}`, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json(results);
        }
    })
});


product.delete('/:id', (req, res) => {
    global.db.query(`DELETE FROM \`products\` WHERE id =  ${id}`, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json("deleted seccusfuly");
            res.redirect('/product');
        }
    })
});

product.post('/create', (req, res) => {
    var id = req.body.id;
    var name = req.body.name;
    var stock = req.body.stock;
    var comment = req.body.comment;
    var sql = `INSERT INTO \`products\` (id, name, stock, comment) VALUES ("${id}", "${name}", "${stock}", "${comment}")`;
    
    global.db.query(sql,[id, name, stock, comment], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            res.json("produit ajouté");
            
        }
    })
});


module.exports = product;

