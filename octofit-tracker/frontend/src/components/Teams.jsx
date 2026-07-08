import { useEffect, useState } from 'react';
import { normalizeRecords } from '../lib/api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        setTeams(normalizeRecords(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load teams');
      }
    }

    loadTeams();
  }, []);

  return (
    <section className="card shadow-sm p-4">
      <h2 className="h4 mb-3">Teams</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {teams.map((team) => (
          <li className="list-group-item" key={team._id || team.name}>
            <strong>{team.name}</strong> — {team.sport}
          </li>
        ))}
      </ul>
    </section>
  );
}
