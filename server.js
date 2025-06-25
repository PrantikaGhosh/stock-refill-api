// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');             // MySQL connection
const stockRoutes = require('./routes/stock'); // Import stock routes

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Register stock route
app.use('/api', stockRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
