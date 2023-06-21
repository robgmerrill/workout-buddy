import Workout from '../models/workoutModel.js';
import mongoose from 'mongoose';

// get all workouts
const getAllWorkouts = async (req, res) => {
    try {
        // find all documents in the collection - we could add object to be more specific
        // sort by createdAt in descending order
        const workouts = await Workout.find().sort({createdAt: -1});
        res.status(200).json(workouts);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

}

// get one workout
const getOneWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        // check if id is valid mongo object id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // if id is not valid mongo object id, return 404
            return res.status(404).json({ message: 'Workout not found!' });
        }
        // find one document in the collection by id
        const workout = await Workout.findById(id);
        if (!workout) {
            // if no workout is found, return 404 and message
            return res.status(404).json({ message: 'Workout not found!' });
        }
        res.status(200).json(workout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// create one workout
const createWorkout = async (req, res) => {

    const { title, load, reps} = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    } 
    if (!load) {
        emptyFields.push('load');
    }
    if (!reps) {
        emptyFields.push('reps');
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: `The following fields are empty: ${emptyFields.join(', ')}` });
    }
    
    // add doc to DB
    try {
        // create a new document in the collection with the JSON passed in from req.body
        const workout = await Workout.create({ title, reps, load });
        console.log(workout);
        res.status(200).json(workout);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }

}

// delete one workout
const deleteWorkout = async (req, res) => {
    console.log('delete route hit')
    try {
        // get id from route paramaters
        const { id } = req.params;
        // check if id is valid mongo object id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // if id is not valid mongo object id, return 404
            return res.status(404).json({ message: 'Workout not found!' });
        }
        // find one document in the collection by id
        const workout = await Workout.findByIdAndDelete({ _id: id });
        if (!workout) {
            // if no workout is found, return 404 and message
            return res.status(404).json({ message: 'Workout not found!' });
        }
       
        // return 200 and message
        res.status(200).json({ message: 'Workout deleted successfully!' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// update one workout
const updateWorkout = async (req, res) => {
    try {
        // get id from route paramaters
        const { id } = req.params;
        // check if id is valid mongo object id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // if id is not valid mongo object id, return 404
            return res.status(404).json({ message: 'Workout not found!' });
        }

        // find one document in the collection by id and update with the JSON passed in from req.body
        const workout = await Workout.findByIdAndUpdate({_id: id}, {
            // spread operator to get all fields from req.body
            ...req.body,
        })
        if (!workout) {
            // if no workout is found, return 404 and message
            return res.status(404).json({ message: 'Workout not found!' });
        }
        // return 200 and message
        res.status(200).json({ message: 'Workout updated successfully!' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


export { createWorkout, getOneWorkout, getAllWorkouts, deleteWorkout, updateWorkout };