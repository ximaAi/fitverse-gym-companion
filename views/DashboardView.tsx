
import React from 'react';
import { useUser } from '../hooks/useUser';
import GlassCard from '../components/GlassCard';
import AvatarViewer from '../components/AvatarViewer';
import { Target, TrendingUp, Zap, BarChart, Sun, Moon, Flame, Trophy } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { BADGE_DESCRIPTIONS } from '../constants';
import { motion } from 'framer-motion';

const StatCard: React.FC<{ icon: React.ElementType; label: string; value: string | number; unit: string; color: string }> = ({ icon: Icon, label, value, unit, color }) => (
    <GlassCard className="flex items-center space-x-4">
        <div className={`p-3 rounded-full`} style={{ backgroundColor: color + '20' }}>
            <Icon className="w-6 h-6" style={{ color: color }} />
        </div>
        <div>
            <p className="text-sm text-silver-dark">{label}</p>
            <p className="text-xl font-bold text-silver-light">
                {value} <span className="text-sm font-normal text-silver-dark">{unit}</span>
            </p>
        </div>
    </GlassCard>
);

const StreakCard: React.FC<{ streak: number }> = ({ streak }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative overflow-hidden"
    >
        <GlassCard className="border-2 border-orange-500/50 bg-gradient-to-br from-orange-500/10 to-transparent">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        className="p-4 rounded-full bg-orange-500/20"
                    >
                        <Flame className="w-10 h-10 text-orange-500" />
                    </motion.div>
                    <div>
                        <p className="text-sm text-silver-dark uppercase tracking-wide">Current Streak</p>
                        <p className="text-4xl font-bold text-orange-500">{streak}</p>
                        <p className="text-xs text-silver-dark">weeks in a row 🔥</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-silver-dark mb-1">Next Milestone</p>
                    <div className="w-24 bg-navy-light rounded-full h-2">
                        <div
                            className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(streak % 5) * 20}%` }}
                        />
                    </div>
                    <p className="text-xs text-silver-dark mt-1">{5 - (streak % 5)} weeks to go</p>
                </div>
            </div>
        </GlassCard>
    </motion.div>
);

const RecentBadges: React.FC<{ badges: string[] }> = ({ badges }) => (
    <GlassCard>
        <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-neon-gold" />
            <h3 className="text-lg font-bold text-silver-light">Recent Achievements</h3>
        </div>
        {badges.length === 0 ? (
            <p className="text-silver-dark text-sm italic">Complete workouts to earn badges!</p>
        ) : (
            <div className="space-y-2">
                {badges.slice(-3).reverse().map((badge, index) => (
                    <motion.div
                        key={badge}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 bg-navy-light/50 p-2 rounded-lg border border-neon-gold/20"
                    >
                        <span className="text-2xl">{BADGE_DESCRIPTIONS[badge as keyof typeof BADGE_DESCRIPTIONS]?.icon || '🏆'}</span>
                        <div>
                            <p className="text-sm font-semibold text-silver-light">{badge}</p>
                            <p className="text-xs text-silver-dark">{BADGE_DESCRIPTIONS[badge as keyof typeof BADGE_DESCRIPTIONS]?.description || ''}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        )}
    </GlassCard>
);

const ProgressDisplay: React.FC<{ userProgress: number }> = ({ userProgress }) => (
    <GlassCard className="col-span-1 md:col-span-2">
        <h3 className="text-lg font-bold text-silver-light mb-2">Goal Progress: {userProgress.toFixed(0)}%</h3>
        <div className="w-full bg-navy-light rounded-full h-4">
            <div
                className="bg-neon-gold h-4 rounded-full transition-all duration-500"
                style={{ width: `${userProgress}%` }}
            ></div>
        </div>
        <div className="flex justify-between text-xs text-silver-dark mt-1">
            <span>Start</span>
            <span>Milestone</span>
            <span>Goal!</span>
        </div>
    </GlassCard>
);

const DashboardView: React.FC = () => {
    const { user, updateUser } = useUser();
    const { theme, toggleTheme } = useTheme();

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newProgress = parseInt(e.target.value, 10);
        updateUser({ ...user, progress: newProgress });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
            {/* Left Side: Avatar & Progress Slider */}
            <div className="md:col-span-2 flex flex-col h-full min-h-[500px] md:min-h-0">
                <GlassCard className="flex-grow flex flex-col p-0 overflow-hidden relative">
                    <div className="absolute top-4 left-4 z-20">
                        <h2 className="text-xl font-bold text-silver-light drop-shadow-md">Avatar Evolution</h2>
                    </div>
                    <div className="absolute top-4 right-4 z-20">
                        <button onClick={toggleTheme} className="p-2 rounded-full bg-navy-dark/50 backdrop-blur-md hover:bg-white/10 border border-glass-border">
                            {theme === 'dark' ? <Sun className="text-yellow-400 w-5 h-5" /> : <Moon className="text-blue-300 w-5 h-5" />}
                        </button>
                    </div>

                    {/* Main Avatar Area */}
                    <div className="flex-grow w-full h-full">
                        <AvatarViewer user={user} />
                    </div>

                    {/* Controls Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy-dark/90 to-transparent pt-12 z-20">
                        <label htmlFor="progress" className="block mb-2 text-sm font-medium text-silver-light text-center">
                            Simulate Progress: <span className="font-bold text-neon-gold">{user.progress}%</span>
                        </label>
                        <input
                            id="progress"
                            type="range"
                            min="0"
                            max="100"
                            value={user.progress}
                            onChange={handleProgressChange}
                            className="w-full h-2 bg-navy-light/50 rounded-lg appearance-none cursor-pointer backdrop-blur-sm border border-glass-border [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neon-gold [&::-webkit-slider-thumb]:shadow-glow"
                        />
                    </div>
                </GlassCard>
            </div>

            {/* Right Side: Stats */}
            <div className="md:col-span-1 flex flex-col gap-6">
                <GlassCard>
                    <h2 className="text-2xl font-bold text-silver-light mb-1">Welcome, {user.name.split(' ')[0]}!</h2>
                    <p className="text-silver-dark">Current Goal: <span className="font-semibold text-neon-gold">{user.goal}</span></p>
                </GlassCard>

                {/* Streak Card - Now Featured */}
                <StreakCard streak={user.stats.streak} />

                {/* Recent Badges */}
                <RecentBadges badges={user.achievements} />

                <ProgressDisplay userProgress={user.progress} />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
                    <StatCard icon={Target} label="Current Weight" value={user.currentWeight} unit="kg" color="#FFD700" />
                    <StatCard icon={BarChart} label="BMI" value={user.stats.bmi.toFixed(1)} unit="" color="#00BFFF" />
                    <StatCard icon={TrendingUp} label="Points" value={user.stats.points} unit="" color="#FFFFFF" />
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
