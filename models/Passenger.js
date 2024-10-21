const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
    pass_id: Number,
    first_name: String,
    last_name: String,
    passport_no: String,
    email: String,
    phone: String
});

const Passenger = mongoose.model('Passenger',passengerSchema);

module.exports = Passenger;