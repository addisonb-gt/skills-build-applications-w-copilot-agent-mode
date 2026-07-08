import express from 'express';
import mongoose from 'mongoose';
import routes from './routes.js';
import { getApiBaseUrl } from './utils/apiUrl.js';
const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
app.use(express.json());
app.use(routes);
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl: getApiBaseUrl() });
});
app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
    console.log(`API base URL: ${getApiBaseUrl()}`);
    mongoose
        .connect(MONGODB_URI)
        .then(() => {
        console.log(`Connected to MongoDB at ${MONGODB_URI}`);
    })
        .catch((error) => {
        console.warn('MongoDB connection failed; continuing without a database connection.', error);
    });
});
