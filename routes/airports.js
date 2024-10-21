const express = require('express');
const router = express.Router();
const Airport = require('../models/Airport');

// Get all airports
router.get('/airports', async (req, res) => {
  try {
    const airports = await Airport.find();
    res.json(airports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
