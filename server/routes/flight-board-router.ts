const express = require('express');

const FlightCtrl = require('../controllers/flight-ctrl.js');

const router = express.Router();

router.post('/flight', FlightCtrl.addFlight);
router.put('/flight/:id', FlightCtrl.updateFlight);
router.delete('/flight/:id', FlightCtrl.deleteFlight);
router.get('/flights', FlightCtrl.getFlights);

export = router;
