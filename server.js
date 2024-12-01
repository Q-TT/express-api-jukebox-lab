const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Import the controller file
const jukeboxRouter = require('./controllers/jukebox.js');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());

// Routes go here
app.use('/jukebox', jukeboxRouter);

app.listen(3000, () => {
  console.log('The express app is ready!');
});
