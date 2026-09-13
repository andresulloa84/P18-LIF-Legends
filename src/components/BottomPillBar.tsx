'use client';

import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function BottomPillBar() {
  return (
    <footer className="w-full bg-[#191b1d] border-t border-white/10 py-3 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-gray-300">
        
        {/* Links matching screenshot bottom bar */}
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-[#00b06f] transition-colors">
            Friome
          </Link>
          <span className="hover:text-[#00b06f] cursor-pointer transition-colors">
            Roblox
          </span>
          <a href="#topplista" className="hover:text-[#00b06f] transition-colors">
            Teams
          </a>
        </div>

        {/* Bottom Search Pill */}
        <div className="flex items-center gap-2 bg-[#232527] px-4 py-1.5 rounded-full border border-white/10">
          <Search className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-400 font-medium">Search</span>
        </div>

      </div>
    </footer>
  );
}
