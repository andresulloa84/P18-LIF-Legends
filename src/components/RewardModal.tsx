'use client';

import React from 'react';

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  starsAwarded: number;
  xpGained: number;
  coinsGained: number;
  leveledUp: boolean;
  drillTitle: string;
}

export default function RewardModal({
  isOpen,
  onClose,
  starsAwarded,
  xpGained,
  coinsGained,
  leveledUp,
  drillTitle,
}: RewardModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-robloxDark border-4 border-robloxGold rounded-3xl p-6 md:p-8 max-w-md w-full text-center shadow-gold-glow relative transform transition-transform scale-100">
        
        {/* Celebration Header */}
        <div className="text-5xl md:text-6xl mb-2 animate-bounce">
          {leveledUp ? '🏆' : '⭐'}
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-robloxGold via-yellow-200 to-amber-400 tracking-wider">
          {leveledUp ? 'LEVEL UP!' : 'ÖVNING FULLBORDAD!'}
        </h2>
        
        <p className="text-sm font-bold text-slate-300 mt-1 mb-4">
          {drillTitle}
        </p>

        {/* Stars Earned */}
        <div className="flex justify-center space-x-2 my-4 bg-black/40 p-4 rounded-2xl border-2 border-robloxBorder">
          {[1, 2, 3].map((star) => (
            <span
              key={star}
              className={`text-4xl md:text-5xl transition-transform ${
                star <= starsAwarded
                  ? 'text-robloxGold animate-pulse drop-shadow-[0_0_10px_rgba(255,199,0,0.9)] scale-125'
                  : 'text-slate-700 opacity-40'
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Reward Summary Stats */}
        <div className="grid grid-cols-2 gap-3 my-4">
          <div className="bg-robloxCard border-2 border-black rounded-2xl p-3 shadow-roblox-btn-sm">
            <span className="text-xs text-slate-400 font-bold block">XP INTIJÄNAD</span>
            <span className="text-xl md:text-2xl font-black text-robloxCyan">+{xpGained} XP</span>
          </div>

          <div className="bg-robloxCard border-2 border-black rounded-2xl p-3 shadow-roblox-btn-sm">
            <span className="text-xs text-slate-400 font-bold block">MYNT VUNNA</span>
            <span className="text-xl md:text-2xl font-black text-emerald-400">+{coinsGained} 💰</span>
          </div>
        </div>

        {/* Claim Button */}
        <button
          onClick={onClose}
          className="w-full roblox-btn-gold py-3 text-lg font-black tracking-wider uppercase mt-2 shadow-roblox-glow"
        >
          SAMLA BELÖNING! 🎉
        </button>
      </div>
    </div>
  );
}
