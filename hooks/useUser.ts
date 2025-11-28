
import { createContext, useContext } from 'react';
import { User } from '../types';

export interface UserContextType {
  user: User;
  users: User[];
  setActiveUser: (user: User) => void;
  updateUser: (user: User) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = UserContext.Provider;
