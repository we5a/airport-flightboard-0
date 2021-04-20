const express = require('express');
require('dotenv').config();
const cors = require('cors');
const db = require('./db');
const flightRouter = require('./routes/flight-board-router');
const app = express();
const apiPort = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api', flightRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
