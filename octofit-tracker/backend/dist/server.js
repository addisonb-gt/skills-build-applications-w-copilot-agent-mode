import express from 'express';
import mongoose from 'mongoose';
import routes from './routes.js';
const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express.json());
app.use(routes);
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl });
});
app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
    console.log(`API base URL: ${apiBaseUrl}`);
    mongoose
        .connect(MONGODB_URI)
        .then(() => {
        console.log(`Connected to MongoDB at ${MONGODB_URI}`);
    })
        .catch((error) => {
        console.warn('MongoDB connection failed; continuing without a database connection.', error);
    });
});
