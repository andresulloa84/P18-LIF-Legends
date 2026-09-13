'use client';

import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { TEKNIKOVNINGAR, TeknikOvning } from '@/data/teknikovningar';
import TeknikKort from '@/components/TeknikKort';
import DrillModal from '@/components/DrillModal';
import RewardModal from '@/components/RewardModal';
import Link from 'next/link';

export default function OvningarPage() {
  const { stats, completeDrill } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDrill, setActiveDrill] = useState<TeknikOvning | null>(null);

  // Reward modal state
  const [rewardData, setRewardData] = useState<{
    isOpen: boolean;
    stars: number;
    xp: number;
    coins: number;
    leveledUp: boolean;
    title: string;
  }>({
    isOpen: false,
    stars: 0,
    xp: 0,
    coins: 0,
    leveledUp: false,
    title: '',
  });

  const filteredDrills = TEKNIKOVNINGAR.filter((drill) => {
    if (selectedCategory === 'all') return true;
    return drill.category === selectedCategory;
  });

  const handleDrillComplete = (starRating: number) => {
    if (!activeDrill) return;

    const result = completeDrill(activeDrill.id, starRating);

    setRewardData({
      isOpen: true,
      stars: starRating,
      xp: result.xpGained,
      coins: result.coinsGained,
      leveledUp: result.leveledUp,
      title: activeDrill.title,
    });

    setActiveDrill(null);
  };

  const totalCompletedCount = Object.keys(stats.completedDrills).length;

  return (
    <div className="min-h-screen bg-[#191b1d] text-white p-4 md:p-8 max-w-6xl mx-auto space-y-6 pb-12">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/hub"
          className="inline-flex items-center space-x-2 text-xs font-black text-robloxCyan bg-robloxCard px-4 py-2 rounded-xl border-2 border-black shadow-roblox-btn-sm hover:scale-105 transition-all"
        >
          <span>⬅️</span>
          <span>TILLBAKA TILL ROBLOX GAME HUB</span>
        </Link>

        <div className="flex items-center space-x-3">
          <div className="bg-robloxCard border-2 border-black px-3 py-1.5 rounded-xl font-black text-xs text-robloxGold shadow-roblox-btn-sm">
            {stats.stars} ⭐ STJÄRNOR
          </div>
          <div className="bg-robloxCard border-2 border-black px-3 py-1.5 rounded-xl font-black text-xs text-emerald-400 shadow-roblox-btn-sm">
            {stats.coins} 💰 MYNT
          </div>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-robloxDark via-robloxCard to-robloxNavy border-4 border-robloxBorder rounded-3xl p-6 md:p-8 shadow-roblox-card relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-robloxNavy border-2 border-robloxCyan px-3 py-1 rounded-full text-xs font-black text-robloxCyan mb-2">
              <span>⚽ TEKNIKARENA</span>
              <span>•</span>
              <span>BOLLMÄSTARNA</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-wider text-white">
              TEKNIKÖVNINGAR
            </h1>
            <p className="text-sm md:text-base text-slate-300 font-medium max-w-xl mt-1">
              Genomför teknikövningarna, samla 3-stjärniga poäng och lås upp nya fotbollar i shoppen!
            </p>
          </div>

          {/* Quick Stats Widget */}
          <div className="flex items-center space-x-3 bg-black/60 border-3 border-black p-4 rounded-2xl shrink-0 shadow-roblox-btn-sm">
            <div className="text-center px-3 border-r-2 border-robloxBorder">
              <span className="text-xs text-slate-400 font-black block">KLARADE</span>
              <span className="text-xl md:text-2xl font-black text-robloxCyan">
                {totalCompletedCount} / {TEKNIKOVNINGAR.length}
              </span>
            </div>
            <div className="text-center px-3">
              <span className="text-xs text-slate-400 font-black block">POÄNG</span>
              <span className="text-xl md:text-2xl font-black text-robloxGold">
                {stats.stars * 100} PTS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Selection Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'ALLA ÖVNINGAR ⚡', color: 'bg-robloxCard' },
          { id: 'brons', label: 'BRONS 🥉', color: 'bg-amber-900/60 border-amber-600' },
          { id: 'silver', label: 'SILVER 🥈', color: 'bg-slate-800/80 border-slate-400' },
          { id: 'guld', label: 'GULD 🥇', color: 'bg-amber-500/20 border-robloxGold' },
          { id: 'legendar', label: 'LEGENDAR 💎', color: 'bg-cyan-950/80 border-robloxCyan' },
        ].map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm border-3 border-black whitespace-nowrap transition-all active:translate-y-0.5 ${
                isSelected
                  ? 'bg-gradient-to-r from-robloxBlue to-blue-600 text-white shadow-roblox-btn scale-105'
                  : `${cat.color} text-slate-300 hover:text-white shadow-roblox-btn-sm`
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Collectible 3D Roblox Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDrills.map((ovning) => (
          <TeknikKort
            key={ovning.id}
            ovning={ovning}
            earnedStars={stats.completedDrills[ovning.id] || 0}
            onSelect={(ovn) => setActiveDrill(ovn)}
          />
        ))}
      </div>

      {/* Drill Practice Modal */}
      <DrillModal
        ovning={activeDrill}
        onClose={() => setActiveDrill(null)}
        onComplete={handleDrillComplete}
      />

      {/* Reward & Level Up Celebration Modal */}
      <RewardModal
        isOpen={rewardData.isOpen}
        onClose={() => setRewardData((prev) => ({ ...prev, isOpen: false }))}
        starsAwarded={rewardData.stars}
        xpGained={rewardData.xp}
        coinsGained={rewardData.coins}
        leveledUp={rewardData.leveledUp}
        drillTitle={rewardData.title}
      />
    </div>
  );
}
