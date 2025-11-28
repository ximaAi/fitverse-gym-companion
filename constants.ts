
// FIX: Removed 'Goal' from import to resolve name collision.
import { User, Workout, Badge, TrainerPersona } from './types';

// Enums and Types
export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

export enum Role {
  Member = 'Member',
  Trainer = 'Trainer',
}

export enum View {
  Dashboard = 'Dashboard',
  Workout = 'Workout',
  Leaderboard = 'Leaderboard',
  Achievements = 'Achievements',
  Profile = 'Profile',
  TrainerDashboard = 'Trainer Dashboard',
}

export type Goal = 'Build Muscle' | 'Lose Weight' | 'Improve Endurance';
export const GOALS: Goal[] = ['Build Muscle', 'Lose Weight', 'Improve Endurance'];

export const GOAL_COLORS: Record<Goal, string> = {
  'Build Muscle': '#FF4500',     // Orange Red for intensity/strength
  'Lose Weight': '#32CD32',      // Lime Green for health/vitality
  'Improve Endurance': '#00BFFF', // Deep Sky Blue for stamina/energy
};

export type Gender = 'Male' | 'Female' | 'Other';
export const GENDERS: Gender[] = ['Male', 'Female', 'Other'];

const AVATAR_URL = (name: string) => `https://api.dicebear.com/8.x/pixel-art/svg?seed=${name}`;

export const AVATARS: Record<string, { name: string; progressImages: Record<Goal, string[]> }> = {
  cat: {
    name: 'Fitness Cat',
    progressImages: {
      'Build Muscle': [AVATAR_URL('cat_start'), AVATAR_URL('cat_mid'), AVATAR_URL('cat_strong')],
      'Lose Weight': [AVATAR_URL('cat_heavy'), AVATAR_URL('cat_mid'), AVATAR_URL('cat_lean')],
      'Improve Endurance': [AVATAR_URL('cat_slow'), AVATAR_URL('cat_runner'), AVATAR_URL('cat_fast')],
    }
  },
  dog: {
    name: 'Power Pup',
    progressImages: {
      'Build Muscle': [AVATAR_URL('dog_start'), AVATAR_URL('dog_mid'), AVATAR_URL('dog_buff')],
      'Lose Weight': [AVATAR_URL('dog_chunky'), AVATAR_URL('dog_active'), AVATAR_URL('dog_fit')],
      'Improve Endurance': [AVATAR_URL('dog_nap'), AVATAR_URL('dog_jog'), AVATAR_URL('dog_dash')],
    }
  },
  robot: {
    name: 'Gym Bot',
    progressImages: {
      'Build Muscle': [AVATAR_URL('bot_v1'), AVATAR_URL('bot_v2'), AVATAR_URL('bot_v3_titan')],
      'Lose Weight': [AVATAR_URL('bot_heavy'), AVATAR_URL('bot_sleek'), AVATAR_URL('bot_nano')],
      'Improve Endurance': [AVATAR_URL('bot_base'), AVATAR_URL('bot_upgraded'), AVATAR_URL('bot_turbo')],
    }
  },
  pixel: {
    name: 'Pixel Pal',
    progressImages: {
      'Build Muscle': [AVATAR_URL('pix_1'), AVATAR_URL('pix_2'), AVATAR_URL('pix_3')],
      'Lose Weight': [AVATAR_URL('pix_4'), AVATAR_URL('pix_5'), AVATAR_URL('pix_6')],
      'Improve Endurance': [AVATAR_URL('pix_7'), AVATAR_URL('pix_8'), AVATAR_URL('pix_9')],
    }
  }
};


export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: 'Alex Thorne',
    email: 'alex.thorne@fitverse.demo',
    goal: 'Build Muscle',
    gender: 'Male',
    currentWeight: 85,
    progress: 45,
    stats: {
      points: 4850,
      streak: 12,
      workoutsCompleted: 35,
      bmi: 24.5,
    },
    achievements: ['Rising Star', 'Consistency King', 'AI Enthusiast'],
    avatar: {
      avatarId: 'cat',
    },
    selectedTrainer: 'drill_sergeant',
    weeklyGoal: 3,
    workoutDates: [],
    signatureBadge: 'Rising Star',
  },
  {
    id: 2,
    name: 'Jasmine Lee',
    email: 'jasmine.lee@fitverse.demo',
    goal: 'Improve Endurance',
    gender: 'Female',
    currentWeight: 62,
    progress: 75,
    stats: {
      points: 7200,
      streak: 28,
      workoutsCompleted: 50,
      bmi: 21.3,
    },
    achievements: ['Rising Star', 'Consistency King', 'Cardio Champ', 'Marathoner', 'Monthly Master', 'Perfect Week'],
    avatar: {
      avatarId: 'dog',
    },
    selectedTrainer: 'zen_master',
    weeklyGoal: 4,
    workoutDates: [],
    signatureBadge: 'Marathoner',
  },
  {
    id: 3,
    name: 'Ken Miles',
    email: 'ken.miles@fitverse.demo',
    goal: 'Lose Weight',
    gender: 'Male',
    currentWeight: 95,
    progress: 60,
    stats: {
      points: 6100,
      streak: 18,
      workoutsCompleted: 42,
      bmi: 28.1,
    },
    achievements: ['Rising Star', 'Consistency King', 'Century Club', 'Weekend Warrior'],
    avatar: {
      avatarId: 'robot',
    },
    selectedTrainer: 'scientist',
    weeklyGoal: 2,
    workoutDates: [],
    signatureBadge: null,
  },
];

