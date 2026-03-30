import React, { createContext, useContext, useState, ReactNode } from 'react';

export type RoleType = 'farmer' | 'student' | 'aggregator' | 'admin' | null;

interface UserProfile {
  id: string;
  name: string;
  role: RoleType;
  village?: string;     // For farmers
  hostelBlock?: string; // For students
}

interface AuthContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  // Mock login function for prototype
  loginAs: (role: RoleType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  const loginAs = (role: RoleType) => {
    if (role === 'farmer') {
      setUser({ id: 'f_123', name: 'Ramesh Singh', role: 'farmer', village: 'Kothri Village, Sehore' });
    } else if (role === 'student') {
      setUser({ id: 's_456', name: 'Aryan Sharma', role: 'student', hostelBlock: 'Block 2' });
    } else if (role === 'admin') {
      setUser({ id: 'a_789', name: 'Council Admin', role: 'admin' });
    } else {
      setUser(null);
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
