<<<<<<< HEAD
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();  // Initialize Express app

app.use(cors());  // Enable CORS for all origins
app.use(express.json());  // Parse JSON bodies
app.use(bodyParser.json());  // Parse JSON bodies (body-parser is not necessary if you're using express.json())

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'root123', // Replace with your MySQL password
  database: 'kanchan'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Define POST endpoint for adding customers
app.post('/api/customers', (req, res) => {
  const customer = req.body;
  const query = 'INSERT INTO customers (first_name, last_name, address, phone_no, alternate_no, advance_amount, lat_long) VALUES (?, ?, ?, ?, ?, ?, ?)';
  console.log('Query:', query);
  console.log('Parameters:', [customer.firstName, customer.lastName, customer.address, customer.phoneNo, customer.alternateNo, customer.advanceAmount, customer.latLong]);
  
  db.query(query, [customer.firstName, customer.lastName, customer.address, customer.phoneNo, customer.alternateNo, customer.advanceAmount, customer.latLong], (err, result) => {
    if (err) {
      console.error('Error adding customer:', err);
      return res.status(500).send('Failed to add customer. Please try again.');
    }
    console.log('Customer added successfully:', result);
    res.send({ id: result.insertId, ...customer });
  });
});

// Define GET endpoint for fetching customers
app.get('/api/customers', (req, res) => {
  const query = 'SELECT * FROM customers';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching customers:', err);
      return res.status(500).send('Failed to fetch customers. Please try again.');
    }
    console.log('Customers fetched successfully:', results);
    res.json(results);
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();  // Initialize Express app

app.use(cors());  // Enable CORS for all origins
app.use(express.json());  // Parse JSON bodies
app.use(bodyParser.json());  // Parse JSON bodies (body-parser is not necessary if you're using express.json())

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'root123', // Replace with your MySQL password
  database: 'kanchan'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Define POST endpoint for adding customers
app.post('/api/customers', (req, res) => {
  const customer = req.body;
  const query = 'INSERT INTO customers (first_name, last_name, address, phone_no, alternate_no, advance_amount, lat_long) VALUES (?, ?, ?, ?, ?, ?, ?)';
  console.log('Query:', query);
  console.log('Parameters:', [customer.firstName, customer.lastName, customer.address, customer.phoneNo, customer.alternateNo, customer.advanceAmount, customer.latLong]);
  
  db.query(query, [customer.firstName, customer.lastName, customer.address, customer.phoneNo, customer.alternateNo, customer.advanceAmount, customer.latLong], (err, result) => {
    if (err) {
      console.error('Error adding customer:', err);
      return res.status(500).send('Failed to add customer. Please try again.');
    }
    console.log('Customer added successfully:', result);
    res.send({ id: result.insertId, ...customer });
  });
});

// Define GET endpoint for fetching customers
app.get('/api/customers', (req, res) => {
  const query = 'SELECT * FROM customers';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching customers:', err);
      return res.status(500).send('Failed to fetch customers. Please try again.');
    }
    console.log('Customers fetched successfully:', results);
    res.json(results);
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> b66b82d2afe6fb90816cf166d4f375c104700e12
