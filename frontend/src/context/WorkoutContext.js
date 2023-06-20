import { createContext, useReducer } from "react";

// Create a context object
const WorkoutContext = createContext();

// Create a provider for components to consume and subscribe to changes
    // state is initialls {workouts: null}
const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload,
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts],
            }
        default:
            return state;
    }
}

// Create a provider for components to consume and subscribe to changes
export function WorkoutContextProvider({children}) {
    // Create the initial state
    const [state, dispatch] = useReducer(workoutsReducer, {workouts: null})


    return (
        // value prop is where we define what values
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {/* everything that is wrapped */}
            {children}
        </WorkoutContext.Provider>
    )
}

// Export it so it can be used by other Components
export default WorkoutContext;
