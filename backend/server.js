const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'he2b-student-pwa'
});

app.get('/', (req, res) => {
    return res.json("From Backend side")
});

app.get('/news', (req, res) => {
    const sql = "SELECT * FROM news";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
});

app.listen(5000, () => {
    console.log("Server is running on port 5000")
});