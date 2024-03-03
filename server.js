// server.js
const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const client = new Client({
  user: 'udaydamerla',
  host: 'localhost',
  database: 'myappdb',
  password: 'uday@5403D',
  port: 5432,
});

client.connect();

app.get('/', (req, res) => {
  res.send('Server Started.....');
});

app.get('/api/customers', async (req, res) => {
  const page = req.query.page || 1;
  let sort = req.query.sort || 'date_asc';
  const search = req.query.search || '';

  let [sortColumn, sortDirection] = sort.split('_');

  const sortMap = {
    'date': 'created_at',
    'time': 'created_at',
    'name': 'customer_name',
    'age': 'age',
    'phone': 'phone',
    'location': 'location',
    'sno': 'sno'
  };

  const directionMap = {
    'asc': 'ASC',
    'desc': 'DESC'
  };

  sortColumn = sortMap[sortColumn] || 'created_at';
  sortDirection = directionMap[sortDirection] || 'ASC';

  const offset = (page - 1) * 20;
  const customers = await client.query(`
    SELECT sno, customer_name, age, phone, location, 
           to_char(created_at, 'YYYY-MM-DD') as date, 
           to_char(created_at, 'HH24:MI:SS') as time
    FROM customer
    WHERE customer_name ILIKE $1 OR location ILIKE $1
    ORDER BY ${sortColumn} ${sortDirection}
    LIMIT 20 OFFSET $2
  `, [`%${search}%`, offset]);

  const total = await client.query(`
    SELECT COUNT(*) as count
    FROM customer
    WHERE customer_name ILIKE $1 OR location ILIKE $1
  `, [`%${search}%`]);

  res.json({
    customers: customers.rows,
    total: total.rows[0].count
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});