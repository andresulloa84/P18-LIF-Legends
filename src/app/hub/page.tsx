'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import UserSelectionModal from '@/components/UserSelectionModal';

export default function RobloxGameHubPage() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [activePlayerName] = useState('Maxy');

  return (
    <div className="min-h-screen bg-[#191b1d] text-white flex flex-col font-sans select-none overflow-x-hidden">
      
      {/* 1. TOP ROBLOX APP NAV BAR (Matching Image 2) */}
      <header className="bg-[#232527] border-b border-white/10 px-4 py-2.5 flex items-center justify-between z-30">
        {/* Left: Roblox Logo & Navigation Links */}
        <div className="flex items-center space-x-6">
          <div className="w-7 h-7 bg-white text-black font-black flex items-center justify-center rounded-sm text-sm transform -rotate-12 shadow">
            [ ]
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-bold text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/hub" className="text-white font-extrabold border-b-2 border-[#00b06f] pb-0.5">Playing</Link>
            <Link href="/ovningar" className="hover:text-white transition-colors">Games</Link>
            <Link href="/profil" className="hover:text-white transition-colors">Profile</Link>
          </nav>
        </div>

        {/* Center: Pill Search Bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-[#191b1d] border border-white/10 rounded-full px-9 py-1.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#00b06f]"
            />
            <span className="absolute left-3 top-1.5 text-gray-400 text-xs">🔍</span>
          </div>
        </div>

        {/* Right: Menu icon, Robux Balance, Settings */}
        <div className="flex items-center space-x-4 text-sm font-bold text-gray-300">
          <button className="hover:text-white">☰</button>
          <div className="flex items-center space-x-1.5 bg-[#191b1d] border border-white/10 px-2.5 py-1 rounded-full text-xs font-black">
            <span className="w-4 h-4 rounded-full bg-slate-300 text-black text-[9px] font-black flex items-center justify-center">
              ⬢
            </span>
            <span>0</span>
          </div>
          <button className="hover:text-white">⚙️</button>
        </div>
      </header>

      {/* 2. MAIN CONTAINER WITH LEFT SIDEBAR AND GAME PAGE CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar Column (Matching Image 2) */}
        <aside className="w-14 bg-[#191b1d] border-r border-white/10 flex flex-col items-center py-4 space-y-6 shrink-0 z-20">
          <Link href="/" title="Home" className="w-9 h-9 rounded-xl bg-[#232527] flex items-center justify-center text-lg hover:bg-[#00b06f]/20 hover:text-[#00b06f] transition-colors">
            🏠
          </Link>
          <Link href="/ovningar" title="Games" className="w-9 h-9 rounded-xl bg-[#232527] flex items-center justify-center text-lg hover:bg-[#00b06f]/20 hover:text-[#00b06f] transition-colors">
            🎮
          </Link>
          <Link href="/profil" title="People / Friends" className="w-9 h-9 rounded-xl bg-[#232527] flex items-center justify-center text-lg hover:bg-[#00b06f]/20 hover:text-[#00b06f] transition-colors">
            👤
          </Link>
          <Link href="/topplista" title="Groups" className="w-9 h-9 rounded-xl bg-[#232527] flex items-center justify-center text-lg hover:bg-[#00b06f]/20 hover:text-[#00b06f] transition-colors">
            👥
          </Link>
          <button title="Chat" className="w-9 h-9 rounded-xl bg-[#232527] flex items-center justify-center text-lg hover:bg-[#00b06f]/20 hover:text-[#00b06f] transition-colors">
            💬
          </button>
          <button title="More" className="w-9 h-9 rounded-xl bg-[#232527] flex items-center justify-center text-lg hover:bg-[#00b06f]/20 hover:text-[#00b06f] transition-colors">
            ⭕
          </button>
        </aside>

        {/* Main Content Area (Matching Image 2 Layout) */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-6xl mx-auto w-full space-y-6">
          
          {/* Top Hero Section: Game Titles, Social Pills, 16:9 Pitch Banner & SPELA Button */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Header Titles & Avatar Social Pill */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-none drop-shadow-md">
                  LYCKSELE FOTBOLL LEGENDS
                </h1>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1 tracking-tight">
                  Futtey P18
                </h2>
                <p className="text-sm font-bold text-gray-300 mt-2">
                  Welcome back, <span className="text-white font-extrabold">{activePlayerName}!</span>
                </p>
              </div>

              {/* Avatar Social Row & 55% Green XP Pill (Exact Match to Image 2) */}
              <div className="relative pt-2">
                {/* Cartoon Stars Decorative Elements */}
                <div className="absolute -top-4 right-16 pointer-events-none hidden sm:block">
                  <span className="text-3xl animate-bounce">⭐</span>
                  <span className="text-xl ml-1">✨</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {/* Soccer Ball Avatar Circle with Edit Pencil Icon */}
                  <div className="relative w-12 h-12 rounded-full border-2 border-[#00b06f] bg-[#232527] p-1 shrink-0 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">⚽</span>
                    <button
                      onClick={() => setIsUserModalOpen(true)}
                      title="Byt Spelare"
                      className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00b06f] text-white flex items-center justify-center text-[10px] border border-[#191b1d]"
                    >
                      ✏️
                    </button>
                  </div>

                  {/* Social Action Icon Pills */}
                  <div className="flex items-center gap-1.5 bg-[#232527] p-1.5 rounded-2xl border border-white/10">
                    <button className="p-1.5 rounded-xl bg-blue-600/30 text-blue-400 font-black text-xs w-7 h-7 flex items-center justify-center">
                      f
                    </button>
                    <button className="p-1.5 rounded-xl bg-[#f5c147]/20 text-[#f5c147] text-xs w-7 h-7 flex items-center justify-center">
                      ⭐
                    </button>
                    <button className="p-1.5 rounded-xl bg-gray-700/50 text-gray-300 text-xs w-7 h-7 flex items-center justify-center">
                      👎
                    </button>
                  </div>

                  {/* 55% Green XP Pill Progress Bar */}
                  <div className="flex-1 min-w-[180px] bg-[#232527] border border-white/10 rounded-2xl p-1.5 flex items-center gap-2 shadow-inner">
                    <div className="w-7 h-7 rounded-xl bg-[#00b06f] flex items-center justify-center text-white text-xs font-black shrink-0">
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

            {/* Right Column: 16:9 Pitch Banner & SPELA Button */}
            <div className="lg:col-span-5 flex flex-col items-center">
              {/* 16:9 Pitch Stadium Banner */}
              <div className="w-full aspect-video relative rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl group">
                <img
                  src="/roblox-banner.png"
                  alt="Roblox Pitch Banner"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Action Buttons & Tooltip Callout */}
              <div className="w-full mt-3 flex flex-col sm:flex-row items-center gap-3 relative">
                {/* Massive Green SPELA Button (Matching Image 2) */}
                <button
                  onClick={() => setIsUserModalOpen(true)}
                  className="w-full sm:flex-1 py-4 px-6 bg-gradient-to-r from-emerald-400 to-[#00b06f] hover:brightness-110 text-white border-3 border-black rounded-2xl flex items-center justify-center gap-2 text-xl font-black tracking-wider uppercase shadow-xl transition-transform active:scale-95"
                >
                  <span className="text-2xl">▶</span>
                  <span>SPELA</span>
                </button>

                {/* REDIGERA ÖVNINGAR Button */}
                <div className="w-full sm:w-auto relative">
                  <Link
                    href="/tranare"
                    className="w-full py-3.5 px-5 bg-[#232527] border border-white/15 hover:border-[#00b06f]/50 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-extrabold text-white uppercase transition-all"
                  >
                    <span>📝</span>
                    <span>REDIGERA ÖVNINGAR</span>
                  </Link>

                  {/* Tooltip callout bubble (Exact matching text from Image 2) */}
                  <div className="hidden md:block absolute top-full right-0 mt-2 w-64 bg-[#191b1d]/95 backdrop-blur-md p-3 rounded-xl border border-white/20 text-[11px] text-gray-300 shadow-2xl z-20">
                    <p className="font-bold text-white mb-1">
                      Övningens Instruktioner och Videolänk (t.ex. YouTube/Vimeo)
                    </p>
                    <div className="w-full bg-[#232527] border border-white/20 rounded p-1 mb-1 text-[10px] font-mono text-gray-400">
                      |
                    </div>
                    <p className="text-[10px] text-gray-400">
                      Lägg till en tydlig videolänk för att hjälpa dina spelare att förstå övningen.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 3. THREE-COLUMN BOTTOM INFORMATION & COMMUNITY GRID (Exact Match to Image 2) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
            
            {/* Column 1: Information */}
            <div className="bg-[#232527] border border-white/10 rounded-2xl p-5 shadow-lg space-y-3">
              <h3 className="text-lg font-black text-white">Information</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Foetball skillersarte llaga onares en som ent för esen en kommuni futball inch fottball.
              </p>
              <p className="text-xs text-gray-300 leading-relaxed">
                En ny <strong className="text-white">tränar-kontrollpanel</strong> har lagts till för att redigera övningar och lägga till videolänkar för tyd-tydlighet.
              </p>

              {/* Star Progress Bar Pill (10/50 ⭐) */}
              <div className="pt-2 bg-[#191b1d] p-3 rounded-2xl border border-white/10 flex items-center space-x-3">
                <span className="text-xl">⭐</span>
                <div className="flex-1">
                  <div className="w-full bg-[#232527] h-3.5 rounded-full overflow-hidden border border-white/10 relative">
                    <div className="bg-gradient-to-r from-emerald-400 to-[#00b06f] h-full w-[20%]" />
                    <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-white">
                      10 / 50
                    </span>
                  </div>
                </div>
                <span className="text-xl">⭐</span>
              </div>
            </div>

            {/* Column 2: Community / Ledderboards (Exact values from Image 2) */}
            <div className="bg-[#232527] border border-white/10 rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white">Community</h3>
                <span className="text-xs font-bold text-gray-400">Ledderboards ⌃</span>
              </div>

              <div className="space-y-2 text-xs font-bold">
                <div className="flex items-center justify-between bg-[#191b1d] p-2.5 rounded-xl border border-white/5">
                  <span className="text-white flex items-center gap-2">
                    <span className="text-gray-400 font-black">1</span>
                    <span>👑 Vifsgolt</span>
                  </span>
                  <span className="text-gray-300 font-black">166</span>
                </div>

                <div className="flex items-center justify-between bg-[#191b1d] p-2.5 rounded-xl border border-white/5">
                  <span className="text-white flex items-center gap-2">
                    <span className="text-gray-400 font-black">2</span>
                    <span>🏆 Zeroslamme</span>
                  </span>
                  <span className="text-gray-300 font-black">54</span>
                </div>

                <div className="flex items-center justify-between bg-[#191b1d] p-2.5 rounded-xl border border-white/5">
                  <span className="text-white flex items-center gap-2">
                    <span className="text-gray-400 font-black">3</span>
                    <span>🏆 Lordershorn</span>
                  </span>
                  <span className="text-gray-300 font-black">30</span>
                </div>

                <div className="flex items-center justify-between bg-[#191b1d] p-2.5 rounded-xl border border-white/5">
                  <span className="text-white flex items-center gap-2">
                    <span className="text-gray-400 font-black">4</span>
                    <span>🛡️ LyckseleP18</span>
                  </span>
                  <span className="text-gray-300 font-black">29</span>
                </div>

                <div className="flex items-center justify-between bg-[#191b1d] p-2.5 rounded-xl border border-white/5">
                  <span className="text-white flex items-center gap-2">
                    <span className="text-gray-400 font-black">5</span>
                    <span>⚽ Baravenckim</span>
                  </span>
                  <span className="text-gray-300 font-black">10</span>
                </div>
              </div>
            </div>

            {/* Column 3: Team statiss (Exact values from Image 2) */}
            <div className="bg-[#232527] border border-white/10 rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white">Team statiss</h3>
                <span className="text-xs font-bold text-[#00b06f] bg-[#00b06f]/10 px-2 py-0.5 rounded border border-[#00b06f]/30">Team</span>
              </div>

              <div className="space-y-2.5 text-xs font-bold">
                <div className="bg-[#191b1d] p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">1</span>
                    <span className="w-3.5 h-3.5 bg-amber-500 rounded-sm inline-block" />
                    <div>
                      <div className="text-white">Team 1</div>
                      <div className="text-[10px] text-gray-500">Aff</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300 font-black">
                    <span>17</span>
                    <span>22</span>
                    <span>20</span>
                  </div>
                </div>

                <div className="bg-[#191b1d] p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">2</span>
                    <span className="w-3.5 h-3.5 bg-blue-500 rounded-sm inline-block" />
                    <div>
                      <div className="text-white">Team 2</div>
                      <div className="text-[10px] text-gray-500">Busserne</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300 font-black">
                    <span>9</span>
                    <span>18</span>
                    <span>16</span>
                  </div>
                </div>

                <div className="bg-[#191b1d] p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">3</span>
                    <span className="w-3.5 h-3.5 bg-red-500 rounded-sm inline-block" />
                    <div>
                      <div className="text-white">Team 3</div>
                      <div className="text-[10px] text-gray-500">FC</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300 font-black">
                    <span>8</span>
                    <span>13</span>
                    <span>0</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom App Client Footer (Matching Image 2) */}
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 pt-4 border-t border-white/10">
            <div className="flex items-center space-x-6">
              <span>Friome</span>
              <span>Roblox</span>
              <span>Teams</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🔍 Search</span>
            </div>
          </div>

        </main>
      </div>

      {/* User Selection & Password Login Modal */}
      <UserSelectionModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
      />
    </div>
  );
}
