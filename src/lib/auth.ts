import { createContext, useContext, ReactNode } from 'react';

// Simple auth stub for compilation
interface AuthContextProps {
  user: any;
  role: string | null;
  playerData: any;
  loginCoach: (email: string, password: string) => Promise<void>;
  loginPlayer: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // No-op implementations
  const loginCoach = async () => {};
  const loginPlayer = async () => {};
  const logout = async () => {};
  const value: AuthContextProps = {
    user: null,
    role: null,
    playerData: null,
    loginCoach,
    loginPlayer,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import { auth, db } from '@/firebase/client';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, doc, getDoc, setDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';

type UserRole = 'coach' | 'player' | null;

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
        // Coach is signed in; ensure email verified and approved
        if (!firebaseUser.emailVerified) {
          await signOut(auth);
          alert('Please verify your email before accessing the coach dashboard.');
          setRole(null);
          return;
        }
        // Check approval in Firestore
        const pendingRef = doc(db, 'coachPending', firebaseUser.uid);
        const snap = await getDoc(pendingRef);
        if (snap.exists() && snap.data().approved) {
          setRole('coach');
        } else {
          await signOut(auth);
          alert('Your coach account is pending approval by the app owner.');
          setRole(null);
        }
      } else {
        setRole(null);
      }
    });
    return () => unsub();
  }, []);

  const loginCoach = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    // onAuthStateChanged will handle role logic
  };

  const loginPlayer = async (username: string, password: string) => {
    // case‑insensitive match
    const q = query(collection(db, 'players'), where('username', '==', username.toLowerCase()));
    const snap = await getDocs(q);
    if (snap.empty) throw new Error('Spelare hittades inte');
    const docSnap = snap.docs[0];
    const data = docSnap.data() as Player;
    if (data.passwordHash && password.toLowerCase() === data.username.toLowerCase()) {
      // simple default password check (username case‑insensitive)
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
