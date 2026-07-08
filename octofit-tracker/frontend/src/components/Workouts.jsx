import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeRecords } from '../lib/api.js';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(getApiBaseUrl('workouts'));
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        setWorkouts(normalizeRecords(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load workouts');
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section className="card shadow-sm p-4">
      <h2 className="h4 mb-3">Workouts</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {workouts.map((workout) => (
          <li className="list-group-item" key={workout._id || workout.title}>
            <strong>{workout.title}</strong> — {workout.difficulty}
            <div className="text-muted small">
              {workout.durationMinutes} min · Focus: {workout.focus}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
