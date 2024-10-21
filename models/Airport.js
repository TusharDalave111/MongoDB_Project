const mongoose = require('mongoose');

const airportSchema = new mongoose.Schema({
    airport_id: Number,
    airport_code: String,
    airport_name: String,
    city_id: Number
});

const Airport = mongoose.model('Airport',airportSchema);

module.exports = Airport;