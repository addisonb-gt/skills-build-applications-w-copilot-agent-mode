import { Router } from 'express';
import {
  ActivityModel,
  LeaderboardEntryModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from './models.js';

const router = Router();

const modelMap: Record<string, any> = {
  users: UserModel,
  teams: TeamModel,
  activities: ActivityModel,
  leaderboard: LeaderboardEntryModel,
  workouts: WorkoutModel,
};

const createCollectionRoute = (resource: string) => {
  router.get(`/api/${resource}/`, async (_req, res) => {
    const records = await modelMap[resource].find({});
    res.json(records);
  });

  router.post(`/api/${resource}/`, async (req, res) => {
    const record = await modelMap[resource].create(req.body);
    res.status(201).json(record);
  });
};

for (const resource of Object.keys(modelMap)) {
  createCollectionRoute(resource);
}

export default router;
