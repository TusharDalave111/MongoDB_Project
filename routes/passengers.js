const express = require('express');
const router = express.Router();
const Passenger = require('../models/Passenger');

// Get all airports
router.get('/passengers', async (req, res) => {
  try {
    const passengers = await Passenger.find();
    res.json(passengers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new passenger (POST)
router.post('/passengers', async (req, res) => {
  const passenger = new Passenger({
    pass_id: req.body.pass_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    passport_no: req.body.passport_no,
    email: req.body.email,
    phone: req.body.phone
  });
  try {
    const newPassenger = await passenger.save();
    res.status(201).json(newPassenger);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a passenger (PUT)
router.put('/passengers/:pass_id', async (req, res) => {
  try {
    const passenger = await Passenger.findOne({pass_id:req.params.pass_id});
    if (!passenger) return res.status(404).json({ message: 'Passenger not found' });

    
    passenger.first_name = req.body.first_name || passenger.first_name;
    passenger.last_name = req.body.last_name || passenger.last_name;
    passenger.passport_no = req.body.passport_no || passenger.passport_no;
    passenger.email = req.body.email || passenger.email;
    passenger.phone = req.body.phone || passenger.phone;
    
    const updatedPassenger = await passenger.save();
    res.json(updatedPassenger);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a passenger (DELETE)
router.delete('/passengers/:pass_id', async (req, res) => {
  try {
    const passenger = await Passenger.findOneAndDelete({pass_id:req.params.pass_id});
    if (!passenger) return res.status(404).json({ message: 'Passenger not found' });

    await passenger.remove();
    res.json({ message: 'Passenger deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
