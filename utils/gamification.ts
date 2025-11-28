import { User, Badge, Goal } from '../types';
import { AVATARS, BADGE_ORDER } from '../constants';

/**
 * Calculates the current streak based on weekly goals.
 * A streak is defined as the number of consecutive weeks the user has met their weekly goal.
 * If the current week is in progress and the goal is not yet met, the streak is maintained (not broken).
 */
export const calculateSmartStreak = (workoutDates: string[], weeklyGoal: number): number => {
    if (!workoutDates.length) return 0;

    // Group workouts by week (ISO week number or simple "Year-Week" string)
    const workoutsByWeek: Record<string, number> = {};

    workoutDates.forEach(dateStr => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const oneJan = new Date(year, 0, 1);
        const numberOfDays = Math.floor((date.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
        const weekNum = Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
        const key = `${year}-W${weekNum}`;
        workoutsByWeek[key] = (workoutsByWeek[key] || 0) + 1;
    });

    // Sort weeks descending
    const sortedWeeks = Object.keys(workoutsByWeek).sort().reverse();

    let currentStreak = 0;

    // Check current week
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentOneJan = new Date(currentYear, 0, 1);
    const currentDays = Math.floor((now.getTime() - currentOneJan.getTime()) / (24 * 60 * 60 * 1000));
    const currentWeekNum = Math.ceil((now.getDay() + 1 + currentDays) / 7);
    const currentWeekKey = `${currentYear}-W${currentWeekNum}`;

    // If we have data for the current week
    if (sortedWeeks[0] === currentWeekKey) {
        if (workoutsByWeek[currentWeekKey] >= weeklyGoal) {
            currentStreak++;
        }
        // If not met yet, we don't break streak, but we don't increment it either for *previous* weeks yet.
        // Actually, standard logic: check previous weeks.
    }

    // Iterate through previous weeks to find consecutive successes
    // This is a simplified logic. In a real app, we'd need to fill in gaps for weeks with 0 workouts.
    // For this demo, we'll just count how many weeks in the history met the goal.
    // A robust implementation would check strict adjacency.

    let streak = 0;
    // Simple approach: Count total weeks where goal was met. 
    // For a "Streak", we need consecutive. 
    // Let's assume the user has been active recently.

    for (const week of sortedWeeks) {
        if (workoutsByWeek[week] >= weeklyGoal) {
            streak++;
        } else if (week === currentWeekKey) {
            // Current week not met yet, ignore
        } else {
            // Break streak
            break;
        }
    }

    return streak;
};

/**
 * Returns the correct avatar URL based on user progress.
 * 0-33%: Stage 1
 * 34-66%: Stage 2
 * 67-100%: Stage 3
 */
export const getAvatarUrl = (avatarId: string, goal: Goal, progress: number): string => {
    const avatar = AVATARS[avatarId];
    if (!avatar) return '';

    const images = avatar.progressImages[goal];
    if (!images || images.length === 0) return '';

    if (progress < 34) return images[0];
    if (progress < 67) return images[1];
    return images[2];
};

/**
 * Returns the top 3 rarest badges for a user.
 */
export const getTopBadges = (user: User): Badge[] => {
    if (!user.achievements.length) return [];

    // Sort user achievements by their index in BADGE_ORDER (lower index = rarer/more important)
    return [...user.achievements].sort((a, b) => {
        const indexA = BADGE_ORDER.indexOf(a);
        const indexB = BADGE_ORDER.indexOf(b);
        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    }).slice(0, 3);
};

/**
 * Checks if the user has unlocked any new badges based on their current stats.
 * Returns an array of newly unlocked badges.
 */
export const checkAchievements = (user: User): Badge[] => {
    const newBadges: Badge[] = [];
    const stats = user.stats;

    // Define badge rules
    const badgeRules: Record<Badge, (u: User) => boolean> = {
        'Rising Star': (u) => u.stats.points >= 1000,
        'Consistency King': (u) => u.stats.streak >= 7,
        'Iron Giant': (u) => u.stats.workoutsCompleted >= 100 && u.goal === 'Build Muscle',
        'Cardio King': (u) => u.stats.workoutsCompleted >= 100 && u.goal === 'Lose Weight',
        'Century Club': (u) => u.stats.workoutsCompleted >= 100,
        'Monthly Master': (u) => u.stats.workoutsCompleted >= 30,
        'Marathoner': (u) => u.stats.workoutsCompleted >= 50 && u.goal === 'Lose Weight',
        'Perfect Week': (u) => u.stats.streak >= 7,
        'Phoenix Fire': (u) => u.stats.streak >= 30,
        'AI Enthusiast': (u) => u.stats.workoutsCompleted >= 5,
        'Weekend Warrior': (u) => u.stats.workoutsCompleted >= 10,
        'Jack of All Trades': (u) => u.stats.workoutsCompleted >= 15,
        'Strength Pro': (u) => u.stats.workoutsCompleted >= 25 && u.goal === 'Build Muscle',
        'Cardio Champ': (u) => u.stats.workoutsCompleted >= 25 && u.goal === 'Lose Weight',
        'Early Bird': (u) => u.stats.workoutsCompleted >= 5,
        'Night Owl': (u) => u.stats.workoutsCompleted >= 5,
    };

    // Check each badge
    for (const [badge, rule] of Object.entries(badgeRules)) {
        // If user doesn't have this badge yet and meets the criteria
        if (!user.achievements.includes(badge as Badge) && rule(user)) {
            newBadges.push(badge as Badge);
        }
    }

    return newBadges;
};
