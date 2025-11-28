import React, { useState, useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import { MOCK_WORKOUTS } from '../constants';
import { Workout, Badge } from '../types';
import GlassCard from '../components/GlassCard';
import { CheckCircle, Circle, Bot, Loader, Award } from 'lucide-react';
import { generateWorkoutPlan } from '../services/geminiService';
import { calculateSmartStreak, checkAchievements } from '../utils/gamification';
import BadgeUnlockModal from '../components/BadgeUnlockModal';
import StreakCelebration from '../components/StreakCelebration';
import { AnimatePresence } from 'framer-motion';

const WorkoutView: React.FC = () => {
    const { user, updateUser } = useUser();
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [newBadges, setNewBadges] = useState<Badge[]>([]);
    const [showStreakCelebration, setShowStreakCelebration] = useState(false);
    const [previousStreak, setPreviousStreak] = useState(user.stats.streak);

    useEffect(() => {
        setWorkouts(MOCK_WORKOUTS[user.goal]);
    }, [user.goal]);

    const handleToggleWorkout = (id: string) => {
        const updatedWorkouts = workouts.map(w => w.id === id ? { ...w, completed: !w.completed } : w);
        setWorkouts(updatedWorkouts);
    };

    const handleCompleteWorkout = () => {
        const completedCount = workouts.filter(w => w.completed).length;

        if (completedCount === 0) {
            setError('Please complete at least one exercise!');
            setTimeout(() => setError(null), 3000);
            return;
        }

        // Update workout dates
        const newWorkoutDates = [...user.workoutDates, new Date().toISOString()];

        // Calculate new streak
        const newStreak = calculateSmartStreak(newWorkoutDates, user.weeklyGoal);
        const streakIncreased = newStreak > previousStreak;

        // Calculate new stats
        const pointsEarned = completedCount * 50;
        const progressIncrement = completedCount * 2;
        const newProgress = Math.min(100, user.progress + progressIncrement);

        const updatedUser = {
            ...user,
            progress: newProgress,
            workoutDates: newWorkoutDates,
            stats: {
                ...user.stats,
                workoutsCompleted: user.stats.workoutsCompleted + completedCount,
                points: user.stats.points + pointsEarned,
                streak: newStreak,
            },
        };

        // Check for new achievements
        const unlockedBadges = checkAchievements(updatedUser);

        if (unlockedBadges.length > 0) {
            updatedUser.achievements = [...user.achievements, ...unlockedBadges];
        }

        // Update user
        updateUser(updatedUser);

        // Show celebrations
        if (streakIncreased) {
            setPreviousStreak(newStreak);
            setShowStreakCelebration(true);
        }

        if (unlockedBadges.length > 0) {
            setTimeout(() => setNewBadges(unlockedBadges), streakIncreased ? 2500 : 0);
        }

        // Reset workouts
        setWorkouts(workouts.map(w => ({ ...w, completed: false })));
    };

    const handleGenerateAIWorkout = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const newWorkouts = await generateWorkoutPlan(user, user.selectedTrainer);
            setWorkouts(newWorkouts);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <div className="space-y-6">
                <GlassCard>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-silver-light">Today's Focus: {user.goal}</h2>
                            <p className="text-silver-dark">Check off exercises and hit Complete Workout when done!</p>
                        </div>
                        <button
                            onClick={handleGenerateAIWorkout}
                            disabled={isLoading}
                            className="flex items-center space-x-2 bg-neon-gold text-navy-dark font-bold py-2 px-4 rounded-lg transition-transform duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
                        >
                            {isLoading ? <Loader className="animate-spin" /> : <Bot />}
                            <span>{isLoading ? 'Generating...' : 'Generate AI Workout'}</span>
                        </button>
                    </div>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </GlassCard>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {workouts.map((workout, index) => (
                        <GlassCard
                            key={workout.id}
                            className={`cursor-pointer border-2 ${workout.completed ? 'border-neon-gold' : 'border-transparent'}`}
                            style={{ animation: 'fadeIn 0.5s ease-out forwards', animationDelay: `${index * 100}ms` }}
                            onClick={() => handleToggleWorkout(workout.id)}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-silver-light">{workout.name}</h3>
                                    <p className="text-silver-dark">{workout.sets} sets x {workout.reps} reps</p>
                                </div>
                                {workout.completed ? (
                                    <CheckCircle className="w-8 h-8 text-neon-gold" />
                                ) : (
                                    <Circle className="w-8 h-8 text-silver-dark" />
                                )}
                            </div>
                        </GlassCard>
                    ))}
                </div>

                {/* Complete Workout Button */}
                <GlassCard className="sticky bottom-4 z-10">
                    <button
                        onClick={handleCompleteWorkout}
                        className="w-full bg-gradient-to-r from-neon-gold to-yellow-600 text-navy-dark font-bold py-4 px-6 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        <Award className="w-6 h-6" />
                        <span className="text-lg">Complete Workout</span>
                    </button>
                </GlassCard>
            </div>

            {/* Animations */}
            <AnimatePresence>
                {showStreakCelebration && (
                    <StreakCelebration
                        streak={user.stats.streak}
                        onComplete={() => setShowStreakCelebration(false)}
                    />
                )}
            </AnimatePresence>

            <BadgeUnlockModal
                badges={newBadges}
                onClose={() => setNewBadges([])}
            />
        </>
    );
};

export default WorkoutView;
