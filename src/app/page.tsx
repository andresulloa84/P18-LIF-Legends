'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, Star, ArrowRight, Shield } from 'lucide-react';
import TopBar from '@/components/TopBar';
import SideBar from '@/components/SideBar';
import HeroSection from '@/components/HeroSection';
import Leaderboard from '@/components/Leaderboard';
import DrillModal from '@/components/DrillModal';
import BottomPillBar from '@/components/BottomPillBar';
import { useAppStore } from '@/lib/store';

export default function RobloxExperienceHub() {
  const {
    isLoaded,
    players,
    drills,
    activePlayer,
    isCoachLoggedIn,
    logDrillActivity,
    setActivePlayer,
  } = useAppStore();

  const [isDrillModalOpen, setIsDrillModalOpen] = useState(false);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#191b1d] flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-[#00b06f] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-extrabold text-sm tracking-wider uppercase">Laddar Lycksele Fotboll Legends...</p>
      </div>
    );
  }

  // Aggregate total team balls collected
  const teamTotalBalls = players.reduce((sum, p) => sum + p.totalBalls, 0);

  return (
    <div className="min-h-screen bg-[#191b1d] text-white flex flex-col">
      
      {/* Top Header Navigation */}
      <TopBar
        totalBalls={activePlayer ? activePlayer.totalBalls : teamTotalBalls}
        activePlayerName={activePlayer ? activePlayer.name : undefined}
        isCoach={isCoachLoggedIn}
        onOpenPlayModal={() => setIsDrillModalOpen(true)}
      />

      {/* Main Layout Container with Sidebar */}
      <div className="flex-1 flex">
        
        {/* Vertical Icon Strip Sidebar */}
        <SideBar
          onOpenDrills={() => setIsDrillModalOpen(true)}
          isCoach={isCoachLoggedIn}
        />

        {/* Content Body */}
        <main className="flex-1 md:ml-16 pb-6">
          
          {/* Hero Split Screen Section (Matching Screenshot) */}
          <HeroSection
            activePlayer={activePlayer}
            isCoach={isCoachLoggedIn}
            onOpenPlayModal={() => setIsDrillModalOpen(true)}
          />

          {/* Bottom 3-Column Dashboard Grid (Exact Screenshot Composition) */}
          <div className="max-w-7xl mx-auto px-4 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            
            {/* COLUMN 1: Information (Screenshot Layout) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="roblox-card p-5 border border-white/10 bg-[#232527] h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-3">
                    Information
                  </h2>

                  <div className="p-4 rounded-2xl bg-[#191b1d] border border-white/5 space-y-3">
                    <p className="text-xs text-gray-300 leading-relaxed font-normal">
                      Foetball skillersarte llaga onare: en som ent för esen en kommuni hutball inch fottball.
                    </p>

                    <p className="text-xs text-gray-300 leading-relaxed font-normal">
                      En ny <strong>tränar-kontrollpanel</strong> har lagts till för att redigera övningar och lägga till videolänkar för tyd-tydlighet.
                    </p>
                  </div>
                </div>

                {/* Screenshot Embedded Progress Bar Pill: 10 / 50 with Cartoon Star Badges */}
                <div className="mt-4 p-3 bg-[#191b1d] rounded-2xl border border-white/10 flex items-center justify-between gap-2">
                  <span className="text-lg">⭐</span>
                  <div className="flex-1 bg-[#232527] h-4 rounded-full border border-white/10 overflow-hidden relative">
                    <div
                      className="bg-gradient-to-r from-[#00b06f] to-[#00e676] h-full rounded-full transition-all duration-700"
                      style={{ width: '20%' }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">
                      10 / 50 Bollar
                    </span>
                  </div>
                  <span className="text-lg">⭐</span>
                </div>
              </div>
            </div>

            {/* COLUMN 2: Community / Ledderboards (Screenshot Layout) */}
            <div className="lg:col-span-4">
              <Leaderboard
                players={players}
                activePlayer={activePlayer}
                onSelectPlayer={(p) => setActivePlayer(p)}
              />
            </div>

            {/* COLUMN 3: Team statiss (Screenshot Layout) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="roblox-card p-5 border border-white/10 bg-[#232527] h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-3">
                    Team statiss
                  </h2>

                  {/* Screenshot Team Card List (Team 1, Team 2, Team 3) */}
                  <div className="space-y-3">
                    <div className="p-3.5 bg-[#191b1d] rounded-xl border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 font-bold text-xs">
                          🛡️
                        </div>
                        <div>
                          <h4 className="font-extrabold text-xs text-white">Team 1</h4>
                          <span className="text-[10px] text-gray-400">Aff</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold text-gray-200">
                        <span>17 ⚽</span>
                        <span>22</span>
                        <span>20</span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-[#191b1d] rounded-xl border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-xs">
                          ⚽
                        </div>
                        <div>
                          <h4 className="font-extrabold text-xs text-white">Team 2</h4>
                          <span className="text-[10px] text-gray-400">Busserne</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold text-gray-200">
                        <span>9 ⚽</span>
                        <span>18</span>
                        <span>16</span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-[#191b1d] rounded-xl border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#00b06f]/20 border border-[#00b06f]/40 flex items-center justify-center text-[#00b06f] font-bold text-xs">
                          🏆
                        </div>
                        <div>
                          <h4 className="font-extrabold text-xs text-white">Team 3</h4>
                          <span className="text-[10px] text-gray-400">FC</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold text-gray-200">
                        <span>8 ⚽</span>
                        <span>13</span>
                        <span>0</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dynamic Player Link Shortcut */}
                {activePlayer && (
                  <div className="mt-4 pt-3 border-t border-white/5">
                    <Link
                      href={`/spelare/${activePlayer.username}`}
                      className="w-full py-2 px-3 roblox-btn-secondary text-xs font-bold flex items-center justify-center gap-2 text-[#00b06f] border-[#00b06f]/30"
                    >
                      <span>Spelarsida: {activePlayer.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>

          </div>

        </main>
      </div>

      {/* Bottom Roblox Pill Bar */}
      <BottomPillBar />

      {/* Drill Selection Modal Popup */}
      <DrillModal
        isOpen={isDrillModalOpen}
        onClose={() => setIsDrillModalOpen(false)}
        drills={drills}
        activePlayer={activePlayer}
        onLogActivity={logDrillActivity}
      />

    </div>
  );
}
