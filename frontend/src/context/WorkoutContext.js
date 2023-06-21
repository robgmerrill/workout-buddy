// Import createContext to create a new context and useReducer to handle state logic.
import { createContext, useReducer } from "react";

// Create a context object. This object will hold the context for our application.
const WorkoutContext = createContext();

// Define a reducer function for handling changes to the workout state.
const workoutsReducer = (state, action) => {
    // Depending on the action type, we update our state.
    switch (action.type) {
        case 'SET_WORKOUTS':
            // If the action is 'SET_WORKOUTS', we set the state to the new list of workouts.
            return {
                workouts: action.payload,
            }
        case 'CREATE_WORKOUT':
            // If the action is 'CREATE_WORKOUT', we add the new workout to the existing list of workouts.
            return {
                workouts: [action.payload, ...state.workouts],
            }
        default:
            // If the action is not recognized, we return the existing state unchanged.
            return state;
    }
}

// Create a provider function to wrap components that will have access to the context.
export function WorkoutContextProvider({children}) {
    // Use the useReducer hook to initialize our state and provide the dispatch function.
    const [state, dispatch] = useReducer(workoutsReducer, {workouts: null})

    // Return the Provider component provided by createContext.
    // This will wrap any child components and provide them with access to our context.
    return (
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
}

// Export the context object so it can be used by other components via the useContext hook.
export default WorkoutContext;
