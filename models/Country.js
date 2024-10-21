const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    country_id: Number,
    country_name: String
});

const Country = mongoose.model('Country',countrySchema);

module.exports = Country;