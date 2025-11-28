import React from 'react';
import { useUser } from '../hooks/useUser';
import { User } from '../types';
import GlassCard from '../components/GlassCard';
import { TrendingUp, Activity, Zap } from 'lucide-react';
import { AVATARS } from '../constants';

const MemberCard: React.FC<{ member: User }> = ({ member }) => {
    const avatarUrl = AVATARS[member.avatar.avatarId]?.progressImages[member.goal]?.[0] || '';

    return (
        <GlassCard className="flex flex-col">
            <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full border-2 border-neon-gold flex items-center justify-center bg-navy-light overflow-hidden">
                   <img src={avatarUrl} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-silver-light">{member.name}</h3>
                    <p className="text-sm text-silver-dark">Goal: {member.goal}</p>
                </div>
            </div>
            
            <div>
                <p className="text-sm text-silver-dark mb-1">Goal Progress</p>
                <div className="w-full bg-navy-light rounded-full h-2.5">
                    <div className="bg-neon-gold h-2.5 rounded-full" style={{ width: `${member.progress}%` }}></div>
                </div>
                 <p className="text-right text-sm font-bold mt-1 text-neon-gold">{member.progress}%</p>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-navy-light rounded-lg">
                    <TrendingUp className="mx-auto text-silver-dark mb-1" size={20}/>
                    <p className="font-bold text-silver-light">{member.stats.points}</p>
                    <p className="text-xs text-silver-dark">Points</p>
                </div>
                <div className="p-2 bg-navy-light rounded-lg">
                    <Activity className="mx-auto text-silver-dark mb-1" size={20}/>
                    <p className="font-bold text-silver-light">{member.stats.workoutsCompleted}</p>
                    <p className="text-xs text-silver-dark">Workouts</p>
                </div>
                <div className="p-2 bg-navy-light rounded-lg">
                    <Zap className="mx-auto text-silver-dark mb-1" size={20}/>
                    <p className="font-bold text-silver-light">{member.stats.streak}</p>
                    <p className="text-xs text-silver-dark">Streak</p>
                </div>
            </div>
        </GlassCard>
    );
};


const TrainerView: React.FC = () => {
    const { users } = useUser();

    return (
        <div className="space-y-6">
            <GlassCard>
                <h2 className="text-2xl font-bold text-silver-light">Member Overview</h2>
                <p className="text-silver-dark">Track progress and engagement for all gym members at a glance.</p>
            </GlassCard>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((member, index) => (
                    <div key={member.id} style={{ animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`, opacity: 0 }}>
                        <MemberCard member={member} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainerView;
