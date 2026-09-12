// src/components/TopBar.tsx
import React from 'react';

export default function TopBar() {
  return (
    <header className="bg-slate-900 p-4 flex items-center justify-between shadow-lg">
      <h1 className="text-2xl font-bold text-neonGreen">Lycksele Fotboll Legends</h1>
      <nav className="space-x-4">
        <a href="/" className="text-white hover:text-neonGreen">Hem</a>
        <a href="/about" className="text-white hover:text-neonGreen">Om</a>
        <a href="/contact" className="text-white hover:text-neonGreen">Kontakt</a>
      </nav>
    </header>
  );
}
