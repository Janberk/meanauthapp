// Imports
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const config = require('./config/database');

// Connect to database
mongoose.connect(config.database);

// On connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database: ' + config.database);
});

// On error
mongoose.connection.on('error', (err) => {
  console.log('Connection failed: ' + err);
});

// Server port
const port = 3000;

// Declare express reference
const app = express();

// Import users rout
const users = require('./routes/users');

// CORS Middleware: Accept cross origin access
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware: Parse response body
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Setup rout to /users/*
app.use('/users', users);

// Index rout
app.get('/', (req, res) => {
  res.send('Invalid endpoint.');
});

// Sart server, listen to port 3000
app.listen(port, () => {
  console.log('Server started on port: ' + port + '.');
});
