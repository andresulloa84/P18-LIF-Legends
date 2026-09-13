'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SideBarProps {
  onOpenDrills?: () => void;
  isCoach?: boolean;
}

export default function SideBar({ onOpenDrills, isCoach }: SideBarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'ÖVNINGAR', icon: '⚽' },
    { href: '/topplista', label: 'TOPPLISTA', icon: '🏆' },
    { href: '/shop', label: 'BOLL-AFFÄR', icon: '🛒' },
    { href: '/profil', label: 'MIN PROFIL', icon: '👤' },
  ];

  if (isCoach) {
    navItems.push({ href: '/tranare', label: 'TRÄNARE', icon: '📋' });
  }

  return (
    <aside className="w-full md:w-64 bg-robloxDark border-r-4 border-robloxBorder p-4 flex flex-row md:flex-col justify-around md:justify-start space-x-2 md:space-x-0 md:space-y-4 shadow-2xl z-20">
      {/* Mobile / Small Header label */}
      <div className="hidden md:block mb-2">
        <h2 className="text-xs font-black text-robloxBlue uppercase tracking-widest px-2">
          ROBLOX NAVIGERING
        </h2>
      </div>

      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 md:flex-initial flex items-center justify-center md:justify-start space-x-3 px-4 py-3 rounded-2xl font-black text-sm md:text-base border-3 border-black transition-all active:translate-y-1 ${
              isActive
                ? 'bg-gradient-to-r from-robloxBlue to-blue-600 text-white shadow-roblox-btn translate-x-1'
                : 'bg-robloxCard text-slate-300 hover:bg-robloxBorder hover:text-white shadow-roblox-btn-sm'
            }`}
          >
            <span className="text-xl md:text-2xl">{item.icon}</span>
            <span className="hidden sm:inline tracking-wider">{item.label}</span>
          </Link>
        );
      })}

      {/* Roblox Daily Quest Card (Sidebar Footer) */}
      <div className="hidden md:block mt-auto bg-gradient-to-b from-robloxCard to-robloxNavy border-3 border-black rounded-2xl p-4 text-center shadow-roblox-card relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-robloxRed text-white text-[10px] font-black px-2 py-0.5 rounded-bl-lg">
          DAGENS UPPDRAG
        </div>
        <div className="text-3xl mb-1 mt-1">🎯</div>
        <h3 className="text-xs font-black text-white">Gör 2 Brons-övningar</h3>
        <p className="text-[11px] text-slate-400 mt-0.5 mb-2">Belöning: +50 💰 extra</p>
        <div className="w-full bg-black/50 rounded-full h-2 border border-black overflow-hidden">
          <div className="bg-robloxGold h-full w-1/2" />
        </div>
      </div>
    </aside>
  );
}
