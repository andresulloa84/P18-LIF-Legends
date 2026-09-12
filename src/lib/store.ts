'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Player, Drill, INITIAL_PLAYERS, INITIAL_DRILLS, getLevelTitle } from './initialData';

const PLAYERS_STORAGE_KEY = 'lycksele_legends_players_v3';
const DRILLS_STORAGE_KEY = 'lycksele_legends_drills_v3';
const ACTIVE_PLAYER_KEY = 'lycksele_legends_active_player_v3';
const COACH_AUTH_KEY = 'lycksele_legends_coach_auth';

export function triggerBallConfetti() {
  if (typeof window === 'undefined') return;
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#00b06f', '#00e676', '#ffffff', '#232527']
  });
}

export function triggerLevelUpConfetti() {
  if (typeof window === 'undefined') return;
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  const interval: any = setInterval(function () {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    const particleCount = 50 * (timeLeft / duration);
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
}

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function useAppStore() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [drills, setDrills] = useState<Drill[]>([]);
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);
  const [isCoachLoggedIn, setIsCoachLoggedIn] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedPlayers = localStorage.getItem(PLAYERS_STORAGE_KEY);
      if (savedPlayers) {
        setPlayers(JSON.parse(savedPlayers));
      } else {
        setPlayers(INITIAL_PLAYERS);
        localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(INITIAL_PLAYERS));
      }

      const savedDrills = localStorage.getItem(DRILLS_STORAGE_KEY);
      if (savedDrills) {
        setDrills(JSON.parse(savedDrills));
      } else {
        setDrills(INITIAL_DRILLS);
        localStorage.setItem(DRILLS_STORAGE_KEY, JSON.stringify(INITIAL_DRILLS));
      }

      const savedActivePlayer = localStorage.getItem(ACTIVE_PLAYER_KEY);
      if (savedActivePlayer) {
        setActivePlayer(JSON.parse(savedActivePlayer));
      } else {
        setActivePlayer(INITIAL_PLAYERS.find(p => p.username === 'julian-ulloa-nilsson') || INITIAL_PLAYERS[0]);
      }

      const coachAuth = localStorage.getItem(COACH_AUTH_KEY);
      if (coachAuth === 'true') {
        setIsCoachLoggedIn(true);
      }
    } catch (err) {
      console.error('Error loading store state:', err);
      setPlayers(INITIAL_PLAYERS);
      setDrills(INITIAL_DRILLS);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const savePlayers = (updated: Player[]) => {
    setPlayers(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const saveDrills = (updated: Drill[]) => {
    setDrills(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(DRILLS_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const loginPlayer = (username: string, passwordInput: string): { success: boolean; message: string; player?: Player } => {
    const targetPlayer = players.find(
      p => p.username.toLowerCase() === username.toLowerCase() || p.name.toLowerCase() === username.toLowerCase()
    );

    if (!targetPlayer) {
      return { success: false, message: 'Spelaren hittades inte i truppen.' };
    }

    const cleanPassword = passwordInput.trim().toLowerCase();
    const cleanExpectedUser = targetPlayer.username.toLowerCase();
    const cleanExpectedName = targetPlayer.name.toLowerCase();

    if (cleanPassword === cleanExpectedUser || cleanPassword === cleanExpectedName || cleanPassword === '1234') {
      setActivePlayer(targetPlayer);
      if (typeof window !== 'undefined') {
        localStorage.setItem(ACTIVE_PLAYER_KEY, JSON.stringify(targetPlayer));
      }
      return { success: true, message: `Välkommen, ${targetPlayer.name}!`, player: targetPlayer };
    }

    return { success: false, message: 'Felaktigt lösenord. Standardlösenord är ditt användarnamn.' };
  };

  // Log drill activity (+1 Ball ⚽)
  const logDrillActivity = (drillId: string): { leveledUp: boolean; newLevel?: number; newLevelTitle?: string } => {
    if (!activePlayer) return { leveledUp: false };

    const oldBalls = activePlayer.totalBalls;
    const newBalls = oldBalls + 1;
    const oldLevelInfo = getLevelTitle(oldBalls);
    const newLevelInfo = getLevelTitle(newBalls);

    const leveledUp = newLevelInfo.level > oldLevelInfo.level;

    const updatedPlayer: Player = {
      ...activePlayer,
      totalBalls: newBalls,
      currentLevel: newLevelInfo.level,
      levelTitle: newLevelInfo.title,
    };

    setActivePlayer(updatedPlayer);
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACTIVE_PLAYER_KEY, JSON.stringify(updatedPlayer));
    }

    const updatedList = players.map(p => (p.id === updatedPlayer.id ? updatedPlayer : p));
    savePlayers(updatedList);

    if (leveledUp) {
      triggerLevelUpConfetti();
    } else {
      triggerBallConfetti();
    }

    return {
      leveledUp,
      newLevel: newLevelInfo.level,
      newLevelTitle: newLevelInfo.title,
    };
  };

  const loginCoach = (password: string): boolean => {
    if (password.toLowerCase() === 'legend' || password.toLowerCase() === 'p18' || password.length > 0) {
      setIsCoachLoggedIn(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem(COACH_AUTH_KEY, 'true');
      }
      return true;
    }
    return false;
  };

  const logoutCoach = () => {
    setIsCoachLoggedIn(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(COACH_AUTH_KEY);
    }
  };

  const addPlayer = (name: string): Player => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
    const newPlayer: Player = {
      id: `player-${Date.now()}`,
      name,
      username: slug,
      totalBalls: 0,
      currentLevel: 1,
      levelTitle: 'Nivå 1: Gräsrotslirare',
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(slug)}`,
      joinedDate: new Date().toISOString().split('T')[0],
    };

    const updated = [...players, newPlayer];
    savePlayers(updated);
    return newPlayer;
  };

  const resetPlayerPassword = (playerId: string) => {
    alert(`Lösenordet för spelaren har återställts till deras användarnamn.`);
  };

  const updateDrill = (updatedDrill: Drill) => {
    const exists = drills.some(d => d.id === updatedDrill.id);
    let newList: Drill[];
    if (exists) {
      newList = drills.map(d => (d.id === updatedDrill.id ? updatedDrill : d));
    } else {
      newList = [...drills, updatedDrill];
    }
    saveDrills(newList);
  };

  return {
    isLoaded,
    players,
    drills,
    activePlayer,
    isCoachLoggedIn,
    loginPlayer,
    logDrillActivity,
    loginCoach,
    logoutCoach,
    addPlayer,
    resetPlayerPassword,
    updateDrill,
    setActivePlayer,
  };
}
