require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

// Middleware to parse incoming requests
app.use(cors());
app.use(bodyParser.json());

// Create a connection to the MySQL database using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit the process if there's a database connection error
  }
  console.log('Connected to the MySQL database.');
});

// API route to get all employees from the database
app.get('/get-employees', (req, res) => {
  const query = 'SELECT * FROM emp_details';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      return res.status(500).json({ message: 'Error fetching employees' });
    }

    // Send the results to the frontend
    res.status(200).json({ employees: results });
  });
});

// POST request to add employee details to the database
app.post('/addEmployee', (req, res) => {
  const { emp_name, emp_id, email, phn_no, department, joining_date, emp_role } = req.body;

  // SQL query to insert employee data into the database
  const query = `
    INSERT INTO emp_details (emp_name, emp_id, email, phn_no, department, joining_date, emp_role)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [emp_name, emp_id, email, phn_no, department, joining_date, emp_role], (err, result) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      return res.status(500).json({ message: 'Error submitting form' });
    }

    // Send a success message
    res.status(200).json({ message: 'Employee added successfully!' });
  });
});

// Start the Express server using the PORT from the .env file
const port = process.env.PORT || 5000;  // Default to 5000 if the PORT is not set in the .env file
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
