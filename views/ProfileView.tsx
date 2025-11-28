
import React, { useState } from 'react';
import { useUser } from '../hooks/useUser';
import GlassCard from '../components/GlassCard';
import { User } from '../types';
import { AVATARS, GOALS, GENDERS, TRAINER_PERSONAS, BADGE_DESCRIPTIONS } from '../constants';
import { Edit, LogOut, User as UserIcon, Trophy } from 'lucide-react';

const ProfileView: React.FC = () => {
  const { user, updateUser, logout } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: name === 'currentWeight' ? parseFloat(value) : value,
    }));
  };

  const handleAvatarChange = (field: string, value: any) => {
    setEditedUser(prev => ({
      ...prev,
      avatar: {
        ...prev.avatar,
        [field]: value,
      }
    }));
  };

  const handleSave = () => {
    updateUser(editedUser);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <GlassCard>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-silver-light">Your Profile & Avatar</h2>
            <p className="text-silver-dark">Manage your personal information and avatar customization.</p>
          </div>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="flex items-center space-x-2 bg-neon-gold text-navy-dark font-bold py-2 px-4 rounded-lg transition-transform duration-200 hover:scale-105"
          >
            <Edit size={16} />
            <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
          </button>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <h3 className="text-xl font-bold text-silver-light border-b border-glass-border pb-3 mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-silver-dark text-sm">Full Name</span>
                <input type="text" name="name" value={editedUser.name} onChange={handleInputChange} disabled={!isEditing} className="mt-1 block w-full bg-navy-light rounded-md border border-glass-border p-2 disabled:opacity-70" />
              </label>
              <label className="block">
                <span className="text-silver-dark text-sm">Email Address</span>
                <input type="email" name="email" value={editedUser.email} onChange={handleInputChange} disabled={!isEditing} className="mt-1 block w-full bg-navy-light rounded-md border border-glass-border p-2 disabled:opacity-70" />
              </label>
              <label className="block">
                <span className="text-silver-dark text-sm">Current Goal</span>
                <select name="goal" value={editedUser.goal} onChange={handleInputChange} disabled={!isEditing} className="mt-1 block w-full bg-navy-light rounded-md border border-glass-border p-2 disabled:opacity-70">
                  {GOALS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-silver-dark text-sm">Gender</span>
                <select name="gender" value={editedUser.gender} onChange={handleInputChange} disabled={!isEditing} className="mt-1 block w-full bg-navy-light rounded-md border border-glass-border p-2 disabled:opacity-70">
                  {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-silver-dark text-sm">Current Weight (kg)</span>
                <input type="number" name="currentWeight" value={editedUser.currentWeight} onChange={handleInputChange} disabled={!isEditing} className="mt-1 block w-full bg-navy-light rounded-md border border-glass-border p-2 disabled:opacity-70" />
              </label>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-1">
          <h3 className="text-xl font-bold text-silver-light border-b border-glass-border pb-3 mb-4">Avatar Customization</h3>
          <div className="space-y-4">
            <div>
              <span className="text-silver-dark text-sm">Choose Your Avatar</span>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {Object.entries(AVATARS).map(([id, avatar]) => (
                  <button
                    key={id}
                    onClick={() => isEditing && handleAvatarChange('avatarId', id)}
                    disabled={!isEditing}
                    className={`rounded-lg overflow-hidden border-2 transition-all ${editedUser.avatar.avatarId === id ? 'border-neon-gold scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={avatar.progressImages['Build Muscle'][0]} alt={avatar.name} className="w-full h-full object-cover bg-navy-light" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-glass-border pt-6">
            <h3 className="text-xl font-bold text-silver-light mb-4">Your Trainer</h3>
            <div className="space-y-3">
              {TRAINER_PERSONAS.map((trainer) => (
                <button
                  key={trainer.id}
                  onClick={() => isEditing && handleInputChange({ target: { name: 'selectedTrainer', value: trainer.id } } as any)}
                  disabled={!isEditing}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${editedUser.selectedTrainer === trainer.id ? 'bg-navy-light border-neon-gold' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${editedUser.selectedTrainer === trainer.id ? 'bg-neon-gold text-navy-dark' : 'bg-navy-dark text-silver-dark'}`}>
                      <UserIcon size={16} />
                    </div>
                    <div>
                      <div className="font-bold text-silver-light">{trainer.name}</div>
                      <div className="text-xs text-silver-dark">{trainer.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
      <div className="md:hidden pt-4">
        <button
          onClick={logout}
          className={`flex items-center justify-center space-x-3 p-3 rounded-lg w-full text-left transition-all duration-200 text-silver-dark bg-red-500/10 hover:bg-red-500/20 hover:text-red-400`}
        >
          <LogOut className="w-6 h-6" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
