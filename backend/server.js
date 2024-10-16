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
    user: 'postgres',
    host: 'localhost',
    database: 'BudgetDB',
    password: 'Trace-Reroute4',
    port: 8080, // Default PostgreSQL port = 5432
});

// Routes
app.get('/api/filtered-rows', async (req, res) => {
    const { name, department, is_recurring_expense } = req.query;

    // Base query
    let query = 'SELECT * FROM transactions WHERE 1=1';
    const params = [];

    // Add conditions based on the request query
    if (name) {
        query += ' AND name ILIKE $1';
        params.push(`%${name}%`);
    }
    if (department) {
        query += ' AND department = $2';
        params.push(department);
    }
    if (is_recurring_expense) {
        query += ' AND is_recurring_expense = $3';
        params.push(is_recurring_expense === 'true' ? '1' : '0');
    }

    try {
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching filtered data:', error);
        res.status(500).send('Error retrieving data');
    }
});

app.post('/api/add-transaction', async (req, res) => {
    const { date, amount, department, name, description, is_recurring_expense } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO transactions (date, amount, department, name, description, is_recurring_expense) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [date, amount, department, name, description, is_recurring_expense]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).send('Error adding transaction');
    }
});

const PORT = process.env.PORT || 5000; //added
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});