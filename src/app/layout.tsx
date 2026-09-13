import './globals.css';
import React from 'react';
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
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
