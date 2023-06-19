import express from 'express';
import { createWorkout, getAllWorkouts, getOneWorkout, deleteWorkout, updateWorkout } from '../controllers/workoutController.js';
const router = express.Router();

// GET all workouts
router.get('/', getAllWorkouts);

// GET one workout
router.get('/:id', getOneWorkout);

// POST one workout
router.post('/', createWorkout);

// DELETE one workout
router.delete('/:id', deleteWorkout);

// PATCH one workout
router.patch('/:id', updateWorkout);

export default router;
