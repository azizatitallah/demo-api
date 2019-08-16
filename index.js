const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const http = require('http');
const mysql = require('mysql');
const api = require('./routes');
const cors = require('cors');

app = express();

app.use(cors());

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Logs requests to the console
app.use(logger('dev'));

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'asma1995',
    password: 'TdSmennPYKo10ahQ',
    database: 'simotex'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// Settings Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on port: ${port}`));

app.use('/', api);

app.get('*', (req, res) => {
    res.status(200).send('Saleem from ENSTAB');
});

