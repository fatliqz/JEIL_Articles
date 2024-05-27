const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;



const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test1',
    password: '6410210573',
    port: 5432
});

client.connect((err) => {
    if (err) {
        console.error('error connecting to postgresql:', err);
        return;
    }
    console.log('connected to postgresql');
});

//ทำให้ express สามารถอ่านข้อมูลตัวแปรที่ป้อนผ่าน form ใน web application
app.use(bodyParser.urlencoded({ extended: true }));

// ทำให้ express สามารถอ่านข้อมูลในรูปแบบ JSON ที่ได้รับจาก request ของ web application
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hellow World by ME!!!');
});

app.get('/profile', (req, res) => {
    client.query('SELECT * FROM profile', (err, result) => {
        if (err) {
            console.error('error querying postgresql:', err);
            return;
        }
        console.log('connected to postgresql');

        res.json(result.rows); // แสดงผลข้อมูลที่ดึงมา
    });
});

app.post('/add_user', (req, res) => {
    // const input = req.body;
    const id = req.body.id;
    const name = req.body.name;

    client.query('insert into profile (id,name) VALUES ($1,$2)',
        [
            id,
            name
        ],
        (error, result) => {
            if (error) {
                console.error('error querying postgresql:', error);
                res.status(500).send('Error adding user');
                return;
            }
            console.log('add user to postgresql completed ');
            // res.json(result.rows); // แสดงผลข้อมูลที่ดึงมา
            res.json({ message: 'User added successfully' });
        }
    );
});

app.post('/add-Articles', (req, res) => {

});


// test


app.listen(3001, () =>
    console.log(`Example app Listening on port ${port}`)
);