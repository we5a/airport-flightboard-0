import express from 'express';
import * as FlightCtrl from '../controllers/flight-ctrl';

const flightRouter = express.Router();

flightRouter.post('/flight', FlightCtrl.addFlight);
flightRouter.put('/flight/:id', FlightCtrl.updateFlight);
flightRouter.delete('/flight/:id', FlightCtrl.deleteFlight);
flightRouter.get('/flights', FlightCtrl.getFlights);

export default flightRouter;
