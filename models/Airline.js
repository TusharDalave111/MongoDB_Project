const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema({
    airline_id: Number,
    airline_code: String,
    airline_name: String,
    country_id: Number,
    alliance: String
});

const Airline = mongoose.model('Airline',airlineSchema);

module.exports = Airline;