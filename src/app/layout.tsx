import './globals.css';
import React from 'react';
import SideBar from '@/components/SideBar';
import TopBar from '@/components/TopBar';
import { GameProvider } from '@/context/GameContext';

export const metadata = {
  title: 'Bollmästarna - Teknikövningar | Roblox Edition',
  description: 'Spåra fotbollsteknik och ball mastery i ett Roblox-inspirerat ungdomsfotbollsspel!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className="bg-robloxNavy text-white min-h-screen flex flex-col font-sans antialiased">
        <GameProvider>
          <TopBar />
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            <SideBar />
            <main className="flex-1 p-4 md:p-6 overflow-y-auto max-w-7xl mx-auto w-full">
              {children}
            </main>
          </div>
        </GameProvider>
      </body>
    </html>
  );
}
