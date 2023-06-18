import express from 'express';
import Workout from '../models/workoutModel.js';

const router = express.Router();

// GET all workouts
router.get('/', (req, res) => {
    res.json({ message: 'GET all workouts!' });
});

// GET one workout
router.get('/:id', (req, res) => {
    res.json({ message: 'GET one workout!' });
});

// POST one workout
router.post('/', async (req, res) => {
    console.log(req.body);
    const { title, load, reps} = req.body;

    try {
        // create a new document in the collection with the JSON passed in from req.body
        const workout = await Workout.create({ title, reps, load });
        console.log(workout);
        res.status(200).json(workout);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }

});

// DELETE one workout
router.delete('/:id', (req, res) => {
    res.json({ message: 'DELETE workout!' });
});

// PATCH one workout
router.patch('/:id', (req, res) => {
    res.json({ message: 'UPDATE workout!' });
});

export default router;