export const MOCK_WORKOUTS: Record<Goal, Workout[]> = {
  'Build Muscle': [
    { id: 'bm1', name: 'Barbell Bench Press', sets: 4, reps: '8-10', completed: false },
    { id: 'bm2', name: 'Dumbbell Rows', sets: 4, reps: '10-12', completed: false },
    { id: 'bm3', name: 'Squats', sets: 5, reps: '6-8', completed: false },
    { id: 'bm4', name: 'Overhead Press', sets: 3, reps: '10-12', completed: false },
    { id: 'bm5', name: 'Bicep Curls', sets: 3, reps: '12-15', completed: false },
  ],
  'Lose Weight': [
    { id: 'lw1', name: 'Treadmill Run', sets: 1, reps: '30 min', completed: false },
    { id: 'lw2', name: 'Kettlebell Swings', sets: 4, reps: '15', completed: false },
    { id: 'lw3', name: 'Burpees', sets: 3, reps: '15', completed: false },
    { id: 'lw4', name: 'Jump Rope', sets: 5, reps: '2 min', completed: false },
    { id: 'lw5', name: 'Plank', sets: 3, reps: '60s', completed: false },
  ],
  'Improve Endurance': [
    { id: 'ie1', name: 'Cycling', sets: 1, reps: '45 min', completed: false },
    { id: 'ie2', name: 'Rowing Machine', sets: 1, reps: '2000m', completed: false },
    { id: 'ie3', name: 'Box Jumps', sets: 4, reps: '12', completed: false },
    { id: 'ie4', name: 'Farmer\'s Walk', sets: 3, reps: '50m', completed: false },
    { id: 'ie5', name: 'High-Knees', sets: 3, reps: '60s', completed: false },
  ],
};

export const BADGE_DESCRIPTIONS: Record<Badge, { description: string; icon: string }> = {
  'Marathoner': { description: 'Complete an endurance workout.', icon: '🏃' },
  'Century Club': { description: 'Complete 100 workouts.', icon: '💯' },
  'Consistency King': { description: 'Maintain a 7-day streak.', icon: '👑' },
  'Rising Star': { description: 'Earn 1,000 points.', icon: '🌟' },
  'Strength Pro': { description: 'Master a strength workout.', icon: '💪' },
  'Cardio Champ': { description: 'Excel in a cardio challenge.', icon: '❤️' },
  'Early Bird': { description: 'Workout before 8 AM.', icon: '🐦' },
  'Night Owl': { description: 'Workout after 8 PM.', icon: '🦉' },
  'Weekend Warrior': { description: 'Complete a workout on a Saturday or Sunday.', icon: '🎉' },
  'Phoenix Fire': { description: 'Recover a lost streak.', icon: '🔥' },
  'Monthly Master': { description: 'Maintain a 30-day streak.', icon: '🗓️' },
  'AI Enthusiast': { description: 'Generate 5 AI workout plans.', icon: '🤖' },
  'Iron Giant': { description: 'Lift a cumulative 10,000kg.', icon: '🏋️' },
  'Cardio King': { description: 'Cover a cumulative distance of a marathon (42km).', icon: '👟' },
  'Perfect Week': { description: 'Workout every day for a full week.', icon: '✅' },
  'Jack of All Trades': { description: 'Try workouts for all three goal types.', icon: '🤸' },
};

export const BADGE_ORDER: Badge[] = [
  'Iron Giant', 'Cardio King', 'Century Club', 'Monthly Master', // Legendary
  'Marathoner', 'Perfect Week', 'Phoenix Fire', 'AI Enthusiast', // Epic
  'Consistency King', 'Rising Star', 'Weekend Warrior', 'Jack of All Trades', // Rare
  'Strength Pro', 'Cardio Champ', 'Early Bird', 'Night Owl' // Common
];

export const TRAINER_PERSONAS: TrainerPersona[] = [
  {
    id: 'drill_sergeant',
    name: 'Sgt. Steel',
    description: 'No excuses. High intensity. Direct commands.',
    promptModifier: 'You are Sgt. Steel, a tough military drill sergeant. Use all caps frequently. Be demanding, direct, and accept no excuses. Focus on discipline and pushing limits. Call the user "recruit".',
  },
  {
    id: 'zen_master',
    name: 'Guru Flow',
    description: 'Mindful. Balanced. Focus on form and breathing.',
    promptModifier: 'You are Guru Flow, a zen yoga and fitness master. Speak calmly and metaphorically. Focus on breath, form, and the mind-body connection. Encourage the user to find their inner strength.',
  },
  {
    id: 'hype_man',
    name: 'Max Energy',
    description: 'High energy! Positive vibes! You got this!',
    promptModifier: 'You are Max Energy, the ultimate hype man. Use lots of exclamation marks! Be super enthusiastic, supportive, and energetic. Focus on fun and celebrating every win. Call the user "Champ" or "Legend".',
  },
  {
    id: 'scientist',
    name: 'Dr. Optimal',
    description: 'Data-driven. Precise. Focus on efficiency.',
    promptModifier: 'You are Dr. Optimal, a sports scientist. Speak with precision and use technical terms where appropriate. Explain the "why" behind exercises. Focus on efficiency and biomechanics.',
  },
];
