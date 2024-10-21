const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    booking_id: Number,
    flight_id: Number,
    pass_id: Number,
    seat_no: String,
    book_status: String
});

const Booking = mongoose.model('Booking',bookingSchema);

module.exports = Booking;