import { Request, Response } from 'express';

const Flight = require('../models/flight-board-model');

const getFlights = async (req: Request, res: Response) => {
  await Flight.find({}, (err, flights) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!flights.length) {
      return res
        .status(404)
        .json({ success: false, error: `Flight not found` })
    }
    return res.status(200).json({ success: true, data: flights })
  }).catch(err => console.log(err));
}

const deleteFlight = async (req: Request, res: Response) => {
  await Flight.findOneAndDelete({ id: req.params.id }, (err, flight) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true, data: flight });
  }).catch(err => console.log(err));
}

const updateFlight = (req: Request, res: Response) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    })
  }

  Flight.findOne({ id: req.params.id }, (err, flight) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Flight not found!',
      });
    }

    Object.entries(body).map(([key, value]) => {
      if (!['_id', '__v'].includes(key)) {
        flight[key] = value;
      }
    });

    flight
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: flight._id,
          message: 'Flight updated!',
        })
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Flight not updated!',
        });
      });
  });
}

const addFlight = async (req: Request, res: Response) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a flight',
    });
  }

  const flight = new Flight(body);

  if (!flight) {
    return res.status(400).json({ success: false, error: "Can't create flight" })
  }

  await Flight.findOne({ id: body.id }, (err, result) => {
    if (!result) {
      flight
        .save()
        .then(() => {
          return res.status(201).json({
            success: true,
            id: flight.id,
            message: 'Flight created!',
          });
        })
        .catch(error => {
          return res.status(400).json({
            error,
            message: 'Flight not created!',
          });
        });
    } else {
      return res.status(406).json({
        id: body.id,
        message: 'Flight item already exists, not acceptable'
      });
    }

  })
}

module.exports = {
  getFlights,
  deleteFlight,
  updateFlight,
  addFlight
}
