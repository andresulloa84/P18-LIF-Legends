'use client';

import React, { createContext, useContext, ReactNode, useState } from 'react';

interface AuthContextProps {
  user: any;
  role: 'coach' | 'player' | null;
  playerData: any;
  loginCoach: (email: string, password: string) => Promise<void>;
  loginPlayer: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    return {
      user: null,
      role: null,
      playerData: null,
      loginCoach: async () => {},
      loginPlayer: async () => {},
      logout: async () => {},
    };
  }
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<'coach' | 'player' | null>(null);
  const [playerData, setPlayerData] = useState<any>(null);

  const loginCoach = async (email: string, password: string) => {
    setUser({ email });
    setRole('coach');
  };

  const loginPlayer = async (username: string, password: string) => {
    setPlayerData({ username });
    setRole('player');
  };

  const logout = async () => {
    setUser(null);
    setRole(null);
    setPlayerData(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, playerData, loginCoach, loginPlayer, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
