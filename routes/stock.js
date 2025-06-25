// routes/stock.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/refill-stock
router.post('/refill-stock', (req, res) => {
  const { productId, refillAmount } = req.body;

  if (!productId || !refillAmount || refillAmount <= 0) {
    return res.status(400).json({ error: 'Invalid product ID or refill amount' });
  }

  const sql = `
    UPDATE products
    SET quantity = quantity + ?
    WHERE id = ?
  `;

  db.query(sql, [refillAmount, productId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Stock refilled successfully' });
  });
});

module.exports = router;
