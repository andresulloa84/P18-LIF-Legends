'use client';

import React from 'react';
import Link from 'next/link';
import { Home, User, Users, Dumbbell, Shield } from 'lucide-react';

interface SideBarProps {
  onOpenDrills?: () => void;
  isCoach?: boolean;
}

export default function SideBar({ onOpenDrills, isCoach = false }: SideBarProps) {
  return (
    <aside className="fixed left-0 top-16 bottom-0 z-30 w-16 bg-[#191b1d] border-r border-white/10 hidden md:flex flex-col items-center py-6 gap-6">
      <Link
        href="/"
        title="Hem"
        className="w-10 h-10 rounded-xl bg-[#232527] border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#00b06f] hover:border-[#00b06f]/50 hover:bg-[#2b2d31] transition-all group"
      >
        <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </Link>

      <button
        onClick={onOpenDrills}
        title="Övningar"
        className="w-10 h-10 rounded-xl bg-[#232527] border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#f5c147] hover:border-[#f5c147]/50 hover:bg-[#2b2d31] transition-all group"
      >
        <Dumbbell className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>

      <a
        href="#topplista"
        title="Truppen & Topplista"
        className="w-10 h-10 rounded-xl bg-[#232527] border border-white/10 flex items-center justify-center text-gray-300 hover:text-blue-400 hover:border-blue-400/50 hover:bg-[#2b2d31] transition-all group"
      >
        <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </a>

      {isCoach && (
        <Link
          href="/tranare"
          title="Tränarpanel"
          className="w-10 h-10 rounded-xl bg-[#00b06f]/10 border border-[#00b06f]/40 flex items-center justify-center text-[#00b06f] hover:bg-[#00b06f]/20 transition-all group"
        >
          <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </Link>
      )}
    </aside>
  );
}
