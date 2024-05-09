const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin:'http://localhost:3000', 
               credentials:true
            } ));

const PORT = 7000;
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'message'
    });
    
db.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('MySQL connected...');
    });

    app.post('/message', (req, res) => {
        const { fullName, email, message } = req.body;
    
        // Check if all required fields are present
        if (!fullName || !email || !message) {
            return res.status(400).send('All fields (fullName, email, message) are required');
        }
    
        const values = [fullName, email, message];
        const INSERT_FEEDBACK_QUERY = "INSERT INTO feedback (name, email, message) VALUES (?)";
    
        db.query(INSERT_FEEDBACK_QUERY, [values], (err, result) => {
            if (err) {
                console.error('Error saving user:', err);
                res.status(500).send('Error saving user');
            } else {
                console.log('User saved successfully:', result);
                res.status(200).send('User saved successfully');
            }
        });
    });
    
       


app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});