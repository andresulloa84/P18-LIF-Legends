'use client';

import React, { useState, useEffect } from 'react';
import { TEKNIKOVNINGAR, TeknikOvning } from '@/data/teknikovningar';

interface DrillModalProps {
  ovning?: TeknikOvning | null;
  isOpen?: boolean;
  onClose: () => void;
  onComplete?: (starRating: number) => void;
  drills?: any[];
  activePlayer?: any;
  onLogActivity?: (drillId: string) => void;
}

export default function DrillModal({
  ovning: propOvning,
  isOpen = true,
  onClose,
  onComplete,
  drills,
  activePlayer,
  onLogActivity,
}: DrillModalProps) {
  const [selectedOvning, setSelectedOvning] = useState<TeknikOvning | null>(propOvning || TEKNIKOVNINGAR[0]);
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedStars, setSelectedStars] = useState(3);
  const [currentTab, setCurrentTab] = useState<'instruktioner' | 'demo' | 'tips'>('instruktioner');

  useEffect(() => {
    if (propOvning) {
      setSelectedOvning(propOvning);
      setTimerSeconds(propOvning.targetSeconds);
    } else if (TEKNIKOVNINGAR.length > 0) {
      setSelectedOvning(TEKNIKOVNINGAR[0]);
      setTimerSeconds(TEKNIKOVNINGAR[0].targetSeconds);
    }
    setIsTimerRunning(false);
    setSelectedStars(3);
    setCurrentTab('instruktioner');
  }, [propOvning]);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  if (!isOpen && !propOvning) return null;
  if (!selectedOvning) return null;

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(selectedOvning.targetSeconds);
  };

  const handleFinish = () => {
    if (onComplete) {
      onComplete(selectedStars);
    } else if (onLogActivity && selectedOvning) {
      onLogActivity(selectedOvning.id);
      alert(`🎉 Du genomförde ${selectedOvning.title}! +1 Boll tillagd!`);
      onClose();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-robloxDark border-4 border-black rounded-3xl max-w-2xl w-full p-5 md:p-7 shadow-roblox-card relative my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-robloxRed text-white font-black border-2 border-black flex items-center justify-center text-xl shadow-roblox-btn-sm hover:scale-105 active:translate-y-0.5"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-4 pr-12">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 border-3 border-black flex items-center justify-center text-3xl shrink-0 shadow-roblox-btn-sm">
            {selectedOvning.badgeIcon}
          </div>
          <div>
            <span
              className="text-xs font-black px-2.5 py-0.5 rounded-lg border border-black uppercase text-black"
              style={{ backgroundColor: selectedOvning.difficultyColor }}
            >
              {selectedOvning.categoryLabel}
            </span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-0.5">{selectedOvning.title}</h2>
          </div>
        </div>

        {/* Drill Selector if launched from player page */}
        {drills && (
          <div className="mb-4">
            <label className="text-xs font-black text-slate-400 block mb-1">VÄLJ ÖVNING:</label>
            <select
              onChange={(e) => {
                const found = TEKNIKOVNINGAR.find((d) => d.id === e.target.value);
                if (found) {
                  setSelectedOvning(found);
                  setTimerSeconds(found.targetSeconds);
                }
              }}
              className="w-full bg-robloxCard border-2 border-black rounded-xl p-2 text-sm text-white font-bold"
            >
              {TEKNIKOVNINGAR.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.badgeIcon} {d.title} ({d.categoryLabel})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex space-x-2 border-b-2 border-robloxBorder pb-3 mb-4">
          <button
            onClick={() => setCurrentTab('instruktioner')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-black border-2 border-black transition-all ${
              currentTab === 'instruktioner' ? 'bg-robloxBlue text-white shadow-roblox-btn-sm' : 'bg-robloxCard text-slate-400'
            }`}
          >
            📋 STEG-FÖR-STEG
          </button>
          <button
            onClick={() => setCurrentTab('demo')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-black border-2 border-black transition-all ${
              currentTab === 'demo' ? 'bg-robloxBlue text-white shadow-roblox-btn-sm' : 'bg-robloxCard text-slate-400'
            }`}
          >
            ⚽ ANIMITERAD DEMO
          </button>
          <button
            onClick={() => setCurrentTab('tips')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-black border-2 border-black transition-all ${
              currentTab === 'tips' ? 'bg-robloxBlue text-white shadow-roblox-btn-sm' : 'bg-robloxCard text-slate-400'
            }`}
          >
            💡 PRO-TIPS
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-robloxCard border-2 border-black rounded-2xl p-4 md:p-5 mb-5 min-h-[160px]">
          {currentTab === 'instruktioner' && (
            <ol className="space-y-2 text-sm text-slate-200">
              {selectedOvning.instructions.map((step, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="bg-robloxBlue text-white font-black text-xs px-2 py-0.5 rounded-lg border border-black shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{step}</span>
                </li>
              ))}
            </ol>
          )}

          {currentTab === 'demo' && (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <div className="w-full h-36 bg-robloxNavy rounded-xl border-2 border-black flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-robloxBlue/10 to-neonLime/10" />
                <div className="text-6xl animate-bounce">⚽</div>
                <div className="absolute bottom-2 text-[11px] font-bold text-robloxCyan bg-black/60 px-3 py-1 rounded-full border border-robloxCyan">
                  {selectedOvning.animationType.toUpperCase()} SIMULATOR • TEMPO 100%
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Håll bollen nära foten och genomför rörelsen med hög precision.
              </p>
            </div>
          )}

          {currentTab === 'tips' && (
            <div className="flex items-center space-x-3 bg-amber-500/10 border-2 border-amber-500/40 p-4 rounded-xl">
              <span className="text-3xl">💡</span>
              <div>
                <h4 className="text-xs font-black text-robloxGold uppercase">Tränarens Pro-Tips</h4>
                <p className="text-sm text-slate-200 mt-1">{selectedOvning.tips}</p>
              </div>
            </div>
          )}
        </div>

        {/* Practice Timer & Reps Section */}
        <div className="bg-black/50 border-2 border-black rounded-2xl p-4 mb-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <div className="text-xs font-black text-slate-400">TRÄNINGSMÅL</div>
            <div className="text-sm font-black text-white">
              🎯 {selectedOvning.targetReps} Repetitioner ({selectedOvning.targetSeconds} sekunder)
            </div>
          </div>

          {/* Interactive Stopwatch */}
          <div className="flex items-center space-x-2">
            <div className="bg-robloxNavy border-2 border-robloxBorder px-3 py-1.5 rounded-xl font-black text-lg text-neonLime">
              ⏱️ {timerSeconds}s
            </div>
            <button
              onClick={toggleTimer}
              className={`px-3 py-1.5 rounded-xl font-black text-xs border-2 border-black ${
                isTimerRunning ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'
              }`}
            >
              {isTimerRunning ? 'PAUSA' : 'STARTA TID'}
            </button>
            <button
              onClick={resetTimer}
              className="bg-slate-700 text-white px-2 py-1.5 rounded-xl font-black text-xs border-2 border-black"
            >
              🔄
            </button>
          </div>
        </div>

        {/* Star Rating Evaluator & Completion */}
        <div className="bg-robloxCard border-2 border-black rounded-2xl p-4 text-center">
          <label className="text-xs font-black text-slate-300 block mb-2 uppercase">
            HUR GICK ÖVNINGEN? VÄLJ DITT BETYG:
          </label>
          <div className="flex justify-center space-x-3 mb-4">
            {[1, 2, 3].map((star) => (
              <button
                key={star}
                onClick={() => setSelectedStars(star)}
                className={`text-3xl md:text-4xl transition-all transform hover:scale-125 ${
                  star <= selectedStars ? 'text-robloxGold scale-110 drop-shadow-[0_0_8px_rgba(255,199,0,0.9)]' : 'text-slate-600'
                }`}
              >
                ★
              </button>
            ))}
          </div>

          <button
            onClick={handleFinish}
            className="w-full roblox-btn-gold py-3 text-base md:text-lg font-black tracking-wider uppercase shadow-gold-glow"
          >
            MARKERA KLAR & SAMLA XP! 🏆
          </button>
        </div>
      </div>
    </div>
  );
}
