const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

// Get all airports (GET)
router.get('/flights', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
