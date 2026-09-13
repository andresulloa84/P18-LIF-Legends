'use client';

import React, { useState } from 'react';
import { X, Shield, KeyRound, AlertCircle } from 'lucide-react';
import { useAppStore } from '@/lib/store';

interface CoachLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CoachLoginModal({ isOpen, onClose, onSuccess }: CoachLoginModalProps) {
  const { loginCoach } = useAppStore();
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginCoach(password)) {
      setErrorMsg('');
      onSuccess();
    } else {
      setErrorMsg('Felaktigt tränarlösenord. Försök igen.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="roblox-card w-full max-w-md bg-[#191b1d] border border-white/20 shadow-2xl p-6 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-[#232527] text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#00b06f]/20 border border-[#00b06f]/40 flex items-center justify-center text-[#00b06f]">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white uppercase tracking-wide">
              Tränarinloggning
            </h3>
            <p className="text-xs text-gray-400">
              Logga in för att hantera truppen och redigera övningar
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-xs font-bold text-red-400">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
              Tränarlösenord
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Skriv lösenord..."
                className="w-full bg-[#232527] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00b06f] transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 roblox-btn-primary text-sm font-extrabold uppercase tracking-wider shadow-lg"
          >
            Logga in som Tränare
          </button>
        </form>

        <p className="mt-4 text-[11px] text-gray-500 text-center">
          Demolösenord: <code className="text-[#00b06f]">legend</code> eller <code className="text-[#00b06f]">p18</code>
        </p>

      </div>
    </div>
  );
}
