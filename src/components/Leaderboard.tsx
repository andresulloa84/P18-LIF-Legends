'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, ChevronDown } from 'lucide-react';
import { Player } from '@/lib/initialData';

interface LeaderboardProps {
  players: Player[];
  activePlayer: Player | null;
  onSelectPlayer: (player: Player) => void;
}

export default function Leaderboard({ players, activePlayer, onSelectPlayer }: LeaderboardProps) {
  const [filterText, setFilterText] = useState('');

  // Sort players by totalBalls descending
  const sortedPlayers = [...players].sort((a, b) => b.totalBalls - a.totalBalls);

  const filteredPlayers = sortedPlayers.filter(p =>
    p.name.toLowerCase().includes(filterText.toLowerCase()) ||
    p.username.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div id="topplista" className="roblox-card p-4 sm:p-5 border border-white/10 bg-[#232527] h-full flex flex-col">
      
      {/* Section Title (Screenshot: Community) */}
      <h2 className="text-xl sm:text-2xl font-black text-white mb-3">
        Community
      </h2>

      {/* Screenshot Accordion Header Card: Ledderboards */}
      <div className="p-3 bg-[#191b1d] rounded-xl border border-white/10 flex items-center justify-between mb-3">
        <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
          <span>Ledderboards</span>
        </h3>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>

      {/* Filter Input */}
      <div className="relative mb-3">
        <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Sök spelare..."
          className="w-full bg-[#191b1d] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#00b06f]"
        />
      </div>

      {/* Player Leaderboard List (Screenshot 1..5 layout) */}
      <div className="space-y-2 overflow-y-auto max-h-[460px] pr-1 flex-1">
        {filteredPlayers.map((player, index) => {
          const isCurrentActive = activePlayer?.id === player.id;
          const rank = index + 1;

          let rankBadge = <span className="font-black text-xs text-gray-400 w-5 text-center">{rank}</span>;
          if (rank === 1) rankBadge = <span className="text-base w-5 text-center">👑</span>;
          if (rank === 2) rankBadge = <span className="text-base w-5 text-center">🏆</span>;
          if (rank === 3) rankBadge = <span className="text-base w-5 text-center">🏆</span>;
          if (rank === 4) rankBadge = <span className="text-base w-5 text-center">🛡️</span>;

          return (
            <div
              key={player.id}
              onClick={() => onSelectPlayer(player)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                isCurrentActive
                  ? 'bg-gradient-to-r from-[#00b06f]/20 to-[#232527] border-[#00b06f]'
                  : 'bg-[#191b1d] border-white/5 hover:border-white/20 hover:bg-[#2b2d31]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Rank Icon */}
                <div className="flex items-center justify-center flex-shrink-0">
                  {rankBadge}
                </div>

                {/* Avatar */}
                <div className="w-8 h-8 rounded-lg bg-[#2b2d31] p-0.5 border border-white/10 flex-shrink-0">
                  <img src={player.avatarUrl} alt={player.name} className="w-full h-full object-contain" />
                </div>

                {/* Name */}
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-white truncate">{player.name}</h4>
                  <span className="text-[10px] text-gray-400 block truncate">@{player.username}</span>
                </div>
              </div>

              {/* Ball Count (Screenshot: 166, 54, 30, 29, 10...) */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-1 bg-[#232527] px-2.5 py-1 rounded-lg border border-white/10">
                  <span className="text-xs">⚽</span>
                  <span className="font-extrabold text-xs text-white">
                    {player.totalBalls}
                  </span>
                </div>

                <Link
                  href={`/spelare/${player.username}`}
                  onClick={(e) => e.stopPropagation()}
                  title="Gå till spelarsida"
                  className="p-1 rounded-md bg-[#232527] text-gray-400 hover:text-white"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
