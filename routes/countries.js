const express = require('express');
const router = express.Router();
const Country = require('../models/Country');

// Get all airports
router.get('/countries', async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
