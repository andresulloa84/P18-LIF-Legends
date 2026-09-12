'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { auth, db } from '@/firebase/client';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, doc, getDoc, setDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';

export type UserRole = 'coach' | 'player' | null;

export interface Player {
  id: string;
  name: string;
  username: string;
  passwordHash?: string;
  teamId?: string;
  stars?: number;
  unlockedSkills?: string[];
  [key: string]: any;
}

interface AuthContextProps {
  user: FirebaseUser | null;
  role: UserRole;
  playerData: Player | null;
  loginCoach: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginPlayer: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [playerData, setPlayerData] = useState<Player | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        if (!firebaseUser.emailVerified) {
          await signOut(auth);
          setRole(null);
          return;
        }
        const pendingRef = doc(db, 'coachPending', firebaseUser.uid);
        const snap = await getDoc(pendingRef);
        if (snap.exists() && snap.data().approved) {
          setRole('coach');
        } else {
          await signOut(auth);
          setRole(null);
        }
      } else {
        setRole(null);
      }
    });
    return () => unsub();
  }, []);

  const loginCoach = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginPlayer = async (username: string, password: string) => {
    const q = query(collection(db, 'players'), where('username', '==', username.toLowerCase()));
    const snap = await getDocs(q);
    if (snap.empty) throw new Error('Spelare hittades inte');
    const docSnap = snap.docs[0];
    const data = docSnap.data() as Player;
    if (data.passwordHash && password.toLowerCase() === data.username.toLowerCase()) {
      setPlayerData(data);
      setRole('player');
    } else {
      throw new Error('Fel lösenord');
    }
  };

  const logout = async () => {
    await signOut(auth);
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
