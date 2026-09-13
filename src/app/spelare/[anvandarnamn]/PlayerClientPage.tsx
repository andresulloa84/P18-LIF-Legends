'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Award, KeyRound, AlertCircle, ShieldCheck } from 'lucide-react';
import TopBar from '@/components/TopBar';
import SideBar from '@/components/SideBar';
import DrillModal from '@/components/DrillModal';
import BottomPillBar from '@/components/BottomPillBar';
import { useAppStore } from '@/lib/store';
import { getLevelTitle } from '@/lib/initialData';

export default function PlayerClientPage({ anvandarnamn }: { anvandarnamn: string }) {
  const {
    isLoaded,
    players,
    drills,
    activePlayer,
    isCoachLoggedIn,
    loginPlayer,
    logDrillActivity,
  } = useAppStore();

  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDrillModalOpen, setIsDrillModalOpen] = useState(false);
  const [isLoggedInThisSession, setIsLoggedInThisSession] = useState(false);

  const player = players.find(
    p => p.username.toLowerCase() === anvandarnamn.toLowerCase() || p.id.toLowerCase() === anvandarnamn.toLowerCase()
  );

  useEffect(() => {
    if (activePlayer && player && activePlayer.id === player.id) {
      setIsLoggedInThisSession(true);
    }
  }, [activePlayer, player]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#191b1d] flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-[#00b06f] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-extrabold text-sm uppercase tracking-wider">Laddar spelarsida...</p>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen bg-[#191b1d] text-white flex flex-col items-center justify-center p-4">
        <div className="roblox-card p-8 max-w-md w-full text-center">
          <span className="text-4xl mb-4 block">⚽</span>
          <h2 className="text-xl font-black text-white mb-2">Spelaren hittades inte</h2>
          <p className="text-xs text-gray-400 mb-6">
            Det finns ingen spelare i truppen med användarnamnet <code className="text-[#00b06f]">{anvandarnamn}</code>.
          </p>
          <Link href="/" className="py-2.5 px-6 roblox-btn-primary text-xs font-bold inline-block">
            Gå tillbaka till Hem
          </Link>
        </div>
      </div>
    );
  }

  const levelInfo = getLevelTitle(player.totalBalls);

  const handlePlayerLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = loginPlayer(player.username, passwordInput);
    if (res.success) {
      setErrorMessage('');
      setIsLoggedInThisSession(true);
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#191b1d] text-white flex flex-col">
      <TopBar
        totalBalls={player.totalBalls}
        activePlayerName={player.name}
        isCoach={isCoachLoggedIn}
        onOpenPlayModal={() => setIsDrillModalOpen(true)}
      />

      <div className="flex-1 flex">
        <SideBar onOpenDrills={() => setIsDrillModalOpen(true)} isCoach={isCoachLoggedIn} />

        <main className="flex-1 md:ml-16 p-4 sm:p-8 max-w-5xl mx-auto w-full">
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white mb-6 bg-[#232527] px-3.5 py-1.5 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4 text-[#00b06f]" />
            Tillbaka till Huvudsidan
          </Link>

          <div className="roblox-card p-6 sm:p-8 border border-white/10 bg-[#232527] mb-8 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
              
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#191b1d] p-2 border-2 border-[#00b06f]/40 flex-shrink-0 shadow-xl">
                <img src={player.avatarUrl} alt={player.name} className="w-full h-full object-contain" />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                  <span className="text-xs font-black bg-[#00b06f]/20 text-[#00b06f] px-2.5 py-0.5 rounded-full border border-[#00b06f]/30">
                    {levelInfo.badge} {levelInfo.title}
                  </span>
                  <span className="text-xs font-bold text-gray-400 bg-[#191b1d] px-2.5 py-0.5 rounded-full border border-white/5">
                    P18 Spelare
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  {player.name}
                </h1>
                
                <p className="text-xs text-gray-400 font-medium mt-1">
                  Användarnamn: <code className="text-[#00b06f] font-bold">@{player.username}</code>
                </p>

                <div className="mt-4 flex items-center justify-center sm:justify-start gap-2">
                  <div className="flex items-center gap-2 bg-[#191b1d] px-4 py-1.5 rounded-xl border border-white/10">
                    <span className="text-lg">⚽</span>
                    <span className="font-black text-base text-white">{player.totalBalls}</span>
                    <span className="text-xs text-gray-400 font-bold uppercase">Bollar samlade</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {!isLoggedInThisSession ? (
            <div className="roblox-card p-6 sm:p-8 max-w-md mx-auto bg-[#232527] border border-white/10 text-center">
              
              <div className="w-12 h-12 rounded-2xl bg-[#00b06f]/20 border border-[#00b06f]/40 flex items-center justify-center text-[#00b06f] mx-auto mb-4">
                <KeyRound className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-black text-white uppercase tracking-wide mb-1">
                Logga in för att samla bollar
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                Skriv ditt lösenord för att genomföra uppgifter och samla fler bollar!
              </p>

              {errorMessage && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs font-bold text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handlePlayerLoginSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Skriv ditt lösenord"
                    className="w-full bg-[#191b1d] border border-white/10 rounded-xl px-4 py-3 text-sm text-white text-center focus:outline-none focus:border-[#00b06f] transition-colors"
                    required
                  />
                  <p className="text-[10px] text-gray-500 mt-1.5">
                    💡 Standardlösenord är ditt användarnamn (<code className="text-gray-400">{player.username}</code>)
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 roblox-btn-primary text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Logga in och spela!</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              
              <div className="roblox-card p-6 bg-gradient-to-r from-[#232527] via-[#191b1d] to-[#232527] border border-[#00b06f]/40 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-black text-[#00b06f] uppercase tracking-wider block mb-1">
                    Redo för nästa bollmästarpass?
                  </span>
                  <h3 className="text-xl font-black text-white">Välj en uppgift och samla +1 boll ⚽!</h3>
                  <p className="text-xs text-gray-400 mt-1">Du har samlat {player.totalBalls} bollar totalt.</p>
                </div>

                <button
                  onClick={() => setIsDrillModalOpen(true)}
                  className="py-3.5 px-8 roblox-btn-primary text-base font-black uppercase tracking-wider flex items-center gap-2 shadow-xl flex-shrink-0"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>▶ Öppna Övningar</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="roblox-card p-5 bg-[#232527]">
                  <h4 className="font-extrabold text-sm text-white mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#00b06f]" />
                    Nuvarande Rang & Nivå
                  </h4>
                  <p className="text-lg font-black text-[#00b06f]">{levelInfo.title}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Nästa nivå kräver totalt {levelInfo.nextLevelMin} bollar.
                  </p>
                </div>

                <div className="roblox-card p-5 bg-[#232527]">
                  <h4 className="font-extrabold text-sm text-white mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    Konto & Status
                  </h4>
                  <p className="text-xs text-gray-300">Status: <strong className="text-[#00b06f]">Inloggad som {player.name}</strong></p>
                  <p className="text-xs text-gray-400 mt-1">Medlem i P18-truppen sedan {player.joinedDate}.</p>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      <BottomPillBar />

      <DrillModal
        isOpen={isDrillModalOpen}
        onClose={() => setIsDrillModalOpen(false)}
        drills={drills}
        activePlayer={player}
        onLogActivity={logDrillActivity}
      />
    </div>
  );
}
