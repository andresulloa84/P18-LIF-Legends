'use client';

import React, { useState } from 'react';
import { X, Lock, Play, Star, CheckCircle, Video, Award, Sparkles } from 'lucide-react';
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
      setLevelUpMessage(`🎉 GRATTIS! Du har nått ${res.newLevelTitle}! 🎉`);
    } else {
      setSuccessToast(`+1 Stjärna registrerad för ${drill.title}! ⭐`);
      setTimeout(() => setSuccessToast(null), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      
      {/* Main Modal Container */}
      <div className="roblox-card w-full max-w-4xl bg-[#191b1d] border border-white/20 shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="p-5 bg-[#232527] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00b06f] flex items-center justify-center text-white font-black text-xl">
              ⚽
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-wide">
                Bollmästarna • Övningscenter
              </h2>
              <p className="text-xs text-gray-400 font-medium">
                Välj en övning, träna och samla stjärnor för att nå nästa nivå!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#191b1d] text-gray-400 hover:text-white hover:bg-red-500/20 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Level Up Banner Alert */}
        {levelUpMessage && (
          <div className="p-4 bg-gradient-to-r from-[#f5c147] to-[#e0a82e] text-black font-black text-center text-base sm:text-lg flex items-center justify-center gap-3 shadow-lg animate-bounce">
            <Sparkles className="w-6 h-6" />
            <span>{levelUpMessage}</span>
            <button
              onClick={() => setLevelUpMessage(null)}
              className="ml-4 px-3 py-1 bg-black text-white rounded-lg text-xs font-bold uppercase"
            >
              Tack!
            </button>
          </div>
        )}

        {/* Success Toast */}
        {successToast && (
          <div className="p-3 bg-[#00b06f] text-white font-black text-center text-sm flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Drills List Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[65vh] overflow-y-auto">
          {drills.map((drill) => {
            const isLocked = drill.requiredLevel > playerLevel;

            return (
              <div
                key={drill.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isLocked
                    ? 'bg-[#191b1d]/60 border-white/5 opacity-60 grayscale'
                    : 'bg-[#232527] border-white/10 hover:border-[#00b06f]/50 hover:shadow-lg'
                }`}
              >
                <div>
                  {/* Category & Lock Status */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#00b06f] bg-[#00b06f]/10 px-2.5 py-1 rounded-md border border-[#00b06f]/20">
                      {drill.category}
                    </span>

                    {isLocked ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-md border border-red-500/20">
                        <Lock className="w-3.5 h-3.5" /> Låses upp på Nivå {drill.requiredLevel}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-[#f5c147] bg-[#f5c147]/10 px-2.5 py-1 rounded-md border border-[#f5c147]/20">
                        <Star className="w-3.5 h-3.5 fill-[#f5c147]" /> +{drill.starsReward} Stjärna
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-extrabold text-base text-white mb-2">{drill.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed font-normal mb-4">
                    {drill.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                  {/* Video Tutorial Button */}
                  <button
                    onClick={() => {
                      setSelectedVideoUrl(drill.videoUrl);
                      setActiveDrillTitle(drill.title);
                    }}
                    className="flex-1 py-2.5 px-3 roblox-btn-secondary text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Video className="w-4 h-4 text-blue-400" />
                    <span>Se instruktion</span>
                  </button>

                  {/* Log Activity Button */}
                  <button
                    disabled={isLocked}
                    onClick={() => handleLog(drill)}
                    className={`flex-1 py-2.5 px-3 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                      isLocked
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed rounded-xl'
                        : 'roblox-btn-primary'
                    }`}
                  >
                    <Star className="w-4 h-4 fill-white" />
                    <span>Logga (+1 ⭐)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#232527] border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span>Aktiv Spelare: <strong className="text-white">{activePlayer?.name}</strong></span>
          <span>Nivå: <strong className="text-[#00b06f]">{activePlayer?.levelTitle}</strong></span>
        </div>

      </div>

      {/* Video Tutorial Modal Popup */}
      {selectedVideoUrl && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
          <div className="roblox-card w-full max-w-3xl bg-[#191b1d] border border-white/20 overflow-hidden">
            <div className="p-4 bg-[#232527] border-b border-white/10 flex items-center justify-between">
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-blue-400" />
                Instruktionsvideo: {activeDrillTitle}
              </h3>
              <button
                onClick={() => setSelectedVideoUrl(null)}
                className="p-1.5 rounded-lg bg-[#191b1d] text-gray-400 hover:text-white"
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
