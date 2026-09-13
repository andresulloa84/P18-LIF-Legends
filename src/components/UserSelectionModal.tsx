'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/context/GameContext';

export interface SquadPlayer {
  id: string;
  name: string;
  username: string;
  avatar: string;
  balls: number;
}

const SQUAD_PLAYERS: SquadPlayer[] = [
  { id: 'maxy', name: 'Maxy', username: 'Maxy', avatar: '🎮', balls: 15 },
  { id: 'zlatan', name: 'Zlatan_Roblox', username: 'Zlatan_Roblox', avatar: '🦁', balls: 27 },
  { id: 'teo', name: 'Teo Ahrling', username: 'Teo', avatar: '⚽', balls: 12 },
  { id: 'jarmo', name: 'Jarmo Ahonen', username: 'Jarmo', avatar: '⚡', balls: 10 },
  { id: 'yasser', name: 'Yasser Mohammed', username: 'Yasser', avatar: '🔥', balls: 14 },
  { id: 'kalle', name: 'Kalle Fotboll', username: 'Kalle', avatar: '🏆', balls: 19 },
  { id: 'emma', name: 'Emma Striker', username: 'Emma', avatar: '💎', balls: 15 },
  { id: 'hugo', name: 'Hugo Dribbler', username: 'Hugo', avatar: '🧱', balls: 12 },
];

interface UserSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserSelectionModal({ isOpen, onClose }: UserSelectionModalProps) {
  const router = useRouter();
  const { stats } = useGame();

  const [selectedPlayer, setSelectedPlayer] = useState<SquadPlayer | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSelectPlayer = (player: SquadPlayer) => {
    setSelectedPlayer(player);
    setPasswordInput('');
    setNewPasswordInput('');
    setIsChangingPassword(false);
    setErrorMessage('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlayer) return;

    // Password validation: Default password LIF18 (or stored password)
    const storedPass = localStorage.getItem(`pass_${selectedPlayer.id}`) || 'LIF18';

    if (passwordInput.toUpperCase() === storedPass.toUpperCase()) {
      if (storedPass === 'LIF18' && !isChangingPassword) {
        // Offer optional password change on first login
        setIsChangingPassword(true);
        setErrorMessage('');
      } else {
        // Successful login
        if (newPasswordInput.trim()) {
          localStorage.setItem(`pass_${selectedPlayer.id}`, newPasswordInput.trim());
        }
        alert(`🎮 Välkommen ${selectedPlayer.name}! Du är nu inloggad.`);
        onClose();
        router.push('/ovningar');
      }
    } else {
      setErrorMessage('Fel lösenord! Standardlösenordet är LIF18.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-robloxDark border-4 border-black rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-roblox-card relative my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-robloxRed text-white font-black border-2 border-black flex items-center justify-center text-xl shadow-roblox-btn-sm hover:scale-105"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🎮</div>
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider">
            VÄLJ DIN SPELARE
          </h2>
          <p className="text-xs md:text-sm text-slate-300 font-medium mt-1">
            Lycksele Fotboll Legends P18 • Standardlösenord: <code className="text-robloxCyan font-black">LIF18</code>
          </p>
        </div>

        {/* Player Selection Grid */}
        {!selectedPlayer ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {SQUAD_PLAYERS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectPlayer(p)}
                className="bg-robloxCard border-3 border-black rounded-2xl p-3 text-center flex flex-col items-center hover:border-robloxCyan hover:-translate-y-1 transition-all shadow-roblox-btn-sm group"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-800 border-2 border-black flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">
                  {p.avatar}
                </div>
                <span className="font-black text-xs text-white truncate max-w-full">{p.name}</span>
                <span className="text-[10px] text-robloxGold font-bold mt-0.5">{p.balls} ⚽</span>
              </button>
            ))}
          </div>
        ) : (
          /* Password Form for Selected Player */
          <div className="bg-robloxCard border-3 border-black rounded-2xl p-5 text-center">
            
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border-2 border-black flex items-center justify-center text-2xl">
                {selectedPlayer.avatar}
              </div>
              <div className="text-left">
                <h3 className="font-black text-lg text-white">{selectedPlayer.name}</h3>
                <span className="text-xs text-slate-400">@ {selectedPlayer.username}</span>
              </div>
              <button
                onClick={() => setSelectedPlayer(null)}
                className="text-xs font-bold text-robloxCyan underline ml-auto"
              >
                Byt Spelare
              </button>
            </div>

            {errorMessage && (
              <div className="mb-4 p-2.5 bg-rose-500/20 border-2 border-rose-500 text-rose-300 rounded-xl text-xs font-black">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-black text-slate-300 block mb-1 uppercase">
                  SKRIV DITT LÖSENORD:
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="LIF18"
                  className="w-full bg-robloxNavy border-2 border-black rounded-xl p-3 text-center text-white font-black text-lg focus:outline-none focus:border-robloxCyan"
                  required
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  💡 Standardlösenordet är <code className="text-robloxGold font-black">LIF18</code>
                </p>
              </div>

              {/* Password Change Option on First Login */}
              {isChangingPassword && (
                <div className="bg-robloxNavy/80 border-2 border-robloxGold p-3 rounded-xl">
                  <label className="text-xs font-black text-robloxGold block mb-1 uppercase">
                    VÄLJ NYTT LÖSENORD (VALFRITT):
                  </label>
                  <input
                    type="password"
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    placeholder="Skriv nytt lösenord"
                    className="w-full bg-robloxCard border-2 border-black rounded-xl p-2.5 text-center text-white font-bold text-sm"
                  />
                  <p className="text-[10px] text-slate-300 mt-1">
                    Du kan ändra ditt lösenord från LIF18 till ett eget lösenord.
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full roblox-btn-green py-3 text-base font-black uppercase tracking-wider shadow-roblox-glow"
              >
                {isChangingPassword ? 'SPARA & FORTSÄTT TO GAME! ⚽' : 'LOGGA IN & SPELA! ➔'}
              </button>
            </form>

          </div>
        )}

      </div>
    </div>
  );
}
