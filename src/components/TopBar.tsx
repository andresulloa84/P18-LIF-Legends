'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Settings, Shield, User, Trophy, Home, Menu, X } from 'lucide-react';
import CoachLoginModal from './CoachLoginModal';

interface TopBarProps {
  totalBalls?: number;
  activePlayerName?: string;
  isCoach?: boolean;
  onOpenPlayModal?: () => void;
  onCoachLoginSuccess?: () => void;
}

export default function TopBar({
  totalBalls = 0,
  activePlayerName,
  isCoach = false,
  onOpenPlayModal,
  onCoachLoginSuccess,
}: TopBarProps) {
  const [isCoachModalOpen, setIsCoachModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full px-3 sm:px-6 py-2.5 bg-[#191b1d] border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Roblox Square Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white text-[#191b1d] font-black text-xl flex items-center justify-center rounded-lg shadow-md group-hover:scale-105 transition-transform">
              <span className="transform -rotate-12 block font-extrabold">O</span>
            </div>
          </Link>

          {/* Desktop Nav Links (Screenshot: Home, Playing, Games, Profile) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-200">
            <Link href="/" className="hover:text-[#00b06f] transition-colors">
              Home
            </Link>
            <button onClick={onOpenPlayModal} className="hover:text-[#00b06f] transition-colors">
              Playing
            </button>
            <button onClick={onOpenPlayModal} className="hover:text-[#00b06f] transition-colors">
              Games
            </button>
            {activePlayerName ? (
              <span className="text-gray-300">Profile</span>
            ) : (
              <span className="text-gray-400">Profile</span>
            )}
            {isCoach && (
              <Link href="/tranare" className="text-[#00b06f] flex items-center gap-1">
                <Shield className="w-4 h-4" /> Tränare
              </Link>
            )}
          </nav>

          {/* Screenshot Search Bar (Q Search) */}
          <div className="flex-1 max-w-md mx-2 sm:mx-4 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full bg-[#232527] border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#00b06f] transition-colors"
            />
          </div>

          {/* Right Section: Roblox Currency ⚽ Bollar Counter & Settings */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            
            {/* ⚽ Football Collection Counter */}
            <div className="flex items-center gap-1.5 bg-[#232527] px-3 py-1.5 rounded-full border border-white/10 shadow-inner">
              <span className="text-base sm:text-lg animate-bounce">⚽</span>
              <span className="font-black text-xs sm:text-sm text-white tracking-wide">
                {totalBalls}
              </span>
            </div>

            {/* Coach Gear Settings Button */}
            <button
              onClick={() => setIsCoachModalOpen(true)}
              title="Tränarinloggning / Settings"
              className="p-1.5 sm:p-2 rounded-xl bg-[#232527] border border-white/10 text-gray-300 hover:text-white hover:border-[#00b06f] transition-all"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg bg-[#232527] text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-2 bg-[#232527] p-3 rounded-xl">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-white py-1">
              Home
            </Link>
            <button onClick={() => { onOpenPlayModal?.(); setMobileMenuOpen(false); }} className="text-xs font-bold text-left text-white py-1">
              Playing / Övningar
            </button>
            {isCoach && (
              <Link href="/tranare" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#00b06f] py-1">
                Tränarpanel
              </Link>
            )}
          </div>
        )}
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
