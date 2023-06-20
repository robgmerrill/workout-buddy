import { useEffect, useState } from "react"
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

export default function Home() {
    const [workouts, setWorkouts] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const res = await fetch('/api/workouts');
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                setWorkouts(data);
            }
        }
        fetchWorkouts();
    }, [])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map(workout => ( 
                <WorkoutDetails key={workout.id} workout={workout} />
                    )
                )}
            </div>
            <WorkoutForm />
        </div>
    )
}