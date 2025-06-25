// routes/checkout.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/checkout
router.post('/checkout', (req, res) => {
  const { productId, quantity, cashier } = req.body;

  if (!productId || !quantity || quantity <= 0 || !cashier) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  // Step 1: Check product and stock
  const checkSql = 'SELECT quantity FROM products WHERE id = ?';
  db.query(checkSql, [productId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'Product not found' });

    const currentStock = results[0].quantity;
    if (currentStock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    // Step 2: Reduce stock quantity
    const updateSql = 'UPDATE products SET quantity = quantity - ? WHERE id = ?';
    db.query(updateSql, [quantity, productId], (err, updateResult) => {
      if (err) return res.status(500).json({ error: 'Failed to update stock' });

      // Step 3: Insert transaction record
      const insertSql = 'INSERT INTO transactions (product_id, quantity, cashier) VALUES (?, ?, ?)';
      db.query(insertSql, [productId, quantity, cashier], (err, insertResult) => {
        if (err) return res.status(500).json({ error: 'Failed to save transaction' });

        res.json({ message: 'Checkout successful' });
      });
    });
  });
});

module.exports = router;
