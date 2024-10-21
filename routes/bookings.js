const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Get all airports
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
