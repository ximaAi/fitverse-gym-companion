

import React from 'react';
import { useUser } from '../hooks/useUser';
import GlassCard from '../components/GlassCard';
import { BADGE_DESCRIPTIONS } from '../constants';
import { Badge } from '../types';

const BadgeCard: React.FC<{ badge: Badge, unlocked: boolean }> = ({ badge, unlocked }) => {
    const { description, icon } = BADGE_DESCRIPTIONS[badge];
    return (
        <GlassCard className={`flex flex-col items-center justify-center text-center p-4 transition-all duration-300 ${unlocked ? 'opacity-100 hover:scale-105 hover:shadow-lg hover:shadow-neon-gold/20 cursor-pointer' : 'opacity-40 grayscale'}`}>
            <div className={`text-6xl mb-4 ${unlocked ? 'filter-none' : 'filter grayscale'}`}>{icon}</div>
            <h3 className={`font-bold text-lg ${unlocked ? 'text-neon-gold' : 'text-silver-dark'}`}>{badge}</h3>
            <p className="text-sm text-silver-dark mt-1">{description}</p>
        </GlassCard>
    );
};

const AchievementsView: React.FC = () => {
    const { user } = useUser();
    const allBadges = Object.keys(BADGE_DESCRIPTIONS) as Badge[];

    return (
        <div className="space-y-6">
            <GlassCard>
                <h2 className="text-2xl font-bold text-silver-light">Your Trophy Case</h2>
                <p className="text-silver-dark">Celebrate your milestones and hard work. Collect them all!</p>
            </GlassCard>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allBadges.map((badge, index) => (
                    <div key={badge} style={{ animation: `fadeIn 0.5s ease-out ${index * 0.05}s forwards`, opacity: 0 }}>
                        <BadgeCard 
                            badge={badge} 
                            unlocked={user.achievements.includes(badge)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AchievementsView;