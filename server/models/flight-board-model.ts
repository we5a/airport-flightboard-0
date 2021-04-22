import  { Schema, Document } from "mongoose";

const mongoose = require('mongoose');

interface FlightItem extends Document {
  id: String,
  flightCode: String,
  flightProvider: String,
  sourcePortName: String,
  sourcePortCode: String,
  destinationPortName: String,
  destinationPortCode: String,
  scheduledArrival: Date,
  scheduledDeparture: Date,
  status: 'ON SCHEDULE' | 'DELAYED' | 'LANDED'
}

const FlightSchema: Schema = new Schema(
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

const Flight: FlightItem = mongoose.model('flights', FlightSchema);

export = Flight;
