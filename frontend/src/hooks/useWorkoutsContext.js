import { useContext } from 'react';
import WorkoutContext from '../context/WorkoutContext';

export default function useWorkoutsContext() {
    const context = useContext(WorkoutContext);

    if (!context) {
        throw Error('useWorkoutsContext must be used within a WorkoutsContextProvider');
    }

    return context;
}
