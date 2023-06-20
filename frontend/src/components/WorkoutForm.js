import { useState } from "react";
import useWorkoutsContext from "../hooks/useWorkoutsContext";

export default function WorkoutForm() {
    const { dispatch } = useWorkoutsContext();
    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('');
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const workout = { title, load, reps };
        const res = await fetch('/api/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workout)
        })
        const json = await res.json();
        console.log(json);
        if (!res.ok) {
            setError(json.error);
        }
        if (res.ok) {
            setTitle('');
            setReps('');
            setLoad('');
            setError(null);

            console.log('new workout added', json);
            dispatch({
                type: 'CREATE_WORKOUT',
                payload: json,
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="create">
            <h3>Add a New Workout</h3>
            <label>Exercise Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label>Load (in Kg):</label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />
            <label>Reps:</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />
            {error && <div className="error">{error}</div>}
            <button>Add Workout</button>
        </form>
    )
}