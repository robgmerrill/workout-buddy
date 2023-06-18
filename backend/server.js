import express from 'express';
import dotenv from 'dotenv/config';
import workoutRoutes from './routes/workouts.js';

const PORT = process.env.PORT || 3000;

// express app
const app = express();

// global middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    // must invoke next() to continue to next middleware
    next();
})

app.use('/api/workouts', workoutRoutes)

app.listen(4000, () => {
    console.log('Running on port 4000')
})