// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Prantika@123', // <-- change this
  database: 'supermarket_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL database');
});

module.exports = db;
