'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TEKNIKOVNINGAR, TeknikOvning } from '@/data/teknikovningar';

export interface ShopItem {
  id: string;
  name: string;
  type: 'ball' | 'title' | 'trail';
  price: number;
  icon: string;
  description: string;
  unlocked: boolean;
}

export interface PlayerStats {
  playerName: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  stars: number;
  completedDrills: Record<string, number>; // drillId -> starRating (1-3)
  equippedBall: string;
  equippedTitle: string;
  unlockedItems: string[];
  soundEnabled: boolean;
}

interface GameContextType {
  stats: PlayerStats;
  completeDrill: (drillId: string, starRating: number) => { xpGained: number; coinsGained: number; leveledUp: boolean };
  buyItem: (item: ShopItem) => boolean;
  equipItem: (itemId: string, type: 'ball' | 'title') => void;
  toggleSound: () => void;
  resetProgress: () => void;
  shopItems: ShopItem[];
}

const DEFAULT_SHOP_ITEMS: ShopItem[] = [
  { id: 'ball-standard', name: 'Klassisk Fotboll', type: 'ball', price: 0, icon: '⚽', description: 'Klassisk matchboll.', unlocked: true },
  { id: 'ball-fire', name: 'Eldbollen 🔥', type: 'ball', price: 100, icon: '🔥', description: 'Bollen brinner av superskott!', unlocked: false },
  { id: 'ball-gold', name: 'Guldmästaren 🏆', type: 'ball', price: 250, icon: '🌟', description: 'Gjuten i renaste guld.', unlocked: false },
  { id: 'ball-pixel', name: 'Roblox Block-Boll 🟩', type: 'ball', price: 350, icon: '🧱', description: 'Gjord av Roblox-klossar.', unlocked: false },
  { id: 'ball-diamond', name: 'Diamant-Bollen 💎', type: 'ball', price: 500, icon: '💎', description: 'Lyser upp hela planen!', unlocked: false },
  { id: 'title-rookie', name: 'Bollkontrollant 👟', type: 'title', price: 0, icon: '👟', description: 'Nybörjare i Lycksele FL.', unlocked: true },
  { id: 'title-master', name: 'Teknik-Mästare ⚡', type: 'title', price: 150, icon: '⚡', description: 'Snabba fötter på planen.', unlocked: false },
  { id: 'title-legend', name: 'Roblox Legend 👑', type: 'title', price: 400, icon: '👑', description: 'Känd över hela ligan.', unlocked: false },
];

const INITIAL_STATS: PlayerStats = {
  playerName: 'RobloxBaller99',
  level: 1,
  xp: 0,
  xpToNextLevel: 250,
  coins: 150,
  stars: 3,
  completedDrills: { 'brons-1': 3 },
  equippedBall: 'ball-standard',
  equippedTitle: 'title-rookie',
  unlockedItems: ['ball-standard', 'title-rookie'],
  soundEnabled: true,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [stats, setStats] = useState<PlayerStats>(INITIAL_STATS);
  const [shopItems, setShopItems] = useState<ShopItem[]>(DEFAULT_SHOP_ITEMS);

  // Load state from localStorage on initial render
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lycksele_ball_mastery_stats');
      if (saved) {
        const parsed = JSON.parse(saved);
        setStats(parsed);
        if (parsed.unlockedItems) {
          setShopItems(prev => prev.map(item => ({
            ...item,
            unlocked: parsed.unlockedItems.includes(item.id)
          })));
        }
      }
    } catch (e) {
      console.error('Could not load save data', e);
    }
  }, []);

  // Sync to localStorage
  const saveStats = (newStats: PlayerStats) => {
    setStats(newStats);
    try {
      localStorage.setItem('lycksele_ball_mastery_stats', JSON.stringify(newStats));
    } catch (e) {
      console.error('Could not save data', e);
    }
  };

  const completeDrill = (drillId: string, starRating: number) => {
    const drill = TEKNIKOVNINGAR.find(d => d.id === drillId);
    if (!drill) return { xpGained: 0, coinsGained: 0, leveledUp: false };

    const previousStars = stats.completedDrills[drillId] || 0;
    const newStarCount = Math.max(previousStars, starRating);
    const starBonus = (newStarCount - previousStars) * 20;

    const xpGained = drill.xpReward + starBonus;
    const coinsGained = drill.coinReward + Math.floor(starBonus / 2);

    let newXp = stats.xp + xpGained;
    let newLevel = stats.level;
    let newXpToNext = stats.xpToNextLevel;
    let leveledUp = false;

    while (newXp >= newXpToNext) {
      newXp -= newXpToNext;
      newLevel += 1;
      newXpToNext = Math.floor(newXpToNext * 1.35);
      leveledUp = true;
    }

    const updatedDrills = { ...stats.completedDrills, [drillId]: newStarCount };
    const totalStars = Object.values(updatedDrills).reduce((a, b) => a + b, 0);

    const updatedStats: PlayerStats = {
      ...stats,
      level: newLevel,
      xp: newXp,
      xpToNextLevel: newXpToNext,
      coins: stats.coins + coinsGained,
      stars: totalStars,
      completedDrills: updatedDrills,
    };

    saveStats(updatedStats);
    return { xpGained, coinsGained, leveledUp };
  };

  const buyItem = (item: ShopItem): boolean => {
    if (stats.coins < item.price || stats.unlockedItems.includes(item.id)) {
      return false;
    }

    const updatedUnlocked = [...stats.unlockedItems, item.id];
    const updatedStats: PlayerStats = {
      ...stats,
      coins: stats.coins - item.price,
      unlockedItems: updatedUnlocked,
    };

    setShopItems(prev => prev.map(i => i.id === item.id ? { ...i, unlocked: true } : i));
    saveStats(updatedStats);
    return true;
  };

  const equipItem = (itemId: string, type: 'ball' | 'title') => {
    if (!stats.unlockedItems.includes(itemId)) return;
    const updatedStats: PlayerStats = {
      ...stats,
      [type === 'ball' ? 'equippedBall' : 'equippedTitle']: itemId,
    };
    saveStats(updatedStats);
  };

  const toggleSound = () => {
    const updatedStats = { ...stats, soundEnabled: !stats.soundEnabled };
    saveStats(updatedStats);
  };

  const resetProgress = () => {
    setShopItems(DEFAULT_SHOP_ITEMS);
    saveStats(INITIAL_STATS);
  };

  return (
    <GameContext.Provider value={{
      stats,
      completeDrill,
      buyItem,
      equipItem,
      toggleSound,
      resetProgress,
      shopItems
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside GameProvider');
  return ctx;
};
