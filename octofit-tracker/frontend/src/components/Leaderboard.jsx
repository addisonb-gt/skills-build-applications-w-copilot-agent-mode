import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeRecords } from '../lib/api.js';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(getApiBaseUrl('leaderboard'));
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        setEntries(normalizeRecords(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load leaderboard');
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section className="card shadow-sm p-4">
      <h2 className="h4 mb-3">Leaderboard</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {entries.map((entry) => (
          <li className="list-group-item" key={entry._id || entry.rank}>
            <strong>Rank {entry.rank}</strong> — {entry.points} points
          </li>
        ))}
      </ul>
    </section>
  );
}
