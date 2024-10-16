const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// Enable CORS for frontend communication
app.use(cors());
app.use(express.json());

// Connect to PostgreSQL
const pool = new Pool({
    user: 'yourUsername',
    host: 'localhost',
    database: 'yourDatabaseName',
    password: 'yourPassword',
    port: 8080, // Default PostgreSQL port = 5432
});

// Routes
app.get('/api/rows', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM yourTableName');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving data from the database');
    }
});

app.post('/api/add-row', async (req, res) => {
    const { column1, column2 } = req.body; // Adjust based on table structure
    try {
        const result = await pool.query('INSERT INTO yourTableName (column1, column2) VALUES ($1, $2) RETURNING *', [column1, column2]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding data to the database');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});