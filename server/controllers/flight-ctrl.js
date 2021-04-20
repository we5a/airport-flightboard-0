const Flight = require('../models/flight-board-model');

// store retrieve update delete

getFlights = async (req, res) => {
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

deleteFlight = async (req, res) => {
  await Flight.findOneAndDelete({ id: req.params.id }, (err, flight) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true, data: flight });
  }).catch(err => console.log(err));
}

updateFlight = async (req, res) => {
  const body = req.body

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
    flight.flightCode = body.flightCode;
    flight.flightProvider = body.flightProvider;
    flight.sourcePortName = body.sourcePortName;
    flight.sourcePortCode = body.sourcePortCode;
    flight.destinationPortName = body.destinationPortName;
    flight.destinationPortCode = body.destinationPortCode;
    flight.scheduledArrival = body.scheduledArrival;
    flight.scheduledDeparture = body.scheduledDeparture;
    flight.status = body.status;
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

addFlight = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a flight',
    });
  }

  const flight = new Flight(body);

  if (!flight) {
    return res.status(400).json({ success: false, error: err })
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
        message: 'Flight exists, not acceptable'
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
