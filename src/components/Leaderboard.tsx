'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trophy, Star, Search, ShieldCheck, ChevronRight, UserCheck } from 'lucide-react';
import { Player } from '@/lib/initialData';

interface LeaderboardProps {
  players: Player[];
  activePlayer: Player | null;
  onSelectPlayer: (player: Player) => void;
}

export default function Leaderboard({ players, activePlayer, onSelectPlayer }: LeaderboardProps) {
  const [filterText, setFilterText] = useState('');

  // Sort players by totalStars descending
  const sortedPlayers = [...players].sort((a, b) => b.totalStars - a.totalStars);

  const filteredPlayers = sortedPlayers.filter(p =>
    p.name.toLowerCase().includes(filterText.toLowerCase()) ||
    p.username.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div id="topplista" className="roblox-card p-6 border border-white/10 bg-[#232527] h-full flex flex-col">
      
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white uppercase tracking-wide">
              Topplista • Truppen (34)
            </h2>
            <p className="text-xs text-gray-400 font-medium">
              Live ranking baserad på samlade bollmästartillfällen
            </p>
          </div>
        </div>

        <span className="text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full">
          P18 Trupp
        </span>
      </div>

      {/* Filter Input */}
      <div className="relative mb-4">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Sök spelare i truppen..."
          className="w-full bg-[#191b1d] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#00b06f] transition-colors"
        />
      </div>

      {/* Player Leaderboard List */}
      <div className="space-y-2.5 overflow-y-auto max-h-[500px] pr-1 flex-1">
        {filteredPlayers.map((player, index) => {
          const isCurrentActive = activePlayer?.id === player.id;
          const rank = index + 1;

          // Rank icon badges
          let rankBadge = <span className="font-extrabold text-xs text-gray-400 w-6 text-center">{rank}</span>;
          if (rank === 1) rankBadge = <span className="text-lg">🥇</span>;
          if (rank === 2) rankBadge = <span className="text-lg">🥈</span>;
          if (rank === 3) rankBadge = <span className="text-lg">🥉</span>;

          return (
            <div
              key={player.id}
              onClick={() => onSelectPlayer(player)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                isCurrentActive
                  ? 'bg-gradient-to-r from-[#00b06f]/20 to-[#232527] border-[#00b06f]'
                  : 'bg-[#191b1d] border-white/5 hover:border-white/20 hover:bg-[#2b2d31]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Rank */}
                <div className="flex items-center justify-center flex-shrink-0">
                  {rankBadge}
                </div>

                {/* Avatar */}
                <div className="w-10 h-10 rounded-lg bg-[#2b2d31] p-0.5 border border-white/10 flex-shrink-0">
                  <img src={player.avatarUrl} alt={player.name} className="w-full h-full object-contain" />
                </div>

                {/* Info */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs text-white truncate">{player.name}</h4>
                    {isCurrentActive && (
                      <span className="text-[10px] font-black bg-[#00b06f] text-white px-1.5 py-0.2 rounded">
                        DU
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium block truncate">
                    {player.levelTitle}
                  </span>
                </div>
              </div>

              {/* Stars & Quick Link */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="flex items-center gap-1 bg-[#232527] px-2.5 py-1 rounded-lg border border-[#f5c147]/20">
                  <Star className="w-3.5 h-3.5 text-[#f5c147] fill-[#f5c147]" />
                  <span className="font-extrabold text-xs text-[#f5c147]">
                    {player.totalStars}
                  </span>
                </div>

                <Link
                  href={`/spelare/${player.username}`}
                  onClick={(e) => e.stopPropagation()}
                  title="Gå till spelarsida"
                  className="p-1 rounded-md bg-[#232527] text-gray-400 hover:text-white hover:bg-[#00b06f]/20 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
