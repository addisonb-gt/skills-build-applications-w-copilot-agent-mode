The presentation tier reads API data from the backend using Vite environment variables.

Create a local env file at .env.local with:

VITE_CODESPACE_NAME=your-codespace-name

If VITE_CODESPACE_NAME is unset, the UI falls back to localhost:8000.
