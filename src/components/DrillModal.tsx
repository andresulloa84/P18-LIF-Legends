'use client';

import React, { useState } from 'react';
import { X, Lock, CheckCircle, Video, Sparkles } from 'lucide-react';
import { Drill, Player } from '@/lib/initialData';

interface DrillModalProps {
  isOpen: boolean;
  onClose: () => void;
  drills: Drill[];
  activePlayer: Player | null;
  onLogActivity: (drillId: string) => { leveledUp: boolean; newLevel?: number; newLevelTitle?: string };
}

export default function DrillModal({
  isOpen,
  onClose,
  drills,
  activePlayer,
  onLogActivity,
}: DrillModalProps) {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [activeDrillTitle, setActiveDrillTitle] = useState<string | null>(null);
  const [levelUpMessage, setLevelUpMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const playerLevel = activePlayer ? activePlayer.currentLevel : 1;

  const handleLog = (drill: Drill) => {
    const res = onLogActivity(drill.id);
    
    if (res.leveledUp) {
      setLevelUpMessage(`🎉 GRATTIS! Du har samlat tillräckligt med bollar och nått ${res.newLevelTitle}! 🎉`);
    } else {
      setSuccessToast(`+1 Boll samlad för ${drill.title}! ⚽`);
      setTimeout(() => setSuccessToast(null), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      
      {/* Main Modal Container */}
      <div className="roblox-card w-full max-w-4xl bg-[#191b1d] border border-white/20 shadow-2xl overflow-hidden my-4 sm:my-8">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#232527] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00b06f] flex items-center justify-center text-white text-xl font-black">
              ⚽
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-black text-white uppercase tracking-wide">
                Bollmästarna • Uppgifter & Övningar
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-400 font-medium">
                Klara uppgifter för att samla bollar och låsa upp nya nivåer!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#191b1d] text-gray-400 hover:text-white hover:bg-red-500/20 transition-all"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Level Up Banner Alert */}
        {levelUpMessage && (
          <div className="p-3 sm:p-4 bg-gradient-to-r from-[#00b06f] via-[#00e676] to-[#f5c147] text-black font-black text-center text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg animate-bounce">
            <Sparkles className="w-5 h-5" />
            <span>{levelUpMessage}</span>
            <button
              onClick={() => setLevelUpMessage(null)}
              className="ml-3 px-3 py-1 bg-black text-white rounded-lg text-xs font-bold uppercase"
            >
              Tack!
            </button>
          </div>
        )}

        {/* Success Toast */}
        {successToast && (
          <div className="p-3 bg-[#00b06f] text-white font-black text-center text-xs sm:text-sm flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Drills List Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
          {drills.map((drill) => {
            const isLocked = drill.requiredLevel > playerLevel;

            return (
              <div
                key={drill.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isLocked
                    ? 'bg-[#191b1d]/60 border-white/5 opacity-60 grayscale'
                    : 'bg-[#232527] border-white/10 hover:border-[#00b06f]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#00b06f] bg-[#00b06f]/10 px-2.5 py-1 rounded-md border border-[#00b06f]/20">
                      {drill.category}
                    </span>

                    {isLocked ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                        <Lock className="w-3 h-3" /> Nivå {drill.requiredLevel} krävs
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-white bg-[#00b06f]/20 px-2.5 py-0.5 rounded border border-[#00b06f]/30">
                        ⚽ +{drill.ballsReward} Boll
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-sm sm:text-base text-white mb-1 sm:mb-2">{drill.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed font-normal mb-3">
                    {drill.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                  <button
                    onClick={() => {
                      setSelectedVideoUrl(drill.videoUrl);
                      setActiveDrillTitle(drill.title);
                    }}
                    className="flex-1 py-2 px-3 roblox-btn-secondary text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Video className="w-3.5 h-3.5 text-blue-400" />
                    <span>Se instruktion</span>
                  </button>

                  <button
                    disabled={isLocked}
                    onClick={() => handleLog(drill)}
                    className={`flex-1 py-2 px-3 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                      isLocked
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed rounded-xl'
                        : 'roblox-btn-primary'
                    }`}
                  >
                    <span>Samla boll (+1 ⚽)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-[#232527] border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-gray-400 gap-2">
          <span>Aktiv Spelare: <strong className="text-white">{activePlayer?.name}</strong></span>
          <span>Bollar: <strong className="text-[#00b06f]">⚽ {activePlayer?.totalBalls}</strong></span>
        </div>

      </div>

      {/* Video Popup */}
      {selectedVideoUrl && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 bg-black/90 backdrop-blur-lg">
          <div className="roblox-card w-full max-w-3xl bg-[#191b1d] border border-white/20 overflow-hidden">
            <div className="p-3 sm:p-4 bg-[#232527] border-b border-white/10 flex items-center justify-between">
              <h3 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-blue-400" />
                Instruktionsvideo: {activeDrillTitle}
              </h3>
              <button
                onClick={() => setSelectedVideoUrl(null)}
                className="p-1 rounded-lg bg-[#191b1d] text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full">
              <iframe
                src={selectedVideoUrl}
                title={activeDrillTitle || 'Video instruction'}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
