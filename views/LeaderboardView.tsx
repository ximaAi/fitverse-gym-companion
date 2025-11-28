import React from 'react';
import { useUser } from '../hooks/useUser';
import GlassCard from '../components/GlassCard';
import { User } from '../types';
import { Trophy, Shield } from 'lucide-react';
import { AVATARS, BADGE_DESCRIPTIONS } from '../constants';
import { getAvatarUrl, getTopBadges } from '../utils/gamification';

const LeaderboardRow: React.FC<{ user: User; rank: number; isCurrentUser: boolean }> = ({ user, rank, isCurrentUser }) => {
    const getRankColor = (r: number) => {
        if (r === 1) return 'border-yellow-400 text-yellow-400';
        if (r === 2) return 'border-slate-300 text-slate-300';
        if (r === 3) return 'border-amber-700 text-amber-700';
        return 'border-transparent text-silver-dark';
    };

    const avatarUrl = getAvatarUrl(user.avatar.avatarId, user.goal, user.progress);
    const isTopPerformer = rank === 1;
    const topBadges = getTopBadges(user);

    return (
        <GlassCard className={`flex items-center justify-between p-4 transition-all duration-300 ${isCurrentUser ? 'bg-neon-gold/10 border-neon-gold' : ''} ${isTopPerformer ? 'animate-glow' : ''}`}>
            <div className="flex items-center space-x-4">
                <span className={`text-2xl font-bold font-display w-8 ${getRankColor(rank)}`}>{rank}</span>
                <div className="relative">
                    <div className="w-12 h-12 rounded-full border-2 border-glass-border flex items-center justify-center bg-navy-light overflow-hidden">
                        <img src={avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    {/* Signature Badge */}
                    {user.signatureBadge && (
                        <div className="absolute -bottom-1 -right-1 bg-navy-dark rounded-full p-0.5 border border-neon-gold" title={user.signatureBadge}>
                            <span className="text-xs">{BADGE_DESCRIPTIONS[user.signatureBadge].icon}</span>
                        </div>
                    )}
                </div>
                <div>
                    <p className="font-bold text-lg text-silver-light flex items-center gap-2">
                        {user.name}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                        {topBadges.map(badge => (
                            <span key={badge} className="text-xs bg-navy-light/50 px-1.5 py-0.5 rounded border border-white/10" title={badge}>
                                {BADGE_DESCRIPTIONS[badge].icon}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-6 text-right">
                <div>
                    <p className="text-xl font-bold text-neon-gold">{user.stats.points.toLocaleString()}</p>
                    <p className="text-xs text-silver-dark">Points</p>
                </div>
                <Trophy className={`w-8 h-8 ${getRankColor(rank)}`} />
            </div>
        </GlassCard>
    );
};

const LeaderboardView: React.FC = () => {
    const { user, users } = useUser();
    const sortedUsers = [...users].sort((a, b) => b.stats.points - a.stats.points);

    return (
        <div className="space-y-6">
            <GlassCard>
                <div className="flex items-center space-x-4">
                    <Shield className="w-10 h-10 text-neon-gold" />
                    <div>
                        <h2 className="text-2xl font-bold text-silver-light">Gym Leaderboard</h2>
                        <p className="text-silver-dark">See how you stack up against other members. Keep pushing!</p>
                    </div>
                </div>
            </GlassCard>

            <div className="space-y-4">
                {sortedUsers.map((member, index) => (
                    <div style={{ animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`, opacity: 0 }} key={member.id}>
                        <LeaderboardRow
                            user={member}
                            rank={index + 1}
                            isCurrentUser={member.id === user.id}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeaderboardView;
