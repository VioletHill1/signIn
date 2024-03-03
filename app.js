const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.static('./web'));

app.use(express.urlencoded({ extended: false }))

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "myDB"
});

connection.connect((err)=> {
    if (err) {
        console.error('Error of connection with the database: ', err);
        return;
    }
    console.log('Conection with the database succesful');
});

app.post('/signin', (req, res)=> {
    const newUser = {
        username: req.body.username,
        password: req.body.password
    };
    const values = [newUser.username, newUser.password];

    const query = 'INSERT INTO users (username, password) values (?, ?)';

    connection.query(query, values, (error, results, fields)=> {
        if (error) {
            console.error("Error: ", error);
            res.status(500).send('Error obtaining users from the database');
            return;
        }
        res.send('New user succesful added');
    });
});

app.listen(5000, ()=> console.log('Server listen on port 5000'));