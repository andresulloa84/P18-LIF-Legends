export interface Player {
  id: string;
  name: string;
  username: string; // URL slug e.g. "julian-ulloa-nilsson"
  totalBalls: number; // Football collection counter
  currentLevel: number;
  levelTitle: string;
  avatarUrl: string;
  joinedDate: string;
}

export interface Drill {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  requiredLevel: number;
  category: string;
  ballsReward: number;
}

export interface DrillLog {
  id: string;
  playerId: string;
  drillId: string;
  timestamp: string;
  ballsEarned: number;
}

export const LEVEL_TIERS = [
  { level: 1, title: 'Nivå 1: Gräsrotslirare', minBalls: 0, maxBalls: 19, badge: '🌱' },
  { level: 2, title: 'Nivå 2: Dribbler', minBalls: 20, maxBalls: 49, badge: '⚽' },
  { level: 3, title: 'Nivå 3: Bollmagiker', minBalls: 50, maxBalls: 99, badge: '🪄' },
  { level: 4, title: 'Nivå 4: Mästare', minBalls: 100, maxBalls: 9999, badge: '👑' },
];

export function getLevelTitle(balls: number): { level: number; title: string; badge: string; nextLevelMin: number } {
  if (balls >= 100) return { level: 4, title: 'Nivå 4: Mästare', badge: '👑', nextLevelMin: 100 };
  if (balls >= 50) return { level: 3, title: 'Nivå 3: Bollmagiker', badge: '🪄', nextLevelMin: 100 };
  if (balls >= 20) return { level: 2, title: 'Nivå 2: Dribbler', badge: '⚽', nextLevelMin: 50 };
  return { level: 1, title: 'Nivå 1: Gräsrotslirare', badge: '🌱', nextLevelMin: 20 };
}

// Generate URL slug from full name
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/å/g, 'a')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

const RAW_PLAYER_NAMES = [
  "Yasser Abdulaziz Mohammed",
  "Jarmo Ahonen",
  "Teo Ahrling",
  "Zaid Al Hamid",
  "Yadiel Awet",
  "Adrian Bertilsson",
  "Alfred Björklund",
  "Folke Bruman",
  "Abbe Bäckström",
  "Constantin Dahlström",
  "Cevin Forsmark",
  "Alfons Fredriksson",
  "Elton Frisk",
  "Sven Färnstrand Bylund",
  "Joel Gustafsson",
  "Gabriel Gyllander",
  "Mattis Hedin",
  "Karl Hägglund",
  "Leo Kaminski",
  "Mohamed Kedra",
  "Leonard Lindberg",
  "Wilmer Lindberg",
  "Ossian Linder",
  "Sten Lundmark",
  "Vide Myrestam",
  "Vincent Nordfjell",
  "Oliver Rönnholm",
  "Erling Rönnmark",
  "Ebbot Sjöberg",
  "Walter Söderberg",
  "Julián Ulloa Nilsson",
  "Almir Younus",
  "Eyob Zerit",
  "Axel Öhman"
];

// Pre-seeded initial ball counts to make the leaderboard match screenshot & look active
const INITIAL_BALL_PRESETS: Record<string, number> = {
  "julian-ulloa-nilsson": 166,
  "leo-kaminski": 54,
  "abbe-backstrom": 30,
  "teo-ahrling": 29,
  "alfred-bjorklund": 10,
  "axel-ohman": 18,
  "constantin-dahlstrom": 15,
};

export const INITIAL_PLAYERS: Player[] = RAW_PLAYER_NAMES.map((fullName, index) => {
  const username = slugify(fullName);
  const balls = INITIAL_BALL_PRESETS[username] ?? (10 + (index % 15) * 2);
  const levelInfo = getLevelTitle(balls);
  return {
    id: `player-${index + 1}`,
    name: fullName,
    username: username,
    totalBalls: balls,
    currentLevel: levelInfo.level,
    levelTitle: levelInfo.title,
    avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`,
    joinedDate: '2026-01-15'
  };
});

export const INITIAL_DRILLS: Drill[] = [
  {
    id: 'drill-1',
    title: 'Tåtappningar (Toe Taps)',
    description: 'Knacka ovansidan av bollen växelvis med höger och vänster fot. Håll ett högt tempo och pumpa med armarna för balansen!',
    videoUrl: 'https://www.youtube.com/embed/8kX1T9c4kQ8',
    requiredLevel: 1,
    category: 'Kontroll',
    ballsReward: 1
  },
  {
    id: 'drill-2',
    title: 'Insida-Insida (Tick-Tock / Insides)',
    description: 'Passa bollen snabbt mellan fötternas insidor utan att den rullar iväg. Håll knäna böjda!',
    videoUrl: 'https://www.youtube.com/embed/3bM0Yn_3c5c',
    requiredLevel: 1,
    category: 'Känsla',
    ballsReward: 1
  },
  {
    id: 'drill-3',
    title: 'Sulan-Insida Pull Back',
    description: 'Dra bollen bakåt med sulan och stöt den direkt framåt med insidan av samma fot. Byt fot efter varje repetition.',
    videoUrl: 'https://www.youtube.com/embed/5aKj8p76mH0',
    requiredLevel: 2,
    category: 'Vändningar',
    ballsReward: 1
  },
  {
    id: 'drill-4',
    title: 'Coerver V-Pull Cut',
    description: 'Forma ett V med bollen. Dra bak med sulan, skär sedan diagonal ut med utsidan eller insidan.',
    videoUrl: 'https://www.youtube.com/embed/2vM90v3k9qQ',
    requiredLevel: 2,
    category: 'Finter',
    ballsReward: 1
  },
  {
    id: 'drill-5',
    title: 'Cristiano Chop (Klackskärning)',
    description: 'Hoppa fram och skär bollen bakom stödjebenet med insidan av den andra foten i hög fart.',
    videoUrl: 'https://www.youtube.com/embed/4xL-9yZ98fM',
    requiredLevel: 3,
    category: 'Spetsteknik',
    ballsReward: 1
  },
  {
    id: 'drill-6',
    title: 'Elastico (Ormen / Flip-Flap)',
    description: 'För bollen snabbt utåt med utsidan och svep sedan blixtsnabbt tillbaka den med insidan i en kontinuerlig rörelse.',
    videoUrl: 'https://www.youtube.com/embed/9Z9lG8N4y2w',
    requiredLevel: 4,
    category: 'Mästarklass',
    ballsReward: 1
  }
];
