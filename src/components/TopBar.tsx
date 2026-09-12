'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Star, Settings, Shield, User, Trophy, Home, Dumbbell } from 'lucide-react';
import CoachLoginModal from './CoachLoginModal';

interface TopBarProps {
  totalStars?: number;
  activePlayerName?: string;
  isCoach?: boolean;
  onOpenPlayModal?: () => void;
  onCoachLoginSuccess?: () => void;
}

export default function TopBar({
  totalStars = 0,
  activePlayerName,
  isCoach = false,
  onOpenPlayModal,
  onCoachLoginSuccess,
}: TopBarProps) {
  const [isCoachModalOpen, setIsCoachModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <header className="sticky top-0 z-40 w-full px-4 py-3 bg-[#191b1d]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00b06f] to-[#008050] flex items-center justify-center font-black text-xl text-white shadow-lg shadow-[#00b06f]/20 group-hover:scale-105 transition-transform">
              LFL
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-wide block leading-none">
                LYCKSELE
              </span>
              <span className="font-black text-xs text-[#00b06f] tracking-widest block leading-tight">
                FOTBOLL LEGENDS
              </span>
            </div>
          </Link>

          {/* Navigation Pill Bar */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#232527] px-3 py-1.5 rounded-full border border-white/10 shadow-inner">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold text-white hover:bg-white/10 transition-colors"
            >
              <Home className="w-4 h-4 text-[#00b06f]" />
              Hem
            </Link>
            <button
              onClick={onOpenPlayModal}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold text-white hover:bg-white/10 transition-colors"
            >
              <Dumbbell className="w-4 h-4 text-[#f5c147]" />
              Övningar
            </button>
            <a
              href="#topplista"
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold text-white hover:bg-white/10 transition-colors"
            >
              <Trophy className="w-4 h-4 text-blue-400" />
              Topplista
            </a>
            {isCoach && (
              <Link
                href="/tranare"
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold text-[#00b06f] bg-[#00b06f]/10 border border-[#00b06f]/30 hover:bg-[#00b06f]/20 transition-colors"
              >
                <Shield className="w-4 h-4" />
                Tränarpanel
              </Link>
            )}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xs relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Sök övningar..."
              className="w-full bg-[#232527] border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#00b06f] transition-colors"
            />
          </div>

          {/* Right Section: Stars Currency Counter & Settings */}
          <div className="flex items-center gap-3">
            {/* Roblox-Style Star Counter */}
            <div className="flex items-center gap-2 bg-[#232527] px-3.5 py-1. rounded-full border border-[#f5c147]/30 shadow-md">
              <Star className="w-4 h-4 text-[#f5c147] fill-[#f5c147] animate-pulse" />
              <span className="font-black text-sm text-[#f5c147] tracking-wider">
                {totalStars}
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase hidden sm:inline">
                Stjärnor
              </span>
            </div>

            {/* User Greeting Pill */}
            {activePlayerName && (
              <div className="hidden sm:flex items-center gap-2 bg-[#232527] px-3 py-1 rounded-full border border-white/10">
                <User className="w-3.5 h-3.5 text-[#00b06f]" />
                <span className="text-xs font-semibold text-gray-200 truncate max-w-[100px]">
                  {activePlayerName}
                </span>
              </div>
            )}

            {/* Coach Settings Gear Button */}
            <button
              onClick={() => setIsCoachModalOpen(true)}
              title="Tränarinloggning / Inställningar"
              className="p-2 rounded-xl bg-[#232527] border border-white/10 text-gray-300 hover:text-white hover:border-[#00b06f] hover:bg-[#2b2d31] transition-all"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Coach Login Modal */}
      <CoachLoginModal
        isOpen={isCoachModalOpen}
        onClose={() => setIsCoachModalOpen(false)}
        onSuccess={() => {
          setIsCoachModalOpen(false);
          if (onCoachLoginSuccess) onCoachLoginSuccess();
        }}
      />
    </>
  );
}
