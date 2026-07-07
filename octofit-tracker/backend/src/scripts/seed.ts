import mongoose from 'mongoose';
import {
  ActivityModel,
  LeaderboardEntryModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardEntryModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const users = await UserModel.insertMany([
      {
        name: 'Ava Chen',
        email: 'ava@example.com',
        fitnessGoal: 'Build endurance',
        level: 'Intermediate',
      },
      {
        name: 'Liam Patel',
        email: 'liam@example.com',
        fitnessGoal: 'Increase strength',
        level: 'Advanced',
      },
      {
        name: 'Mina Alvarez',
        email: 'mina@example.com',
        fitnessGoal: 'Improve mobility',
        level: 'Beginner',
      },
    ]);

    const teams = await TeamModel.insertMany([
      {
        name: 'Velocity Squad',
        sport: 'Running',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Core Collective',
        sport: 'CrossFit',
        members: [users[2]._id],
      },
    ]);

    await ActivityModel.insertMany([
      {
        userId: users[0]._id,
        type: 'Run',
        durationMinutes: 35,
        caloriesBurned: 420,
        date: new Date('2026-07-06T06:30:00.000Z'),
      },
      {
        userId: users[1]._id,
        type: 'Strength',
        durationMinutes: 55,
        caloriesBurned: 510,
        date: new Date('2026-07-06T18:00:00.000Z'),
      },
      {
        userId: users[2]._id,
        type: 'Yoga',
        durationMinutes: 30,
        caloriesBurned: 180,
        date: new Date('2026-07-05T08:00:00.000Z'),
      },
    ]);

    await LeaderboardEntryModel.insertMany([
      { userId: users[0]._id, points: 1380, rank: 1 },
      { userId: users[1]._id, points: 1270, rank: 2 },
      { userId: users[2]._id, points: 950, rank: 3 },
    ]);

    await WorkoutModel.insertMany([
      {
        userId: users[0]._id,
        title: 'Tempo Interval Run',
        difficulty: 'Intermediate',
        durationMinutes: 40,
        focus: 'Cardio',
      },
      {
        userId: users[1]._id,
        title: 'Upper Body Strength',
        difficulty: 'Advanced',
        durationMinutes: 50,
        focus: 'Strength',
      },
      {
        userId: users[2]._id,
        title: 'Mobility Flow',
        difficulty: 'Beginner',
        durationMinutes: 25,
        focus: 'Flexibility',
      },
    ]);

    console.log('Seeded teams:', teams.length);
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
