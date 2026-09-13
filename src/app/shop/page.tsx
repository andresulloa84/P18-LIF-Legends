'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';

export default function ShopPage() {
  const { stats, shopItems, buyItem, equipItem } = useGame();

  const handleBuy = (item: any) => {
    const success = buyItem(item);
    if (success) {
      alert(`🎉 Grattis! Du låste upp: ${item.name}!`);
    } else {
      alert(`❌ Du har inte tillräckligt med mynt (💰). Träna fler teknikövningar!`);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-robloxDark via-robloxCard to-robloxNavy border-4 border-robloxBorder rounded-3xl p-6 md:p-8 shadow-roblox-card flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-robloxCyan tracking-wider">
            BOLL & GEAR-AFFÄR 🛒
          </h1>
          <p className="text-sm md:text-base text-slate-300 font-medium mt-1">
            Använd dina intjänade mynt (💰) för att låsa upp unika fotbollar och titlar!
          </p>
        </div>

        {/* Current Coin Balance */}
        <div className="bg-black/60 border-3 border-black p-4 rounded-2xl flex items-center space-x-3 shadow-roblox-btn-sm shrink-0">
          <span className="text-3xl">💰</span>
          <div>
            <span className="text-xs font-black text-slate-400 block uppercase">DITT SALDO</span>
            <span className="text-2xl font-black text-emerald-400">{stats.coins} MYNT</span>
          </div>
        </div>
      </div>

      {/* Shop Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {shopItems.map((item) => {
          const isUnlocked = item.unlocked;
          const isEquipped =
            item.type === 'ball'
              ? stats.equippedBall === item.id
              : stats.equippedTitle === item.id;

          return (
            <div
              key={item.id}
              className={`roblox-card flex flex-col justify-between ${
                isEquipped ? 'border-robloxGold shadow-gold-glow' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-lg border border-black bg-robloxNavy text-robloxCyan uppercase">
                    {item.type === 'ball' ? '⚽ FOTBOLL' : '👑 TITEL'}
                  </span>
                  {isEquipped && (
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-lg border border-black bg-robloxGold text-black animate-pulse">
                      VALD / ANVÄNDS
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-3 my-2">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800 border-3 border-black flex items-center justify-center text-4xl shadow-roblox-btn-sm shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">{item.name}</h3>
                    <p className="text-xs text-slate-300 mt-0.5">{item.description}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-robloxBorder">
                {isUnlocked ? (
                  <button
                    onClick={() => {
                      if (item.type === 'ball' || item.type === 'title') {
                        equipItem(item.id, item.type);
                      }
                    }}
                    disabled={isEquipped}
                    className={`w-full py-2.5 text-xs font-black uppercase tracking-wider ${
                      isEquipped
                        ? 'bg-slate-700 text-slate-400 border-2 border-black rounded-xl cursor-default'
                        : 'roblox-btn-blue'
                    }`}
                  >
                    {isEquipped ? 'VALD FOTBOLL' : 'VÄLJ KAMPION ➔'}
                  </button>
                ) : (
                  <button
                    onClick={() => handleBuy(item)}
                    className="w-full roblox-btn-gold py-2.5 text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2"
                  >
                    <span>LÅS UPP</span>
                    <span className="bg-black/60 px-2 py-0.5 rounded-lg text-emerald-400 font-extrabold border border-black">
                      {item.price} 💰
                    </span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
