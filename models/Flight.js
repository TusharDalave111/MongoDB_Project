const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    flight_id: Number,
    flight_no: String,
    airline_id: Number,
    dep_time: String,
    arr_time: String,
    status: String
});

const Flight = mongoose.model('Flight',flightSchema);

module.exports = Flight;