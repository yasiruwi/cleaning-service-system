// server.js (Backend)

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // PostgreSQL client
const app = express();
const port = 3000;

// Middleware for handling CORS and JSON requests
app.use(cors());
app.use(express.json());

// PostgreSQL database connection
const pool = new Pool({
    user: 'myuser',         // Replace with your PostgreSQL username
    host: 'localhost',      // Hostname (use your server's IP or hostname if not local)
    database: 'mydatabase', // Name of the database you created
    password: 'mypassword', // Replace with your PostgreSQL password
    port: 5432,             // Default PostgreSQL port
});

// Test the database connection
pool.connect()
    .then(() => console.log('Connected to PostgreSQL!'))
    .catch((err) => console.error('Connection error', err.stack));

// POST route to handle login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Query the database for the user
        const result = await pool.query(
            'SELECT * FROM users WHERE username = $1 AND password = $2',
            [username, password]
        );

        if (result.rows.length > 0) {
            // User found, login successful
            return res.status(200).json({ message: 'Login successful', token: 'fake-jwt-token' });
        } else {
            // User not found or invalid credentials
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
