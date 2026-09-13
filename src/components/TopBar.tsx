'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import Link from 'next/link';

export default function TopBar() {
  const { stats, toggleSound } = useGame();

  const xpPercent = Math.min(100, Math.round((stats.xp / stats.xpToNextLevel) * 100));

  return (
    <header className="bg-robloxDark border-b-4 border-robloxBorder p-3 md:p-4 flex items-center justify-between shadow-lg relative z-30">
      {/* Left: Roblox Game Branding & Player Avatar Frame */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          {/* Avatar Icon */}
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-robloxBlue border-4 border-black flex items-center justify-center text-2xl md:text-3xl shadow-roblox-btn-sm transform hover:scale-105 transition-all">
            🎮
          </div>
          {/* Level Badge Pill */}
          <div className="absolute -bottom-2 -right-1 bg-robloxGold text-black font-extrabold text-xs px-2 py-0.5 rounded-full border-2 border-black shadow">
            LVL {stats.level}
          </div>
        </div>

        <div className="hidden sm:flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-lg text-white tracking-wide">{stats.playerName}</span>
            <span className="text-xs bg-robloxCard text-robloxCyan px-2 py-0.5 rounded-md border border-robloxBorder font-semibold">
              LYCKSELE FL
            </span>
          </div>

          {/* XP Progress Bar */}
          <div className="w-36 md:w-48 bg-black/60 rounded-full h-3.5 border-2 border-black overflow-hidden relative mt-1">
            <div
              className="bg-gradient-to-r from-emerald-400 to-neonLime h-full transition-all duration-500"
              style={{ width: `${xpPercent}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-extrabold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
              {stats.xp} / {stats.xpToNextLevel} XP
            </span>
          </div>
        </div>
      </div>

      {/* Middle: Game Title Logo */}
      <Link href="/" className="hidden lg:flex items-center space-x-2 group">
        <span className="text-3xl animate-bounceSubtle">⚽</span>
        <div className="flex flex-col">
          <h1 className="text-xl md:text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-robloxCyan via-white to-neonLime drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            BOLLMÄSTARNA
          </h1>
          <span className="text-[10px] font-bold text-robloxBlue tracking-widest uppercase">
            TEKNIKÖVNINGAR • ROBOKIDS
          </span>
        </div>
      </Link>

      {/* Right: Currency Counter & Action Widgets */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Star Counter */}
        <div className="flex items-center bg-robloxCard border-3 border-black rounded-xl px-3 py-1.5 shadow-roblox-btn-sm">
          <span className="text-xl mr-1.5 animate-pulse">⭐</span>
          <span className="font-black text-robloxGold text-base md:text-lg">{stats.stars}</span>
        </div>

        {/* Coins Counter */}
        <div className="flex items-center bg-robloxCard border-3 border-black rounded-xl px-3 py-1.5 shadow-roblox-btn-sm">
          <span className="text-xl mr-1.5">💰</span>
          <span className="font-black text-emerald-400 text-base md:text-lg">{stats.coins}</span>
        </div>

        {/* Sound Toggle Button */}
        <button
          onClick={toggleSound}
          title={stats.soundEnabled ? 'Ljud På' : 'Ljud Av'}
          className={`w-10 h-10 rounded-xl border-3 border-black flex items-center justify-center text-lg shadow-roblox-btn-sm active:translate-y-0.5 ${
            stats.soundEnabled ? 'bg-emerald-500 text-white' : 'bg-rose-500/80 text-white/70'
          }`}
        >
          {stats.soundEnabled ? '🔊' : '🔇'}
        </button>
      </div>
    </header>
  );
}
