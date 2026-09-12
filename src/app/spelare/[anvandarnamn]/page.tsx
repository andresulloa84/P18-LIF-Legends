import React from 'react';
import PlayerClientPage from './PlayerClientPage';
import { INITIAL_PLAYERS } from '@/lib/initialData';

export function generateStaticParams() {
  return INITIAL_PLAYERS.map((p) => ({
    anvandarnamn: p.username,
  }));
}

export default function Page({ params }: { params: { anvandarnamn: string } }) {
  return <PlayerClientPage anvandarnamn={params.anvandarnamn} />;
}
