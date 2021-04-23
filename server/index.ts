import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import cors from 'cors';
import { db } from './db';
import flightRouter from './routes/flight-board-router';

const app: Application = express();
const apiPort: number = Number.parseInt(process.env.PORT) || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api', flightRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
