import mongoose, { Schema, type Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  fitnessGoal: string;
  level: string;
}

export interface ITeam {
  name: string;
  sport: string;
  members: mongoose.Types.ObjectId[];
}

export interface IActivity {
  userId: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
}

export interface ILeaderboardEntry {
  userId: mongoose.Types.ObjectId;
  points: number;
  rank: number;
}

export interface IWorkout {
  userId: mongoose.Types.ObjectId;
  title: string;
  difficulty: string;
  durationMinutes: number;
  focus: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fitnessGoal: { type: String, required: true },
  level: { type: String, required: true },
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, required: true },
  rank: { type: Number, required: true },
});

const workoutSchema = new Schema<IWorkout>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  focus: { type: String, required: true },
});

export const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export const TeamModel: Model<ITeam> = mongoose.model<ITeam>('Team', teamSchema);
export const ActivityModel: Model<IActivity> = mongoose.model<IActivity>('Activity', activitySchema);
export const LeaderboardEntryModel: Model<ILeaderboardEntry> = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const WorkoutModel: Model<IWorkout> = mongoose.model<IWorkout>('Workout', workoutSchema);
