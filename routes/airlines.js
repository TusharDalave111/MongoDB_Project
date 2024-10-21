const express = require('express');
const router = express.Router();
const Airline = require('../models/Airline');

// Get all airlines
router.get('/airlines', async (req, res) => {
  try {
    const airlines = await Airline.find();
    res.json(airlines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
