import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import type { AddressInfo } from 'node:net';
import mongoose from 'mongoose';
import routes from './routes.ts';

test('supports /api/users and /api/activities without a trailing slash', async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db');

  const app = express();
  app.use(routes);

  const server = app.listen(0);

  try {
    await new Promise<void>((resolve, reject) => {
      server.once('listening', () => resolve());
      server.once('error', reject);
    });

    const { port } = server.address() as AddressInfo;

    const usersResponse = await fetch(`http://127.0.0.1:${port}/api/users`);
    assert.equal(usersResponse.status, 200);

    const activitiesResponse = await fetch(`http://127.0.0.1:${port}/api/activities`);
    assert.equal(activitiesResponse.status, 200);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });

    await mongoose.disconnect();
  }
});
