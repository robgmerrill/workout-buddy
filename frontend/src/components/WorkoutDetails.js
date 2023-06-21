import useWorkoutsContext from "../hooks/useWorkoutsContext";

export default function WorkoutDetails({workout}) {
    const {dispatch} = useWorkoutsContext();
    // console.log(workout)

    const handleClick = async () => {
        const response = await fetch(`/api/workouts/${workout._id}`, {
            method: 'DELETE',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify({id: workout.id})
    })  
        console.log(response)
        if (response.ok) {
            dispatch({
                type: 'DELETE_WORKOUT',
                payload: workout._id,
            })
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg):</strong>{workout.load}</p>
            <p><strong>Reps:</strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            <span onClick={handleClick}>Delete</span>
        </div>
    )
}