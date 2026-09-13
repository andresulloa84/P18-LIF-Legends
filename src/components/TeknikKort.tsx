'use client';

import React from 'react';
import { TeknikOvning } from '@/data/teknikovningar';

interface TeknikKortProps {
  ovning: TeknikOvning;
  earnedStars: number;
  onSelect: (ovning: TeknikOvning) => void;
}

export default function TeknikKort({ ovning, earnedStars, onSelect }: TeknikKortProps) {
  return (
    <div className="roblox-card flex flex-col justify-between group">
      {/* Category Tag Header */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs font-black px-2.5 py-1 rounded-xl border-2 border-black text-black shadow-sm uppercase tracking-wider"
          style={{ backgroundColor: ovning.difficultyColor }}
        >
          {ovning.categoryLabel}
        </span>
        
        {/* Star Rating Display */}
        <div className="flex space-x-0.5 bg-black/40 px-2 py-1 rounded-xl border border-white/10">
          {[1, 2, 3].map((star) => (
            <span
              key={star}
              className={`text-lg transition-transform ${
                star <= earnedStars ? 'text-robloxGold scale-110 drop-shadow-[0_0_6px_rgba(255,199,0,0.8)]' : 'text-slate-600 opacity-40'
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Card Content Icon & Title */}
      <div className="flex items-start space-x-3 my-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-robloxNavy border-3 border-black flex items-center justify-center text-3xl shadow-roblox-btn-sm shrink-0 group-hover:scale-110 transition-transform">
          {ovning.badgeIcon}
        </div>
        <div>
          <h3 className="text-lg font-black text-white group-hover:text-robloxCyan transition-colors line-clamp-1">
            {ovning.title}
          </h3>
          <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-snug">
            {ovning.shortDesc}
          </p>
        </div>
      </div>

      {/* Reward Badges */}
      <div className="grid grid-cols-2 gap-2 my-3 text-center text-xs font-black">
        <div className="bg-robloxNavy/80 border-2 border-robloxBorder rounded-xl py-1.5 px-2 text-robloxCyan">
          +{ovning.xpReward} XP
        </div>
        <div className="bg-robloxNavy/80 border-2 border-robloxBorder rounded-xl py-1.5 px-2 text-emerald-400">
          +{ovning.coinReward} 💰
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onSelect(ovning)}
        className="w-full roblox-btn-green py-2.5 text-sm uppercase tracking-wider flex items-center justify-center space-x-2 mt-1"
      >
        <span>STARTA ÖVNING</span>
        <span className="text-lg">➔</span>
      </button>
    </div>
  );
}
