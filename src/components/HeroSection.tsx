'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ThumbsUp, Star, Users, Play, Edit3, ShieldCheck } from 'lucide-react';
import { Player } from '@/lib/initialData';

interface HeroSectionProps {
  activePlayer: Player | null;
  isCoach: boolean;
  onOpenPlayModal: () => void;
}

export default function HeroSection({ activePlayer, isCoach, onOpenPlayModal }: HeroSectionProps) {
  const playerName = activePlayer ? activePlayer.name : 'Legendar';
  const playerAvatar = activePlayer
    ? activePlayer.avatarUrl
    : 'https://api.dicebear.com/7.x/bottts/svg?seed=legend';

  return (
    <section className="w-full bg-[#191b1d] pt-4 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Title, Player Greeting, Reaction Pills */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
          
          {/* Subtitle / Level Badge */}
          <div className="inline-flex items-center gap-2 bg-[#232527] px-4 py-1.5 rounded-full border border-white/10 w-fit">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00b06f] animate-ping" />
            <span className="text-xs font-extrabold tracking-widest text-[#00b06f] uppercase">
              {activePlayer ? activePlayer.levelTitle : 'Säsong 2026 • Aktiv'}
            </span>
          </div>

          {/* Oversized Bold Roblox Game Title */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase drop-shadow-lg leading-tight">
              LYCKSELE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b06f] via-[#00e676] to-[#f5c147]">
                FOTBOLL LEGENDS
              </span>
            </h1>
            
            {/* Player Greeting */}
            <p className="mt-3 text-lg font-bold text-gray-300 flex items-center gap-2">
              Välkommen tillbaka, <span className="text-[#00b06f] underline decoration-[#00b06f]/40 underline-offset-4">{playerName}</span>! 👋
            </p>
          </div>

          {/* Roblox Social / Reaction Pill Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 bg-[#232527] px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-bold text-gray-300">
              <ThumbsUp className="w-3.5 h-3.5 text-[#00b06f]" />
              <span>98% Gillar</span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#232527] px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-bold text-gray-300">
              <Star className="w-3.5 h-3.5 text-[#f5c147] fill-[#f5c147]" />
              <span>1.2k Favoriter</span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#232527] px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-bold text-gray-300">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>34 Spelare i Truppen</span>
            </div>
          </div>

          {/* Quick Active Player Card */}
          {activePlayer && (
            <div className="roblox-card p-4 flex items-center gap-4 bg-gradient-to-r from-[#232527] to-[#191b1d]">
              <div className="w-14 h-14 rounded-xl bg-[#2b2d31] p-1 border border-white/10 flex-shrink-0">
                <img src={playerAvatar} alt={playerName} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-white">{activePlayer.name}</h3>
                  <span className="text-xs font-bold text-[#f5c147] bg-[#f5c147]/10 px-2 py-0.5 rounded-md border border-[#f5c147]/20">
                    ⭐ {activePlayer.totalStars} stjärnor
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-medium mt-0.5">{activePlayer.levelTitle}</p>
                <div className="w-full bg-[#191b1d] h-2 rounded-full mt-2 overflow-hidden border border-white/5">
                  <div
                    className="bg-gradient-to-r from-[#00b06f] to-[#f5c147] h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (activePlayer.totalStars % 20) * 5)}%` }}
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: 16:9 Roblox Game Pitch Banner & Big Play Button */}
        <div className="lg:col-span-6 flex flex-col items-center">
          
          <div className="w-full aspect-video relative rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-[#00b06f]/10 group">
            <img
              src="/roblox-banner.png"
              alt="Lycksele Fotboll Legends Banner"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#191b1d] via-transparent to-transparent opacity-80" />

            {/* Badge overlay on banner */}
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-black text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00b06f]" />
              Officiell P18 App
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="w-full mt-4 flex flex-col sm:flex-row items-center gap-3">
            
            {/* Massive Roblox Green Play Button */}
            <button
              onClick={onOpenPlayModal}
              className="w-full sm:flex-1 py-4 px-8 roblox-btn-primary flex items-center justify-center gap-3 text-xl font-black tracking-wider uppercase group shadow-xl"
            >
              <Play className="w-7 h-7 fill-white group-hover:scale-110 transition-transform" />
              <span>▶ SPELA</span>
            </button>

            {/* Coach Edit Drills Button if authenticated */}
            {isCoach ? (
              <Link
                href="/tranare"
                className="w-full sm:w-auto py-4 px-6 roblox-btn-secondary flex items-center justify-center gap-2 text-sm font-extrabold uppercase border border-[#00b06f]/50 text-[#00b06f]"
              >
                <Edit3 className="w-5 h-5" />
                <span>REDIGERA ÖVNINGAR</span>
              </Link>
            ) : (
              <a
                href="#topplista"
                className="w-full sm:w-auto py-4 px-6 roblox-btn-secondary flex items-center justify-center gap-2 text-sm font-bold uppercase text-gray-300"
              >
                <span>Visa Topplista</span>
              </a>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
