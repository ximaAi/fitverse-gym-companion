import React from 'react';
import { Badge } from '../types';
import { BADGE_DESCRIPTIONS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';

interface BadgeUnlockModalProps {
    badges: Badge[];
    onClose: () => void;
}

const BadgeUnlockModal: React.FC<BadgeUnlockModalProps> = ({ badges, onClose }) => {
    if (badges.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.5, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.5, opacity: 0, y: 50 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                    className="bg-gradient-to-br from-navy-dark to-navy-light border-2 border-neon-gold rounded-2xl p-8 max-w-md w-full relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-silver-dark hover:text-silver-light transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: 'spring', damping: 10 }}
                            className="inline-block mb-4"
                        >
                            <Trophy className="w-16 h-16 text-neon-gold" />
                        </motion.div>

                        <h2 className="text-3xl font-bold text-neon-gold mb-2">Achievement Unlocked!</h2>
                        <p className="text-silver-dark mb-6">You've earned {badges.length} new badge{badges.length > 1 ? 's' : ''}!</p>

                        <div className="space-y-4">
                            {badges.map((badge, index) => (
                                <motion.div
                                    key={badge}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="bg-navy-light/50 border border-neon-gold/30 rounded-lg p-4 flex items-center gap-4"
                                >
                                    <span className="text-4xl">{BADGE_DESCRIPTIONS[badge].icon}</span>
                                    <div className="text-left">
                                        <h3 className="text-lg font-bold text-silver-light">{badge}</h3>
                                        <p className="text-sm text-silver-dark">{BADGE_DESCRIPTIONS[badge].description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onClose}
                            className="mt-6 bg-neon-gold text-navy-dark font-bold py-3 px-8 rounded-lg w-full"
                        >
                            Awesome!
                        </motion.button>
                    </div>

                    {/* Confetti effect */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: -20, x: Math.random() * 400, opacity: 1 }}
                                animate={{
                                    y: 500,
                                    x: Math.random() * 400,
                                    rotate: Math.random() * 360,
                                    opacity: 0
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    delay: Math.random() * 0.5,
                                    repeat: Infinity,
                                    repeatDelay: 3
                                }}
                                className="absolute w-2 h-2 bg-neon-gold rounded-full"
                                style={{ left: `${Math.random() * 100}%` }}
                            />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default BadgeUnlockModal;
