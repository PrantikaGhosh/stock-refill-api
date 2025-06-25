const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const stockRoutes = require('./routes/stock');
const checkoutRoutes = require('./routes/checkout');
const authRoutes = require('./routes/auth'); // optional, keep if you have login
// No auth middleware here for checkout now

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Auth route (optional)
app.use('/api', authRoutes);

// No authentication for checkout for now
app.use('/api', stockRoutes);
app.use('/api', checkoutRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
