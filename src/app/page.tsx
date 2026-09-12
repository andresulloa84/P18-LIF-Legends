'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Info, BookOpen, Star, Sparkles, Award, ArrowRight, Play, Users } from 'lucide-react';
import TopBar from '@/components/TopBar';
import SideBar from '@/components/SideBar';
import HeroSection from '@/components/HeroSection';
import QuickStatsPill from '@/components/QuickStatsPill';
import Leaderboard from '@/components/Leaderboard';
import DrillModal from '@/components/DrillModal';
import { useAppStore } from '@/lib/store';
import { LEVEL_TIERS } from '@/lib/initialData';

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

  // Calculate team total aggregate stars
  const teamTotalStars = players.reduce((sum, p) => sum + p.totalStars, 0);

  return (
    <div className="min-h-screen bg-[#191b1d] text-white flex flex-col">
      
      {/* Top Bar Navigation */}
      <TopBar
        totalStars={activePlayer ? activePlayer.totalStars : teamTotalStars}
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
        <main className="flex-1 md:ml-16 pb-12">
          
          {/* Hero Split Screen Section */}
          <HeroSection
            activePlayer={activePlayer}
            isCoach={isCoachLoggedIn}
            onOpenPlayModal={() => setIsDrillModalOpen(true)}
          />

          {/* Quick Stats XP Progress Bar Pill */}
          <QuickStatsPill player={activePlayer} />

          {/* Bottom 3-Column Dashboard Grid */}
          <div className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* COLUMN 1: Information & Övningsregler */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Rules & Info Card */}
              <div className="roblox-card p-6 border border-white/10 bg-[#232527]">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-[#00b06f]/20 border border-[#00b06f]/40 flex items-center justify-center text-[#00b06f]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white uppercase tracking-wide">
                      Information & Regler
                    </h3>
                    <p className="text-xs text-gray-400">Instruktioner för Bollmästarna</p>
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-gray-300 leading-relaxed font-normal">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00b06f] font-bold">1.</span>
                    <span>Varje genomförd övning ger <strong>+1 Stjärna ⭐</strong> till din profil.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00b06f] font-bold">2.</span>
                    <span>Titta noggrant på videoinstruktionerna för korrekt spetteknik.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00b06f] font-bold">3.</span>
                    <span>När du samlar tillräckligt med stjärnor låser du upp högre nivåer och nya avancerade finter!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00b06f] font-bold">4.</span>
                    <span>Alla stjärnor räknas ihop till hela truppens gemensamma lagmål.</span>
                  </li>
                </ul>
              </div>

              {/* Tier Level Requirements Card */}
              <div className="roblox-card p-6 border border-white/10 bg-[#232527]">
                <h3 className="font-extrabold text-sm text-white uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#f5c147]" />
                  Nivåkrav & Titlar
                </h3>

                <div className="space-y-2.5">
                  {LEVEL_TIERS.map((tier) => (
                    <div
                      key={tier.level}
                      className="p-3 rounded-xl bg-[#191b1d] border border-white/5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{tier.badge}</span>
                        <div>
                          <h4 className="font-bold text-xs text-white">{tier.title}</h4>
                          <span className="text-[10px] text-gray-400">
                            {tier.minStars} – {tier.maxStars === 9999 ? '∞' : tier.maxStars} stjärnor
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-black bg-[#f5c147]/10 text-[#f5c147] px-2 py-0.5 rounded border border-[#f5c147]/20">
                        Nivå {tier.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* COLUMN 2: Community / Topplista (Leaderboard) */}
            <div className="lg:col-span-4">
              <Leaderboard
                players={players}
                activePlayer={activePlayer}
                onSelectPlayer={(p) => setActivePlayer(p)}
              />
            </div>

            {/* COLUMN 3: Lagstatistik (Team Stats) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Team Stats Summary Card */}
              <div className="roblox-card p-6 border border-white/10 bg-[#232527]">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white uppercase tracking-wide">
                      Lagstatistik • P18
                    </h3>
                    <p className="text-xs text-gray-400">Laget tillsammans</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3.5 rounded-xl bg-[#191b1d] border border-white/5 text-center">
                    <span className="text-2xl font-black text-[#f5c147] block">
                      {teamTotalStars}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Lagets Stjärnor
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#191b1d] border border-white/5 text-center">
                    <span className="text-2xl font-black text-[#00b06f] block">
                      {players.length}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Aktiva Spelare
                    </span>
                  </div>
                </div>

                {/* Quick Link to Player Login Dynamic Routes */}
                <div className="p-4 rounded-xl bg-[#191b1d] border border-white/5">
                  <h4 className="font-bold text-xs text-gray-200 mb-1">Direktinloggning för spelare</h4>
                  <p className="text-[11px] text-gray-400 mb-3">
                    Alla spelare kan logga in på sin egen sida: <code className="text-[#00b06f]">/spelare/[namn]</code>
                  </p>
                  {activePlayer && (
                    <Link
                      href={`/spelare/${activePlayer.username}`}
                      className="w-full py-2 px-3 roblox-btn-secondary text-xs font-bold flex items-center justify-center gap-2 text-[#00b06f] border-[#00b06f]/30"
                    >
                      <span>Gå till min spelarsida ({activePlayer.name})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Roster Quick Preview */}
              <div className="roblox-card p-6 border border-white/10 bg-[#232527] flex-1">
                <h3 className="font-extrabold text-sm text-white uppercase tracking-wide mb-3">
                  Spelartrupp Snapshot
                </h3>
                <div className="grid grid-cols-4 gap-2 max-h-[220px] overflow-y-auto pr-1">
                  {players.slice(0, 16).map((p) => (
                    <Link
                      key={p.id}
                      href={`/spelare/${p.username}`}
                      className="p-1.5 rounded-xl bg-[#191b1d] border border-white/5 hover:border-[#00b06f]/40 flex flex-col items-center text-center group transition-all"
                      title={p.name}
                    >
                      <img src={p.avatarUrl} alt={p.name} className="w-8 h-8 object-contain mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-[9px] font-semibold text-gray-300 truncate w-full">
                        {p.name.split(' ')[0]}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>

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
