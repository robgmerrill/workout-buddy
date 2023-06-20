import { useEffect, useState } from "react"
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import useWorkoutsContext from "../hooks/useWorkoutsContext";

export default function Home() {

    const {workouts, dispatch} = useWorkoutsContext();
    console.log(workouts, dispatch)


    useEffect(() => {
        const fetchWorkouts = async () => {
            const res = await fetch('/api/workouts');
            if (res.ok) {
                const data = await res.json();
                dispatch({
                    type: 'SET_WORKOUTS',
                    payload: data,
                });
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
