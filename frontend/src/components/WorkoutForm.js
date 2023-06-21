// Import useState hook from React to handle state management for the form fields.
import { useState } from "react";

// Import custom hook that provides context for managing workout-related state.
import useWorkoutsContext from "../hooks/useWorkoutsContext";

// Define WorkoutForm as a functional component.
export default function WorkoutForm() {

    // Extract the dispatch function from the workouts context.
    const { dispatch } = useWorkoutsContext();

    // Declare state variables to manage form field values.
    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('');
    const [error, setError] = useState(null);

    // Define function to handle form submission.
    async function handleSubmit(e) {

        // Prevent the default form submission behavior.
        e.preventDefault();

        // Create workout object from state values.
        const workout = { title, load, reps };

        // Send POST request to create a new workout in the backend.
        const res = await fetch('/api/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Declare content type of the request body.
            },
            body: JSON.stringify(workout) // Convert workout object to JSON string format.
        })

        // Parse response as JSON.
        const json = await res.json();

        // Log the response to the console.
        console.log(json);

        // Check if the request was not successful, if so, update error state.
        if (!res.ok) {
            console.log(json.error)
            setError(json.error);
        }

        // If the request was successful, reset all form fields and error state.
        if (res.ok) {
            setTitle('');
            setReps('');
            setLoad('');
            setError(null);

            // Log the added workout and dispatch the CREATE_WORKOUT action to update context state.
            console.log('new workout added', json);
            dispatch({
                type: 'CREATE_WORKOUT',
                payload: json,
            });
        }
    }

    // Render the form.
    return (
        <form onSubmit={handleSubmit} className="create">
            <h3>Add a New Workout</h3>

            {/* Text input field for exercise title. */}
            <label>Exercise Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)} // Update title state on change.
                value={title} // Bind input field value to title state.
            />

            {/* Number input field for load. */}
            <label>Load (in Kg):</label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)} // Update load state on change.
                value={load} // Bind input field value to load state.
            />

            {/* Number input field for reps. */}
            <label>Reps:</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)} // Update reps state on change.
                value={reps} // Bind input field value to reps state.
            />

            {/* If error state is not null, display error message. */}
            {error && <div className="error">{error}</div>}

            {/* Submit button for form. */}
            <button>Add Workout</button>
        </form>
    )
}
