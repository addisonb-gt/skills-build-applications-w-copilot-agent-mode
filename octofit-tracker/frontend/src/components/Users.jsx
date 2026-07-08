import { useEffect, useState } from 'react';
import { normalizeRecords } from '../lib/api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        setUsers(normalizeRecords(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load users');
      }
    }

    loadUsers();
  }, []);

  return (
    <section className="card shadow-sm p-4">
      <h2 className="h4 mb-3">Users</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item" key={user._id || user.email}>
            <strong>{user.name}</strong> — {user.email}
            <div className="text-muted small">
              Goal: {user.fitnessGoal} · Level: {user.level}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
