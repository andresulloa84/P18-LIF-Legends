'use client';

import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <Link
      href="/hub"
      className="relative min-h-screen w-full bg-black flex flex-col items-center justify-end p-6 md:p-12 overflow-hidden select-none cursor-pointer group"
    >
      {/* 1. Ultra-Clean Full-Screen Background Image (landing-poster.jpg) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/landing-poster.jpg"
          alt="Lycksele Fotboll Legends Roblox Poster"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 2. Clean Subtle SPELA Button at the Bottom */}
      <div className="relative z-10 w-full max-w-md pb-6 text-center">
        <div className="w-full roblox-btn-green py-5 text-2xl md:text-3xl font-black tracking-wider uppercase flex items-center justify-center space-x-3 shadow-roblox-glow group-hover:brightness-110 transition-all">
          <span>SPELA NU!</span>
          <span className="text-3xl group-hover:translate-x-2 transition-transform">⚽</span>
        </div>
      </div>
    </Link>
  );
}
