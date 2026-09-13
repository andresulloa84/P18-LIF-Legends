'use client';

import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-between p-6 md:p-12 overflow-hidden select-none font-sans">
      {/* 1. Full-Screen Background Image (landing-poster.jpg) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/landing-poster.jpg"
          alt="Lycksele Fotboll Legends Landing Poster"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle vignette for readability of title and button */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />
      </div>

      {/* 2. Game Logo Overlay at the Top */}
      <div className="relative z-10 text-center max-w-4xl pt-4">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-robloxGold to-amber-500 drop-shadow-[0_6px_12px_rgba(0,0,0,1)] uppercase">
          LYCKSELE FOTBOLL
        </h1>
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 via-robloxCyan to-blue-500 drop-shadow-[0_6px_12px_rgba(0,0,0,1)] uppercase -mt-2">
          LEGENDS
        </h2>

        <div className="mt-3 inline-block bg-black/70 backdrop-blur-sm border-2 border-white/20 px-6 py-2 rounded-full shadow-2xl">
          <span className="text-sm md:text-xl font-black text-white tracking-widest uppercase">
            JOIN THE ACTION! PLAY NOW!
          </span>
        </div>
      </div>

      {/* 3. Big Green Glowing SPELA NU! Button at the Bottom */}
      <div className="relative z-10 w-full max-w-md pb-6 text-center">
        <Link
          href="/hub"
          className="w-full roblox-btn-green py-5 text-2xl md:text-4xl font-black tracking-wider uppercase flex items-center justify-center space-x-3 shadow-roblox-glow group transform hover:scale-105 active:scale-95 transition-all"
        >
          <span>SPELA NU!</span>
          <span className="text-3xl md:text-4xl group-hover:translate-x-2 transition-transform">⚽</span>
        </Link>
      </div>
    </div>
  );
}
