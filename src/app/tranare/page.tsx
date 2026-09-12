'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft, Users, BarChart3, Edit3, Copy, RefreshCw, UserPlus, Check, Star, Plus, ExternalLink } from 'lucide-react';
import TopBar from '@/components/TopBar';
import SideBar from '@/components/SideBar';
import CoachLoginModal from '@/components/CoachLoginModal';
import { useAppStore } from '@/lib/store';
import { Drill } from '@/lib/initialData';

export default function CoachDashboard() {
  const {
    isLoaded,
    players,
    drills,
    isCoachLoggedIn,
    addPlayer,
    resetPlayerPassword,
    updateDrill,
    logoutCoach,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'roster' | 'analytics' | 'editor'>('roster');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Drill Editor Form state
  const [editingDrill, setEditingDrill] = useState<Partial<Drill>>({
    title: '',
    description: '',
    videoUrl: '',
    requiredLevel: 1,
    category: 'Kontroll',
    starsReward: 1,
  });

  if (!isLoaded) return null;

  if (!isCoachLoggedIn) {
    return (
      <div className="min-h-screen bg-[#191b1d] text-white flex flex-col items-center justify-center p-4">
        <div className="roblox-card p-8 max-w-md w-full text-center">
          <Shield className="w-12 h-12 text-[#00b06f] mx-auto mb-4" />
          <h2 className="text-xl font-black text-white mb-2">Tränaråtkomst krävs</h2>
          <p className="text-xs text-gray-400 mb-6">
            Du måste logga in som tränare för att nå tränarpanelen.
          </p>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="py-3 px-6 roblox-btn-primary text-xs font-bold w-full uppercase"
          >
            Öppna Tränarinloggning
          </button>
        </div>
        <CoachLoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={() => setIsLoginModalOpen(false)}
        />
      </div>
    );
  }

  const copyLink = (username: string, playerId: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const url = `${origin}/spelare/${username}`;
    navigator.clipboard.writeText(url);
    setCopiedId(playerId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleAddPlayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerName.trim()) return;
    addPlayer(newPlayerName.trim());
    setNewPlayerName('');
    alert(`Spelaren ${newPlayerName} har lagts till i truppen!`);
  };

  const handleSaveDrill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDrill.title || !editingDrill.description) return;

    const drillToSave: Drill = {
      id: editingDrill.id || `drill-${Date.now()}`,
      title: editingDrill.title,
      description: editingDrill.description,
      videoUrl: editingDrill.videoUrl || 'https://www.youtube.com/embed/8kX1T9c4kQ8',
      requiredLevel: Number(editingDrill.requiredLevel) || 1,
      category: editingDrill.category || 'Kontroll',
      starsReward: 1,
    };

    updateDrill(drillToSave);
    setEditingDrill({ title: '', description: '', videoUrl: '', requiredLevel: 1, category: 'Kontroll', starsReward: 1 });
    alert(`Övningen "${drillToSave.title}" har sparats och uppdaterats i realtid!`);
  };

  return (
    <div className="min-h-screen bg-[#191b1d] text-white flex flex-col">
      <TopBar isCoach={true} />

      <div className="flex-1 flex">
        <SideBar isCoach={true} />

        <main className="flex-1 md:ml-16 p-4 sm:p-8 max-w-7xl mx-auto w-full">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-2">
                <ArrowLeft className="w-3.5 h-3.5 text-[#00b06f]" /> Tillbaka till Hubben
              </Link>
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                <Shield className="w-7 h-7 text-[#00b06f]" />
                Tränarpanel • P18 Lycksele
              </h1>
            </div>

            <button
              onClick={logoutCoach}
              className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs font-bold hover:bg-red-500/20 transition-all"
            >
              Logga ut tränare
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-white/10 pb-3">
            <button
              onClick={() => setActiveTab('roster')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'roster'
                  ? 'bg-[#00b06f] text-white shadow-lg'
                  : 'bg-[#232527] text-gray-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              Tab 1: Spelartrupp ({players.length})
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-[#00b06f] text-white shadow-lg'
                  : 'bg-[#232527] text-gray-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Tab 2: Övningsstatistik
            </button>

            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'editor'
                  ? 'bg-[#00b06f] text-white shadow-lg'
                  : 'bg-[#232527] text-gray-400 hover:text-white'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              Tab 3: Redigera övningar
            </button>
          </div>

          {/* TAB 1: SPELARTRUPP (ROSTER MANAGEMENT) */}
          {activeTab === 'roster' && (
            <div className="space-y-6">
              
              {/* Form: Add New Player */}
              <div className="roblox-card p-6 bg-[#232527]">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-[#00b06f]" />
                  Lägg till ny spelare i truppen
                </h3>
                <form onSubmit={handleAddPlayerSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    placeholder="Skriv spelarens förnamn och efternamn..."
                    className="flex-1 bg-[#191b1d] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00b06f]"
                    required
                  />
                  <button type="submit" className="py-2.5 px-6 roblox-btn-primary text-xs font-extrabold uppercase">
                    + Registrera Spelare
                  </button>
                </form>
              </div>

              {/* Roster Table */}
              <div className="roblox-card p-6 bg-[#232527] overflow-x-auto">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4">
                  Samtliga 34 Registrerade Spelare
                </h3>

                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-3">Spelare</th>
                      <th className="py-3 px-3">Användarnamn</th>
                      <th className="py-3 px-3">Nivå & Rang</th>
                      <th className="py-3 px-3">Stjärnor</th>
                      <th className="py-3 px-3 text-right">Åtgärder</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {players.map((p) => (
                      <tr key={p.id} className="hover:bg-[#2b2d31]/50 transition-colors">
                        <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                          <img src={p.avatarUrl} alt={p.name} className="w-6 h-6 object-contain" />
                          <span>{p.name}</span>
                        </td>
                        <td className="py-3 px-3 text-[#00b06f] font-mono">@{p.username}</td>
                        <td className="py-3 px-3 font-medium text-gray-300">{p.levelTitle}</td>
                        <td className="py-3 px-3 font-extrabold text-[#f5c147]">⭐ {p.totalStars}</td>
                        <td className="py-3 px-3 text-right space-x-2">
                          
                          {/* Copy Link Button */}
                          <button
                            onClick={() => copyLink(p.username, p.id)}
                            className="px-2.5 py-1 bg-[#191b1d] border border-white/10 text-gray-300 hover:text-white rounded-lg font-semibold inline-flex items-center gap-1 text-[11px]"
                          >
                            {copiedId === p.id ? (
                              <>
                                <Check className="w-3 h-3 text-[#00b06f]" /> Koperad!
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-blue-400" /> Kopiera länk
                              </>
                            )}
                          </button>

                          {/* Reset Password */}
                          <button
                            onClick={() => resetPlayerPassword(p.id)}
                            className="px-2.5 py-1 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-lg font-semibold inline-flex items-center gap-1 text-[11px]"
                          >
                            <RefreshCw className="w-3 h-3" /> Återställ lösen
                          </button>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 2: ÖVNINGSSTATISTIK (ANALYTICS) */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {drills.map((d) => {
                  const aggregateStars = players.length * 4; // Mock drill stats output
                  return (
                    <div key={d.id} className="roblox-card p-5 bg-[#232527]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase text-[#00b06f] bg-[#00b06f]/10 px-2 py-0.5 rounded border border-[#00b06f]/20">
                          {d.category}
                        </span>
                        <span className="text-xs font-bold text-[#f5c147]">
                          ⭐ {aggregateStars} stjärnor totalt i truppen
                        </span>
                      </div>
                      <h4 className="font-extrabold text-base text-white">{d.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{d.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: HANTERA & REDIGERA ÖVNINGAR (DRILL EDITOR) */}
          {activeTab === 'editor' && (
            <div className="space-y-6">
              
              {/* Form: Add or Edit Drill */}
              <div className="roblox-card p-6 bg-[#232527]">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#00b06f]" />
                  {editingDrill.id ? 'Redigera övning' : 'Skapa ny övning för truppen'}
                </h3>

                <form onSubmit={handleSaveDrill} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">Övningsnamn</label>
                      <input
                        type="text"
                        value={editingDrill.title || ''}
                        onChange={(e) => setEditingDrill({ ...editingDrill, title: e.target.value })}
                        placeholder="t.ex. Cristiano Chop..."
                        className="w-full bg-[#191b1d] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#00b06f]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">Minsta nivå för att låsa upp</label>
                      <select
                        value={editingDrill.requiredLevel || 1}
                        onChange={(e) => setEditingDrill({ ...editingDrill, requiredLevel: Number(e.target.value) })}
                        className="w-full bg-[#191b1d] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#00b06f]"
                      >
                        <option value={1}>Nivå 1: Gräsrotslirare</option>
                        <option value={2}>Nivå 2: Dribbler</option>
                        <option value={3}>Nivå 3: Bollmagiker</option>
                        <option value={4}>Nivå 4: Mästare</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Beskrivning & Spettips</label>
                    <textarea
                      value={editingDrill.description || ''}
                      onChange={(e) => setEditingDrill({ ...editingDrill, description: e.target.value })}
                      placeholder="Förklara hur övningen utförs..."
                      rows={3}
                      className="w-full bg-[#191b1d] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#00b06f]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Videolänk (YouTube embed)</label>
                    <input
                      type="url"
                      value={editingDrill.videoUrl || ''}
                      onChange={(e) => setEditingDrill({ ...editingDrill, videoUrl: e.target.value })}
                      placeholder="https://www.youtube.com/embed/..."
                      className="w-full bg-[#191b1d] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#00b06f]"
                    />
                  </div>

                  <button type="submit" className="py-2.5 px-6 roblox-btn-primary text-xs font-extrabold uppercase">
                    Spara Övning i Real tid
                  </button>
                </form>
              </div>

              {/* Drills List View */}
              <div className="roblox-card p-6 bg-[#232527]">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4">
                  Befintliga Övningar ({drills.length})
                </h3>

                <div className="space-y-3">
                  {drills.map((d) => (
                    <div key={d.id} className="p-4 rounded-xl bg-[#191b1d] border border-white/5 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-white">{d.title}</h4>
                        <span className="text-xs text-gray-400 font-medium">Nivå {d.requiredLevel} • {d.category}</span>
                      </div>

                      <button
                        onClick={() => setEditingDrill(d)}
                        className="px-3 py-1.5 bg-[#232527] border border-white/10 text-xs font-bold text-gray-300 hover:text-white rounded-lg"
                      >
                        Redigera
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}
