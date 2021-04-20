const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Flight = new Schema(
  {
    id: { type: String, required: true },
    flightCode: { type: String, required: true },
    flightProvider: { type: String, required: true },
    sourcePortName: { type: String, required: true },
    sourcePortCode: { type: String, required: true },
    destinationPortName: { type: String, required: true },
    destinationPortCode: { type: String, required: true },
    scheduledArrival: { type: Date, required: true },
    scheduledDeparture: { type: Date, required: true },
    status: { type: String, required: true }
  },
  { timestamps: true },
);

module.exports = mongoose.model('flights', Flight);
