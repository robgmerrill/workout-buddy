import { render, waitFor } from '@testing-library/react';
import Home from './Home';

describe('Home component', () => {
  it('fetches workouts on mount', async () => {
    const mockWorkouts = [{ id: 1, name: 'Workout 1' }, { id: 2, name: 'Workout 2' }];
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockWorkouts,
    });

    const { getByText } = render(<Home />);

    await waitFor(() => {
      expect(getByText('Workout 1')).toBeInTheDocument();
      expect(getByText('Workout 2')).toBeInTheDocument();
    });
  });
});