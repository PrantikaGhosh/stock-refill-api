const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const stockRoutes = require('./routes/stock');
const checkoutRoutes = require('./routes/checkout');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api', stockRoutes);
app.use('/api', checkoutRoutes);

// Try direct connection (for createConnection)
db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
    console.log(false);
    process.exit(1); // stop the app
  } else {
    console.log('✅ Connected to MySQL database');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(true);
    });
  }
});
