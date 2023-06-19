import express from 'express';
import { config } from 'dotenv';
import workoutRoutes from './routes/workouts.js';
import mongoose from 'mongoose';
import cors from 'cors';
import dbConnect from './dbConnect.js';


config();

const PORT = process.env.PORT || 3000;

// express app
const app = express();

// global middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    // must invoke next() to continue to next middleware
    next();
})

app.use('/api/workouts', workoutRoutes)

// connect to mongodb
dbConnect().then(() => {
    app.listen(PORT, () => {
        console.log(`Connected to DB and running on port ${PORT}`);
    });
}).catch(err => console.log(err));



export default app;