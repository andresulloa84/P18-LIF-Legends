'use client';

import React from 'react';
import { Award, Zap } from 'lucide-react';
import { Player, getLevelTitle } from '@/lib/initialData';

interface QuickStatsPillProps {
  player: Player | null;
}

export default function QuickStatsPill({ player }: QuickStatsPillProps) {
  const balls = player ? player.totalBalls : 0;
  const levelInfo = getLevelTitle(balls);
  
  // Calculate level progress
  const prevMin = levelInfo.level === 1 ? 0 : levelInfo.level === 2 ? 20 : levelInfo.level === 3 ? 50 : 100;
  const nextMin = levelInfo.nextLevelMin;
  const ballsInLevel = Math.max(0, balls - prevMin);
  const neededInLevel = Math.max(1, nextMin - prevMin);
  const progressPercent = levelInfo.level === 4 ? 100 : Math.min(100, Math.round((ballsInLevel / neededInLevel) * 100));

  return (
    <section className="w-full max-w-7xl mx-auto px-4 my-3">
      <div className="roblox-card p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/10 bg-gradient-to-r from-[#232527] via-[#282a2d] to-[#232527]">
        
        {/* Left Side: Badge & Title */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-11 h-11 rounded-xl bg-[#00b06f] flex items-center justify-center text-xl shadow-md flex-shrink-0">
            {levelInfo.badge}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs sm:text-sm text-[#00b06f] uppercase tracking-wider">
                {levelInfo.title}
              </span>
              <span className="text-[10px] font-bold bg-[#00b06f]/20 text-[#00b06f] px-2 py-0.5 rounded-full border border-[#00b06f]/30">
                Aktiv Rank
              </span>
            </div>
            <p className="text-xs text-gray-300 font-semibold mt-0.5">
              {player ? player.name : 'Spelare'} • {balls} Samlade Bollar ⚽
            </p>
          </div>
        </div>

        {/* Middle: Embedded Progress Bar */}
        <div className="flex-1 w-full max-w-xl mx-2">
          <div className="flex items-center justify-between text-xs font-black text-gray-300 mb-1.5">
            <span className="flex items-center gap-1 text-[#00b06f]">
              <Zap className="w-3.5 h-3.5 fill-[#00b06f]" /> XP Framsteg
            </span>
            <span className="text-white">
              {levelInfo.level === 4
                ? 'MÄSTARE! (Max Nivå)'
                : `${balls} / ${nextMin} bollar till nästa nivå`}
            </span>
          </div>

          <div className="w-full bg-[#191b1d] h-4 rounded-full p-0.5 border border-white/10 relative overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-[#00b06f] via-[#00e676] to-[#00c87d] h-full rounded-full transition-all duration-700 ease-out relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Right Side: Percentage Pill */}
        <div className="flex items-center gap-2 bg-[#191b1d] px-4 py-2 rounded-xl border border-white/10">
          <Award className="w-4 h-4 text-[#00b06f]" />
          <span className="font-black text-base sm:text-lg text-white">
            {progressPercent}%
          </span>
        </div>

      </div>
    </section>
  );
}
