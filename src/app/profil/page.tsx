'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { TEKNIKOVNINGAR } from '@/data/teknikovningar';

export default function ProfilPage() {
  const { stats, resetProgress, shopItems } = useGame();

  const equippedBallItem = shopItems.find((i) => i.id === stats.equippedBall);
  const equippedTitleItem = shopItems.find((i) => i.id === stats.equippedTitle);

  const completedCount = Object.keys(stats.completedDrills).length;

  const badges = [
    { title: 'Första Steget 👟', desc: 'Genomför din första teknikövning', unlocked: completedCount >= 1 },
    { title: 'Brons-Mästare 🥉', desc: 'Klara alla Brons-övningar', unlocked: completedCount >= 3 },
    { title: 'Silver-Stjärna 🥈', desc: 'Samla minst 10 stjärnor', unlocked: stats.stars >= 10 },
    { title: 'Guld-Foten 🥇', desc: 'Samla minst 20 stjärnor', unlocked: stats.stars >= 20 },
    { title: 'BollsAMLARIN ⚽', desc: 'Lås upp 2 unika fotbollar i shoppen', unlocked: stats.unlockedItems.length >= 3 },
    { title: 'Roblox Mästare 👑', desc: 'Nå Level 5 i spelet', unlocked: stats.level >= 5 },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Profile Card */}
      <div className="bg-gradient-to-r from-robloxDark via-robloxCard to-robloxNavy border-4 border-robloxBorder rounded-3xl p-6 md:p-8 shadow-roblox-card relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 relative z-10">
          {/* Avatar Icon */}
          <div className="relative">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-tr from-blue-600 to-robloxBlue border-4 border-black flex items-center justify-center text-5xl md:text-6xl shadow-roblox-btn">
              🎮
            </div>
            <div className="absolute -bottom-2 -right-2 bg-robloxGold text-black font-black text-xs md:text-sm px-3 py-1 rounded-full border-2 border-black shadow">
              LVL {stats.level}
            </div>
          </div>

          {/* Player Info */}
          <div className="text-center md:text-left flex-1">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
              <h1 className="text-2xl md:text-4xl font-black text-white">{stats.playerName}</h1>
              <span className="bg-robloxNavy border-2 border-robloxCyan text-robloxCyan px-3 py-0.5 rounded-full text-xs font-black">
                {equippedTitleItem?.name || 'Bollkontrollant 👟'}
              </span>
            </div>

            <p className="text-xs md:text-sm text-slate-300 font-bold mt-1">
              VALD BOLL: {equippedBallItem ? `${equippedBallItem.icon} ${equippedBallItem.name}` : '⚽ Klassisk Fotboll'}
            </p>

            {/* XP Progress Bar */}
            <div className="w-full max-w-md bg-black/60 rounded-full h-4 border-2 border-black overflow-hidden relative mt-3 mx-auto md:mx-0">
              <div
                className="bg-gradient-to-r from-emerald-400 to-neonLime h-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((stats.xp / stats.xpToNextLevel) * 100))}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">
                {stats.xp} / {stats.xpToNextLevel} XP TILL NÄSTA LEVEL
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-robloxCard border-3 border-black rounded-2xl p-4 text-center shadow-roblox-btn-sm">
          <span className="text-3xl mb-1 block">⭐</span>
          <span className="text-xs text-slate-400 font-black block">TOTALA STJÄRNOR</span>
          <span className="text-xl md:text-2xl font-black text-robloxGold">{stats.stars} STJÄRNOR</span>
        </div>

        <div className="bg-robloxCard border-3 border-black rounded-2xl p-4 text-center shadow-roblox-btn-sm">
          <span className="text-3xl mb-1 block">💰</span>
          <span className="text-xs text-slate-400 font-black block">MYNT SALDO</span>
          <span className="text-xl md:text-2xl font-black text-emerald-400">{stats.coins} MYNT</span>
        </div>

        <div className="bg-robloxCard border-3 border-black rounded-2xl p-4 text-center shadow-roblox-btn-sm">
          <span className="text-3xl mb-1 block">🎯</span>
          <span className="text-xs text-slate-400 font-black block">KLARADE ÖVNINGAR</span>
          <span className="text-xl md:text-2xl font-black text-robloxCyan">{completedCount} / {TEKNIKOVNINGAR.length}</span>
        </div>

        <div className="bg-robloxCard border-3 border-black rounded-2xl p-4 text-center shadow-roblox-btn-sm">
          <span className="text-3xl mb-1 block">🏆</span>
          <span className="text-xs text-slate-400 font-black block">UPPLÅSTA PRISER</span>
          <span className="text-xl md:text-2xl font-black text-robloxPurple">{stats.unlockedItems.length} ITEMS</span>
        </div>
      </div>

      {/* Roblox Badges Wall */}
      <div className="bg-robloxCard border-4 border-robloxBorder rounded-3xl p-6 shadow-roblox-card">
        <h2 className="text-lg font-black text-white mb-4 flex items-center space-x-2">
          <span>🏅 UNIKA ROBLOX BADGES</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border-3 border-black flex items-start space-x-3 transition-all ${
                badge.unlocked
                  ? 'bg-robloxNavy border-robloxCyan shadow-roblox-btn-sm'
                  : 'bg-black/40 border-slate-800 opacity-50'
              }`}
            >
              <div className="text-3xl shrink-0">{badge.unlocked ? '🎖️' : '🔒'}</div>
              <div>
                <h4 className="font-black text-sm text-white">{badge.title}</h4>
                <p className="text-xs text-slate-300 mt-0.5">{badge.desc}</p>
                <span
                  className={`inline-block text-[10px] font-black mt-2 px-2 py-0.5 rounded-md border ${
                    badge.unlocked ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500' : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}
                >
                  {badge.unlocked ? 'UPPLÅST' : 'LÅST'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Progress Danger Action */}
      <div className="pt-4 text-right">
        <button
          onClick={() => {
            if (confirm('Vill du återställa alla framsteg i spelet?')) {
              resetProgress();
              alert('Framstegen har återställts!');
            }
          }}
          className="roblox-btn-red px-4 py-2 text-xs font-black uppercase"
        >
          🗑️ ÅTERSTÄLL FRAMSTEG
        </button>
      </div>
    </div>
  );
}
