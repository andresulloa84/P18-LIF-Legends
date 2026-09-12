'use client';

import React from 'react';
import { Star, Award, Zap } from 'lucide-react';
import { Player, getLevelTitle } from '@/lib/initialData';

interface QuickStatsPillProps {
  player: Player | null;
}

export default function QuickStatsPill({ player }: QuickStatsPillProps) {
  const stars = player ? player.totalStars : 0;
  const levelInfo = getLevelTitle(stars);
  
  // Calculate level progress
  const prevMin = levelInfo.level === 1 ? 0 : levelInfo.level === 2 ? 20 : levelInfo.level === 3 ? 50 : 100;
  const nextMin = levelInfo.nextLevelMin;
  const starsInLevel = Math.max(0, stars - prevMin);
  const neededInLevel = Math.max(1, nextMin - prevMin);
  const progressPercent = levelInfo.level === 4 ? 100 : Math.min(100, Math.round((starsInLevel / neededInLevel) * 100));

  return (
    <section className="w-full max-w-7xl mx-auto px-4 my-4">
      <div className="roblox-card p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/10 bg-gradient-to-r from-[#232527] via-[#282a2d] to-[#232527]">
        
        {/* Left Side: Badge & Title */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f5c147] to-[#d99b1c] flex items-center justify-center text-2xl shadow-lg shadow-[#f5c147]/20 flex-shrink-0">
            {levelInfo.badge}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-[#f5c147] uppercase tracking-wider">
                {levelInfo.title}
              </span>
              <span className="text-[10px] font-bold bg-[#f5c147]/20 text-[#f5c147] px-2 py-0.5 rounded-full border border-[#f5c147]/30">
                Aktiv Rank
              </span>
            </div>
            <p className="text-xs text-gray-300 font-semibold mt-0.5">
              {player ? player.name : 'Spelare'} • {stars} Samlade Stjärnor ⭐
            </p>
          </div>
        </div>

        {/* Middle: Embedded Progress Bar */}
        <div className="flex-1 w-full max-w-xl mx-2">
          <div className="flex items-center justify-between text-xs font-black text-gray-300 mb-1.5">
            <span className="flex items-center gap-1 text-[#00b06f]">
              <Zap className="w-3.5 h-3.5 fill-[#00b06f]" /> XP Framsteg
            </span>
            <span className="text-[#f5c147]">
              {levelInfo.level === 4
                ? 'MÄSTARE! (Max Nivå)'
                : `${stars} / ${nextMin} stjärnor till nästa nivå`}
            </span>
          </div>

          <div className="w-full bg-[#191b1d] h-4 rounded-full p-0.5 border border-white/10 relative overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-[#00b06f] via-[#00e676] to-[#f5c147] h-full rounded-full transition-all duration-700 ease-out relative"
              style={{ width: `${progressPercent}%` }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Right Side: Percentage Pill */}
        <div className="flex items-center gap-2 bg-[#191b1d] px-4 py-2 rounded-xl border border-white/10">
          <Award className="w-5 h-5 text-[#f5c147]" />
          <span className="font-black text-lg text-white">
            {progressPercent}%
          </span>
        </div>

      </div>
    </section>
  );
}
