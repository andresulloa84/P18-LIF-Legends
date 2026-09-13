'use client';

import React from 'react';
import Link from 'next/link';
import { Play, Edit3, ThumbsDown, Star, Share2, Pencil } from 'lucide-react';
import { Player } from '@/lib/initialData';

interface HeroSectionProps {
  activePlayer: Player | null;
  isCoach: boolean;
  onOpenPlayModal: () => void;
}

export default function HeroSection({ activePlayer, isCoach, onOpenPlayModal }: HeroSectionProps) {
  const playerName = activePlayer ? activePlayer.name : 'Maxy';
  const playerAvatar = activePlayer
    ? activePlayer.avatarUrl
    : 'https://api.dicebear.com/7.x/bottts/svg?seed=maxy';

  return (
    <section className="w-full bg-[#191b1d] pt-4 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Exact Screenshot Typography & Social XP Row */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          
          {/* Titles & Welcome Back */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-none drop-shadow-md">
              LYCKSELE FOTBOLL LEGENDS
            </h1>
            
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">
              Futtey P18
            </h2>

            <p className="text-sm sm:text-base font-bold text-gray-300 mt-2">
              Welcome back, <span className="text-white font-extrabold">{playerName}!</span>
            </p>
          </div>

          {/* Social Row & Embedded XP Pill (Matching Screenshot Layout) */}
          <div className="relative pt-2">
            
            {/* Cartoon Stars Decorative Elements (from screenshot) */}
            <div className="absolute -top-6 right-8 pointer-events-none hidden sm:block">
              <span className="text-3xl animate-bounce">⭐</span>
              <span className="text-xl ml-1">✨</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              
              {/* Circular Football Avatar Badge with Edit Pencil (Screenshot) */}
              <div className="relative w-12 h-12 rounded-full border-2 border-[#00b06f] bg-[#232527] p-1 flex-shrink-0 flex items-center justify-center shadow-lg">
                <img src={playerAvatar} alt="Football avatar" className="w-full h-full object-contain rounded-full" />
                <button
                  title="Ändra avatar"
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00b06f] text-white flex items-center justify-center border border-[#191b1d]"
                >
                  <Pencil className="w-2.5 h-2.5" />
                </button>
              </div>

              {/* Social Icon Pills */}
              <div className="flex items-center gap-1.5 bg-[#232527] p-1.5 rounded-2xl border border-white/10">
                <button title="Dela" className="p-1.5 rounded-xl bg-blue-600/30 text-blue-400 hover:bg-blue-600/50 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>

                <button title="Favorite Star" className="p-1.5 rounded-xl bg-[#f5c147]/20 text-[#f5c147] hover:bg-[#f5c147]/40 transition-colors">
                  <Star className="w-4 h-4 fill-[#f5c147]" />
                </button>

                <button title="Dislike" className="p-1.5 rounded-xl bg-gray-700/50 text-gray-300 hover:bg-gray-700 transition-colors">
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </div>

              {/* Embedded XP Percentage Bar (Screenshot Green 55% Pill) */}
              <div className="flex-1 min-w-[180px] bg-[#232527] border border-white/10 rounded-2xl p-1.5 flex items-center gap-2 shadow-inner">
                <div className="w-7 h-7 rounded-xl bg-[#00b06f] flex items-center justify-center text-white text-xs font-black flex-shrink-0 shadow">
                  ⚽
                </div>
                <div className="flex-1 bg-[#191b1d] h-5 rounded-xl overflow-hidden relative border border-white/5">
                  <div
                    className="bg-[#00b06f] h-full rounded-xl transition-all duration-700 flex items-center justify-center text-[10px] font-black text-white"
                    style={{ width: '55%' }}
                  >
                    55%
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Right Column: 16:9 3D Roblox Stadium Banner & Play/Edit Buttons */}
        <div className="lg:col-span-5 flex flex-col items-center">
          
          {/* Banner */}
          <div className="w-full aspect-video relative rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl group">
            <img
              src="/roblox-banner.png"
              alt="Roblox Stadium Pitch Banner"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Action Buttons & Coach Tooltip Callout (Matching Screenshot) */}
          <div className="w-full mt-3 flex flex-col sm:flex-row items-center gap-3 relative">
            
            {/* Massive Green SPELA CTA Button */}
            <button
              onClick={onOpenPlayModal}
              className="w-full sm:flex-1 py-3.5 px-6 roblox-btn-primary flex items-center justify-center gap-2 text-lg sm:text-xl font-black tracking-wider uppercase shadow-xl"
            >
              <Play className="w-6 h-6 fill-white" />
              <span>SPELA</span>
            </button>

            {/* Coach Edit Drills Button */}
            <div className="w-full sm:w-auto relative">
              <Link
                href="/tranare"
                className="w-full py-3.5 px-5 bg-[#232527] border border-white/15 hover:border-[#00b06f]/50 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-extrabold text-white uppercase transition-all"
              >
                <Edit3 className="w-4 h-4 text-[#00b06f]" />
                <span>REDIGERA ÖVNINGAR</span>
              </Link>

              {/* Tooltip callout bubble (Screenshot) */}
              <div className="hidden md:block absolute top-full right-0 mt-2 w-64 bg-[#191b1d]/95 backdrop-blur-md p-3 rounded-xl border border-white/20 text-[11px] text-gray-300 shadow-2xl z-20">
                <p className="font-bold text-white mb-1">
                  Övningens Instruktioner och Videolänk (t.ex. YouTube/Vimeo)
                </p>
                <p className="text-[10px] text-gray-400">
                  Lägg till en tydlig videolänk för att hjälpa dina spelare att förstå övningen.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
