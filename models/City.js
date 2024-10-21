const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    city_id: Number,
    city_name: String,
    country: String
});

const City = mongoose.model('City',citySchema)  

module.exports = City;