'use client';

import React from 'react';
import Link from 'next/link';
import { useGame } from '@/context/GameContext';

interface LeaderboardEntry {
  rank: number;
  name: string;
  level: number;
  stars: number;
  coins: number;
  title: string;
  avatar: string;
  badge: string;
}

export default function TopplistaPage() {
  const { stats } = useGame();

  const mockLeaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Zlatan_Roblox', level: 18, stars: 27, coins: 1420, title: 'Roblox Legend 👑', avatar: '🦁', badge: '🥇 GULD-MÄSTARE' },
    { rank: 2, name: stats.playerName, level: stats.level, stars: stats.stars, coins: stats.coins, title: 'Teknik-Mästare ⚡', avatar: '🎮', badge: '🥈 DITT LAG' },
    { rank: 3, name: 'Kalle_Fotboll', level: 12, stars: 19, coins: 890, title: 'Bollkontrollant 👟', avatar: '⚡', badge: '🥉 BRONS-MÄSTARE' },
    { rank: 4, name: 'Emma_Striker', level: 10, stars: 15, coins: 640, title: 'Bollkontrollant 👟', avatar: '⚽', badge: 'LIF P18' },
    { rank: 5, name: 'Hugo_Dribbler', level: 8, stars: 12, coins: 510, title: 'Bollkontrollant 👟', avatar: '🔥', badge: 'LIF P18' },
    { rank: 6, name: 'Liam_Passer', level: 6, stars: 9, coins: 380, title: 'Bollkontrollant 👟', avatar: '💎', badge: 'LIF P18' },
  ].sort((a, b) => b.stars - a.stars).map((entry, index) => ({ ...entry, rank: index + 1 }));

  return (
    <div className="min-h-screen bg-[#191b1d] text-white p-4 md:p-8 max-w-6xl mx-auto space-y-6 pb-12">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/hub"
          className="inline-flex items-center space-x-2 text-xs font-black text-[#00b06f] bg-[#232527] px-4 py-2 rounded-xl border border-white/10 hover:border-[#00b06f] transition-all"
        >
          <span>⬅️</span>
          <span>TILLBAKA TILL ROBLOX GAME HUB</span>
        </Link>
      </div>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-robloxDark via-robloxCard to-robloxNavy border-4 border-robloxBorder rounded-3xl p-6 md:p-8 shadow-roblox-card text-center relative overflow-hidden">
        <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-robloxGold via-yellow-200 to-amber-400 tracking-wider">
          LAGETS TOPPLISTA 🏆
        </h1>
        <p className="text-sm md:text-base text-slate-300 font-medium mt-1">
          Lycksele Fotboll Legends • Vem har flest stjärnor i teknikövningarna?
        </p>
      </div>

      {/* Top 3 Roblox Podium */}
      <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto my-6 items-end">
        {/* 2nd Place */}
        {mockLeaderboard[1] && (
          <div className="bg-robloxCard border-4 border-slate-400 rounded-3xl p-4 text-center shadow-roblox-card flex flex-col items-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-slate-700 border-3 border-black flex items-center justify-center text-3xl shadow-roblox-btn-sm mb-2">
              {mockLeaderboard[1].avatar}
            </div>
            <span className="text-xs font-black bg-slate-400 text-black px-2 py-0.5 rounded-full mb-1">2:A PLATS</span>
            <h3 className="font-black text-sm md:text-base text-white truncate max-w-full">{mockLeaderboard[1].name}</h3>
            <span className="text-xs font-black text-robloxGold mt-1">{mockLeaderboard[1].stars} ⭐</span>
          </div>
        )}

        {/* 1st Place (Center / Taller) */}
        {mockLeaderboard[0] && (
          <div className="bg-gradient-to-b from-amber-500/20 to-robloxCard border-4 border-robloxGold rounded-3xl p-5 text-center shadow-gold-glow flex flex-col items-center -translate-y-3">
            <div className="text-2xl mb-1">👑</div>
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-robloxGold border-3 border-black flex items-center justify-center text-4xl shadow-roblox-btn mb-2 text-black">
              {mockLeaderboard[0].avatar}
            </div>
            <span className="text-xs font-black bg-robloxGold text-black px-3 py-0.5 rounded-full mb-1">1:A PLATS</span>
            <h3 className="font-black text-base md:text-lg text-white truncate max-w-full">{mockLeaderboard[0].name}</h3>
            <span className="text-sm font-black text-robloxGold mt-1">{mockLeaderboard[0].stars} ⭐</span>
          </div>
        )}

        {/* 3rd Place */}
        {mockLeaderboard[2] && (
          <div className="bg-robloxCard border-4 border-amber-700 rounded-3xl p-4 text-center shadow-roblox-card flex flex-col items-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-amber-900 border-3 border-black flex items-center justify-center text-3xl shadow-roblox-btn-sm mb-2">
              {mockLeaderboard[2].avatar}
            </div>
            <span className="text-xs font-black bg-amber-700 text-white px-2 py-0.5 rounded-full mb-1">3:E PLATS</span>
            <h3 className="font-black text-sm md:text-base text-white truncate max-w-full">{mockLeaderboard[2].name}</h3>
            <span className="text-xs font-black text-robloxGold mt-1">{mockLeaderboard[2].stars} ⭐</span>
          </div>
        )}
      </div>

      {/* Leaderboard Table List */}
      <div className="bg-robloxCard border-4 border-robloxBorder rounded-3xl p-4 md:p-6 shadow-roblox-card">
        <h2 className="text-lg font-black text-white mb-4 flex items-center space-x-2">
          <span>📊 ALLA SPELARE I LAGET</span>
        </h2>

        <div className="space-y-3">
          {mockLeaderboard.map((player) => {
            const isCurrent = player.name === stats.playerName;
            return (
              <div
                key={player.name}
                className={`flex items-center justify-between p-3 md:p-4 rounded-2xl border-3 border-black transition-all ${
                  isCurrent ? 'bg-robloxNavy border-robloxCyan shadow-roblox-btn-sm' : 'bg-robloxDark'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-black/60 border border-white/20 flex items-center justify-center font-black text-sm text-robloxGold">
                    #{player.rank}
                  </span>

                  <div className="w-10 h-10 rounded-xl bg-slate-800 border-2 border-black flex items-center justify-center text-2xl">
                    {player.avatar}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-black text-sm md:text-base text-white">{player.name}</h4>
                      {isCurrent && (
                        <span className="bg-robloxBlue text-white text-[10px] font-black px-2 py-0.5 rounded-md border border-black">
                          DU
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 font-bold">{player.title}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="font-black text-robloxGold text-sm md:text-base block">
                      {player.stars} ⭐
                    </span>
                    <span className="text-[11px] text-emerald-400 font-bold">
                      {player.coins} 💰
                    </span>
                  </div>

                  <button
                    onClick={() => alert(`Du gav en bonus-stjärna till ${player.name}! 🌟`)}
                    className="roblox-btn-blue px-3 py-1.5 text-xs font-black hidden sm:block"
                  >
                    GE ⭐
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
