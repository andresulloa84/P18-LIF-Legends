// src/components/SideBar.tsx
import React from 'react';

export default function SideBar() {
  return (
    <aside className="w-64 bg-slate-800 p-4 hidden md:block">
      <nav className="flex flex-col space-y-2">
        <a href="/" className="text-white hover:text-neonGreen">Home</a>
        <a href="/skills" className="text-white hover:text-neonGreen">Skills</a>
        <a href="/profile" className="text-white hover:text-neonGreen">Profile</a>
      </nav>
    </aside>
  );
}
