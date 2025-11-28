import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface StreakCelebrationProps {
    streak: number;
    onComplete: () => void;
}

const StreakCelebration: React.FC<StreakCelebrationProps> = ({ streak, onComplete }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => setTimeout(onComplete, 2000)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center pointer-events-none"
        >
            <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="text-center"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: 2
                    }}
                    className="inline-block mb-4"
                >
                    <Flame className="w-24 h-24 text-orange-500" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl font-bold text-neon-gold mb-2"
                >
                    {streak} Day Streak! 🔥
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl text-silver-light"
                >
                    You're on fire! Keep it up!
                </motion.p>
            </motion.div>
        </motion.div>
    );
};

export default StreakCelebration;
