const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Replace 'mongodb://localhost:27017/ADBMS' with your actual MongoDB connection string.
const dbURL = 'mongodb://localhost:27017/FlightManagementSystem';

// Connect to MongoDB using Mongoose
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Connection error:', error);
  });

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Define a simple route
app.get('/', (req, res) => {
  res.send(`
    <html>
    <head><title>Flight Management System</title></head>
    <body>
      <h1>Flight Management System</h1>
      <button onclick="window.location.href='/api/flights'">Flights Available</button>
      <button onclick="window.location.href='/api/passengers'">Passengers</button>
      <button onclick="window.location.href='/api/bookings'">Bookings</button>
      <button onclick="window.location.href='/api/airlines'">Airlines</button>
      <button onclick="window.location.href='/api/airports'">Airports</button>
      <button onclick="window.location.href='/api/cities'">Cities</button>
      <button onclick="window.location.href='/api/countries'">Countries</button>
    </body>
    </html>
  `);
});

const airlineRoutes = require('./routes/airlines');
app.use('/api', airlineRoutes);

const airportRoutes = require('./routes/airports');
app.use('/api', airportRoutes);

const passengerRoutes = require('./routes/passengers');
app.use('/api', passengerRoutes);

const flightRoutes = require('./routes/flights');
app.use('/api', flightRoutes);

const bookingRoutes = require('./routes/bookings');
app.use('/api', bookingRoutes);

const countryRoutes = require('./routes/countries');
app.use('/api', countryRoutes);

const cityRoutes = require('./routes/cities');
app.use('/api', cityRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
