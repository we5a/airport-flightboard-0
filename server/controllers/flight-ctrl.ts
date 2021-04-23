import { Request, Response } from 'express';

const Flight = require('../models/flight-board-model');

const getFlights = async (req: Request, res: Response) => {
  const flights = await Flight.find({});
  if (flights.length === 0) {
    return res.status(404).json({ success: false, error: `Flight not found` })
  }

  return res.status(200).json({ success: true, data: flights });
}

const deleteFlight = async (req: Response, res: Response) => {
  const flight = await Flight.findOneAndDelete({ id: req.params.id });
  if (!flight) {
    return res.status(400).json({ success: false, error: "Can't delete" });
  }
  return res.status(200).json({ success: true, data: flight });
}

const updateFlight = async (req: Request, res: Response) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({ success: false, error: 'You must provide a body to update' });
  }

  const flight = await Flight.findOne({ id: req.params.id });

  Object.entries(body).map(([key, value]) => {
    if (!['_id', '__v'].includes(key)) {
      flight[key] = value;
    }
  });

  try {
    await flight.save();

  } catch (err) {
    return res.status(404).json({ err, message: 'Flight not updated!' });
  }
  return res.status(200).json({ success: true, flight, message: 'Flight updated!' });
}

const addFlight = async (req: Request, res: Response) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({ success: false, error: 'You must provide a flight' });
  }

  const flight = new Flight(body);

  if (!flight) {
    return res.status(400).json({ success: false, error: "Can't create flight" })
  }

  const result = await Flight.findOne({ id: body.id });
  if (!result) {
    try {
      await flight.save();

    } catch (err) {
      return res.status(400).json({ err, message: 'Flight not created!' });
    }
    return res.status(201).json({ success: true, id: flight.id, message: 'Flight created!' });

  } else {
    return res.status(406).json({ id: body.id, message: 'Flight item already exists, not acceptable' });
  }
}

export {
  getFlights,
  deleteFlight,
  updateFlight,
  addFlight
}
