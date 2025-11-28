import React from 'react';
import Sidebar from './Sidebar';
import MobileNavbar from './MobileNavbar';
import { View, Role } from '../types';
import { useUser } from '../hooks/useUser';
import { User as UserIcon } from 'lucide-react';
import { AVATARS } from '../constants';
import { getAvatarUrl } from '../utils/gamification';


interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  setActiveView: (view: View) => void;
  role: Role;
  setRole: (role: Role) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView, role, setRole, onLogout }) => {
  const { user } = useUser();
  const avatarUrl = getAvatarUrl(user.avatar.avatarId, user.goal, user.progress);

  return (
    <div className="flex h-screen bg-navy-light dark:bg-navy-dark overflow-hidden">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        role={role}
        setRole={setRole}
        onLogout={onLogout}
      />
      <main className="flex-1 flex flex-col overflow-y-auto pb-20 md:pb-0">
        <header className="p-4 bg-navy-dark/50 dark:bg-navy-light/10 backdrop-blur-sm border-b border-glass-border sticky top-0 z-20 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-display font-bold text-silver-light">
            {role === Role.Trainer ? "Trainer Dashboard" : activeView}
          </h1>
          {role === Role.Member && (
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="hidden sm:inline text-silver-dark">{user.name}</span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-neon-gold flex items-center justify-center bg-navy-light overflow-hidden">
                <img src={avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </header>
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
      <MobileNavbar
        activeView={activeView}
        setActiveView={setActiveView}
        role={role}
      />
    </div>
  );
};

export default Layout;
