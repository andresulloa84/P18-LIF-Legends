import '@/styles/globals.css';
import React from 'react';

export const metadata = {
  title: 'Lycksele Fotboll Legends • P18 Ball Mastery',
  description: 'Roblox-style ball mastery tracking and game hub for Lycksele youth football team.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className="dark">
      <body className="bg-[#191b1d] text-white min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
