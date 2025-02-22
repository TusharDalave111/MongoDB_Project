const express = require('express');
const router = express.Router();
const City = require('../models/City');

// Get all airports
router.get('/cities', async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
