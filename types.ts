import {
  Gender,
  Goal,
  Role,
  Theme,
  View,
} from './constants';

export {
  Role,
  Theme,
  View,
};

export type {
  Gender,
  Goal,
};

export interface UserStats {
  points: number;
  streak: number;
  workoutsCompleted: number;
  bmi: number;
}

export type Badge =
  | 'Marathoner'
  | 'Century Club'
  | 'Consistency King'
  | 'Rising Star'
  | 'Strength Pro'
  | 'Cardio Champ'
  | 'Early Bird'
  | 'Night Owl'
  | 'Weekend Warrior'
  | 'Phoenix Fire'
  | 'Monthly Master'
  | 'AI Enthusiast'
  | 'Iron Giant'
  | 'Cardio King'
  | 'Perfect Week'
  | 'Jack of All Trades';

export interface AvatarCustomization {
  avatarId: string; // e.g., 'cat', 'dog', 'robot'
}

export interface TrainerPersona {
  id: string;
  name: string;
  description: string;
  promptModifier: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  goal: Goal;
  gender: Gender;
  currentWeight: number; // in kg
  progress: number; // percentage 0-100
  stats: UserStats;
  achievements: Badge[];
  avatar: AvatarCustomization;
  selectedTrainer: string; // ID of the selected trainer persona
  weeklyGoal: number; // Days per week
  workoutDates: string[]; // ISO date strings
  signatureBadge: Badge | null;
}

export interface Workout {
  id: string;
  name: string;
  sets: number;
  reps: string; // e.g., '10-12' or '60s'
  completed: boolean;
}

export interface AppState {
  activeUser: User;
  users: User[];
  activeView: View;
  role: Role;
  theme: Theme;
  isAuthenticated: boolean;
}