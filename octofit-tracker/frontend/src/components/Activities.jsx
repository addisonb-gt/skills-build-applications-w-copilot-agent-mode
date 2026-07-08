import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeRecords } from '../lib/api.js';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(getApiBaseUrl('activities'));
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        setActivities(normalizeRecords(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load activities');
      }
    }

    loadActivities();
  }, []);

  return (
    <section className="card shadow-sm p-4">
      <h2 className="h4 mb-3">Activities</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {activities.map((activity) => (
          <li className="list-group-item" key={activity._id || activity.date}>
            <strong>{activity.type}</strong> — {activity.durationMinutes} min
            <div className="text-muted small">
              Calories: {activity.caloriesBurned} · {new Date(activity.date).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
