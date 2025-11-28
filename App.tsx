
import React, { useState, useMemo } from 'react';
import { User, View, Role, Theme, AppState, Goal } from './types';
import { MOCK_USERS, AVATARS } from './constants';
import Layout from './components/Layout';
import DashboardView from './views/DashboardView';
import WorkoutView from './views/WorkoutView';
import LeaderboardView from './views/LeaderboardView';
import AchievementsView from './views/AchievementsView';
import ProfileView from './views/ProfileView';
import TrainerView from './views/TrainerView';
import AuthView from './views/AuthView';
import { UserProvider } from './hooks/useUser';
import { ThemeProvider } from './hooks/useTheme';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    activeUser: MOCK_USERS[0],
    users: MOCK_USERS,
    activeView: View.Dashboard,
    role: Role.Member,
    theme: Theme.Dark,
    isAuthenticated: false,
  });

  const handleLogin = (choices: { avatarId: string; goal: Goal; trainerId: string }) => {
    setAppState(prev => {
      const configuredUser = {
        ...MOCK_USERS[0], // Start with the base mock user
        goal: choices.goal,
        avatar: { avatarId: choices.avatarId },
        progress: 0, // Start fresh
        stats: { ...MOCK_USERS[0].stats, workoutsCompleted: 0, points: 0, streak: 0 },
        achievements: [],
        selectedTrainer: choices.trainerId,
        weeklyGoal: 3, // Default goal
        workoutDates: [],
        signatureBadge: null,
      };

      const avatarIds = Object.keys(AVATARS);
      const otherUsers = prev.users.slice(1).map(u => ({
        ...u,
        avatar: {
          avatarId: avatarIds[Math.floor(Math.random() * avatarIds.length)]
        }
      }));

      return {
        ...prev,
        isAuthenticated: true,
        activeView: View.Dashboard,
        activeUser: configuredUser,
        users: [configuredUser, ...otherUsers],
      };
    });
  };

  const handleLogout = () => {
    setAppState(prev => ({
      ...prev,
      isAuthenticated: false,
      activeUser: MOCK_USERS[0], // Reset to default user
      role: Role.Member,
    }));
  };

  const setActiveUser = (user: User) => {
    setAppState(prev => ({ ...prev, activeUser: user }));
  };

  const updateUser = (updatedUser: User) => {
    setAppState(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === updatedUser.id ? updatedUser : u),
      activeUser: prev.activeUser.id === updatedUser.id ? updatedUser : prev.activeUser,
    }));
  };

  const setActiveView = (view: View) => {
    setAppState(prev => ({ ...prev, activeView: view }));
  };

  const setRole = (role: Role) => {
    setAppState(prev => ({ ...prev, role: role, activeView: role === Role.Trainer ? View.TrainerDashboard : View.Dashboard }));
  };

  const toggleTheme = () => {
    setAppState(prev => ({ ...prev, theme: prev.theme === Theme.Dark ? Theme.Light : Theme.Dark }));
  };

  const userContextValue = useMemo(() => ({
    user: appState.activeUser,
    users: appState.users,
    setActiveUser,
    updateUser,
    logout: handleLogout,
  }), [appState.activeUser, appState.users]);

  const themeContextValue = useMemo(() => ({
    theme: appState.theme,
    toggleTheme
  }), [appState.theme]);

  const renderView = () => {
    if (appState.role === Role.Trainer) {
      return <TrainerView />;
    }
    switch (appState.activeView) {
      case View.Dashboard:
        return <DashboardView />;
      case View.Workout:
        return <WorkoutView />;
      case View.Leaderboard:
        return <LeaderboardView />;
      case View.Achievements:
        return <AchievementsView />;
      case View.Profile:
        return <ProfileView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <ThemeProvider value={themeContextValue}>
      <UserProvider value={userContextValue}>
        <div className={`${appState.theme === 'dark' ? 'dark' : ''}`}>
          <div className="bg-navy-dark dark:bg-navy-dark text-silver-light min-h-screen font-sans transition-colors duration-500 overflow-x-hidden">
            {appState.isAuthenticated ? (
              <Layout
                activeView={appState.activeView}
                setActiveView={setActiveView}
                role={appState.role}
                setRole={setRole}
                onLogout={handleLogout}
              >
                {renderView()}
              </Layout>
            ) : (
              <AuthView onLogin={handleLogin} />
            )}
          </div>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
