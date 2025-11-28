




import React from 'react';
import { View, Role } from '../types';
import { BarChart2, Dumbbell, Shield, Trophy, User as UserIcon } from 'lucide-react';

interface MobileNavbarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  role: Role;
}

// FIX: Extracted props to an interface to resolve a complex type inference issue.
interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

// FIX: Explicitly typing NavItem as a React.FC resolves a complex type inference issue.
const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center flex-1 transition-colors duration-200 py-1 ${
      isActive ? 'text-neon-gold' : 'text-silver-dark hover:text-silver-light'
    }`}
  >
    <Icon className="w-6 h-6 mb-1" />
    <span className="text-xs font-medium">{label}</span>
  </button>
);

const MobileNavbar: React.FC<MobileNavbarProps> = ({ activeView, setActiveView, role }) => {
  if (role === Role.Trainer) return null;

  const navItems = [
    { id: View.Dashboard, icon: BarChart2, label: 'Dashboard' },
    { id: View.Workout, icon: Dumbbell, label: 'Workout' },
    { id: View.Leaderboard, icon: Shield, label: 'Ranks' },
    { id: View.Achievements, icon: Trophy, label: 'Badges' },
    { id: View.Profile, icon: UserIcon, label: 'Profile' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-navy-dark/80 backdrop-blur-lg border-t border-glass-border p-1 flex justify-around z-50">
      {navItems.map(item => (
        <NavItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          isActive={activeView === item.id}
          onClick={() => setActiveView(item.id)}
        />
      ))}
    </nav>
  );
};

export default MobileNavbar;