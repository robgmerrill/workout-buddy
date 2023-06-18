import mongoose from 'mongoose';

// create schema
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    }, 
    load: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

// create model - Workout will be pluralized
export default mongoose.model('Workout', workoutSchema);