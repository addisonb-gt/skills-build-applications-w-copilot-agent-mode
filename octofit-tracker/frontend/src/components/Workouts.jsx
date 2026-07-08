import { useEffect, useState } from 'react';
import { normalizeRecords } from '../lib/api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(apiUrl);
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
