


import React from 'react';
import { View, Role } from '../types';
import { BarChart2, Dumbbell, Shield, Trophy, User, Briefcase, LogOut } from 'lucide-react';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  role: Role;
  setRole: (role: Role) => void;
  onLogout: () => void;
}

// FIX: Explicitly typing NavItem as a React.FC and defining its props in an interface resolves a complex type inference issue.
interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 p-3 rounded-lg w-full text-left transition-all duration-200 ${
      isActive ? 'bg-neon-gold text-navy-dark shadow-lg shadow-neon-gold/30' : 'text-silver-dark hover:bg-navy-light hover:text-silver-light'
    }`}
  >
    <Icon className="w-6 h-6" />
    <span className="font-semibold">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, role, setRole, onLogout }) => {
  // FIX: Using string literals for labels to match NavItem prop type and ensure consistency.
  const memberViews = [
    { id: View.Dashboard, icon: BarChart2, label: 'Dashboard' },
    { id: View.Workout, icon: Dumbbell, label: 'Workout' },
    { id: View.Leaderboard, icon: Shield, label: 'Leaderboard' },
    { id: View.Achievements, icon: Trophy, label: 'Achievements' },
    { id: View.Profile, icon: User, label: 'Profile' },
  ];

  return (
    <aside className="hidden md:flex w-64 bg-navy-dark dark:bg-navy-light/5 p-4 flex-col justify-between border-r border-glass-border">
      <div>
        <div className="flex items-center space-x-2 p-3 mb-8">
          <Dumbbell className="w-10 h-10 text-neon-gold" />
          <h1 className="text-2xl font-display font-bold text-silver-light">FitVerse</h1>
        </div>
        <nav className="space-y-2">
          {role === Role.Member ? (
             memberViews.map(view => (
                <NavItem 
                  key={view.id}
                  icon={view.icon} 
                  label={view.label}
                  isActive={activeView === view.id}
                  onClick={() => setActiveView(view.id)}
                />
              ))
          ) : (
            <NavItem 
              icon={Briefcase} 
              label={'Trainer Dashboard'}
              isActive={true}
              onClick={() => {}}
            />
          )}
        </nav>
      </div>
      <div className="space-y-2">
         <div className="flex items-center justify-center p-2 rounded-lg bg-navy-light">
            <button 
                onClick={() => setRole(Role.Member)}
                className={`px-4 py-2 text-sm font-bold rounded-md transition-colors ${role === Role.Member ? 'bg-neon-gold text-navy-dark' : 'text-silver-dark'}`}
            >
                Member
            </button>
            <button 
                onClick={() => setRole(Role.Trainer)}
                className={`px-4 py-2 text-sm font-bold rounded-md transition-colors ${role === Role.Trainer ? 'bg-neon-gold text-navy-dark' : 'text-silver-dark'}`}
            >
                Trainer
            </button>
        </div>
         <button
            onClick={onLogout}
            className={`flex items-center space-x-3 p-3 rounded-lg w-full text-left transition-all duration-200 text-silver-dark hover:bg-red-500/20 hover:text-red-400`}
        >
            <LogOut className="w-6 h-6" />
            <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;