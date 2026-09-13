'use client';

import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-robloxNavy flex flex-col items-center justify-center p-4 overflow-hidden font-sans">
      {/* Background Stadium Poster Artwork */}
      <div className="absolute inset-0 z-0">
        <img
          src="/landing-poster.jpg"
          alt="Lycksele Fotboll Legends Roblox Poster"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-robloxNavy via-black/40 to-black/30" />
      </div>

      {/* Decorative Glow Overlays */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-robloxBlue/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Foreground Content */}
      <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center justify-between min-h-[85vh] py-8">
        
        {/* Top Header Badge */}
        <div className="inline-flex items-center space-x-2 bg-black/70 backdrop-blur-md border-3 border-robloxGold px-5 py-2 rounded-full shadow-gold-glow animate-pulse">
          <span className="text-xl">🏆</span>
          <span className="font-black text-xs md:text-sm text-robloxGold tracking-widest uppercase">
            LYCKSELE FOTBOLL LEGENDS • FUTTEY P18
          </span>
        </div>

        {/* Center Title Logo Banner */}
        <div className="my-auto space-y-4">
          <div className="relative inline-block">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-robloxGold to-amber-500 drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)] uppercase">
              LYCKSELE FOTBOLL
            </h1>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 via-robloxCyan to-blue-500 drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)] uppercase -mt-2">
              LEGENDS
            </h2>
          </div>

          <div className="bg-black/60 backdrop-blur-sm border-2 border-white/20 px-6 py-2 rounded-2xl inline-block shadow-lg">
            <span className="text-sm md:text-xl font-black text-white tracking-widest uppercase">
              JOIN THE ACTION! PLAY NOW!
            </span>
          </div>
        </div>

        {/* Bottom CTA Button Section */}
        <div className="w-full max-w-md space-y-4">
          <Link
            href="/hub"
            className="w-full roblox-btn-green py-5 text-2xl md:text-3xl font-black tracking-wider uppercase flex items-center justify-center space-x-3 shadow-roblox-glow group transform hover:scale-105 transition-all"
          >
            <span>SPELA NU!</span>
            <span className="text-3xl group-hover:translate-x-2 transition-transform">⚽</span>
          </Link>

          <div className="flex justify-center items-center space-x-4 text-xs font-bold text-slate-300 bg-black/60 py-2 px-4 rounded-xl border border-white/10">
            <span>🎮 Roblox Edition</span>
            <span>•</span>
            <span>⭐ Teknikövningar</span>
            <span>•</span>
            <span>🏆 P18 Truppen</span>
          </div>
        </div>

      </div>
    </div>
  );
}
