export interface TeknikOvning {
  id: string;
  title: string;
  category: 'brons' | 'silver' | 'guld' | 'legendar';
  categoryLabel: string;
  difficultyColor: string;
  targetReps: number;
  targetSeconds: number;
  xpReward: number;
  coinReward: number;
  shortDesc: string;
  instructions: string[];
  tips: string;
  badgeIcon: string;
  animationType: 'footwork' | 'dribble' | 'turn' | 'freestyle';
}

export const TEKNIKOVNINGAR: TeknikOvning[] = [
  // BRONSÖVNINGAR (LEVEL 1-3)
  {
    id: 'brons-1',
    title: 'Insida-Utsida Vrist',
    category: 'brons',
    categoryLabel: '🥉 Brons - Grunder',
    difficultyColor: '#cd7f32',
    targetReps: 40,
    targetSeconds: 30,
    xpReward: 100,
    coinReward: 25,
    shortDesc: 'Peta bollen varannan gång med insidan och utsidan av samma fot i högt tempo.',
    instructions: [
      'Stå på ett ben med lätt böjt knä för balans.',
      'Touch 1: Peta bollen försiktigt med INSIDAN av vristen åt sidan.',
      'Touch 2: Peta bollen tillbaka med UTSIDAN av samma fot.',
      'Håll en rytmisk studsig rörelse i stödjebenet och byt fot efter 20 reps.'
    ],
    tips: 'Blicken upp från bollen var femte repetition!',
    badgeIcon: '🦶',
    animationType: 'footwork'
  },
  {
    id: 'brons-2',
    title: 'Toe Taps Speed',
    category: 'brons',
    categoryLabel: '🥉 Brons - Grunder',
    difficultyColor: '#cd7f32',
    targetReps: 60,
    targetSeconds: 30,
    xpReward: 120,
    coinReward: 30,
    shortDesc: 'Snabba tå-tTouch ovanpå bollen med växlande fötter.',
    instructions: [
      'Placera bollen framför dig.',
      'Toucha ovansidan av bollen lätt med höger fotsula.',
      'Hoppa snabbt över och toucha med vänster fotsula.',
      'Öka tempot utan att flytta bollen ur position.'
    ],
    tips: 'Håll armarna vinklade för perfekt balans!',
    badgeIcon: '👟',
    animationType: 'footwork'
  },
  {
    id: 'brons-3',
    title: 'Sole Roll & Pass',
    category: 'brons',
    categoryLabel: '🥉 Brons - Grunder',
    difficultyColor: '#cd7f32',
    targetReps: 35,
    targetSeconds: 40,
    xpReward: 130,
    coinReward: 35,
    shortDesc: 'Rulla bollen tvärs över kroppen med fotsulan och stoppa med motsatt insida.',
    instructions: [
      'Dra bollen med höger fotsula från höger till vänster.',
      'Möt bollen med vänster fot insida och rulla tillbaka åt höger.',
      'Håll ett flyt i rörelsen och låt höfterna följa med.'
    ],
    tips: 'Använd mjuka sulor för bäst kontroll!',
    badgeIcon: '⚡',
    animationType: 'footwork'
  },

  // SILVERÖVNINGAR (LEVEL 4-6)
  {
    id: 'silver-1',
    title: 'Cruyff Vändning',
    category: 'silver',
    categoryLabel: '🥈 Silver - Vändningar',
    difficultyColor: '#c0c0c0',
    targetReps: 25,
    targetSeconds: 45,
    xpReward: 200,
    coinReward: 50,
    shortDesc: 'Låtsas passa/skjuta och vänd bollen 180 grader bakom stödjebenet.',
    instructions: [
      'Driv bollen framåt i mjukt tempo.',
      'Sätt ner stödjebenet framför bollen som om du ska passa.',
      'Sväng tillbaks tillslagsfoten och peta bollen BAKOM stödjebenet med insidan.',
      'Explotera och accelerate i ny riktning!'
    ],
    tips: 'Kroppsfejka rejält så försvararen går på finte!',
    badgeIcon: '👑',
    animationType: 'turn'
  },
  {
    id: 'silver-2',
    title: 'Stepover & Push',
    category: 'silver',
    categoryLabel: '🥈 Silver - Vändningar',
    difficultyColor: '#c0c0c0',
    targetReps: 30,
    targetSeconds: 40,
    xpReward: 220,
    coinReward: 55,
    shortDesc: 'Kliv runt bollen med foten och peta snabbt iväg i motsatt riktning.',
    instructions: [
      'Närma dig försvararen i kontrollerad fart.',
      'För foten inifrån och UTÅT runt bollen utan att röra den.',
      'När foten landar, stöt iväg bollen åt motsatt håll med den andra fotens utsida.'
    ],
    tips: 'Böj på knäna för maximal explosion!',
    badgeIcon: '🌀',
    animationType: 'dribble'
  },
  {
    id: 'silver-3',
    title: 'L-Cut Dragback',
    category: 'silver',
    categoryLabel: '🥈 Silver - Vändningar',
    difficultyColor: '#c0c0c0',
    targetReps: 30,
    targetSeconds: 45,
    xpReward: 240,
    coinReward: 60,
    shortDesc: 'Dra bak bollen med fotsulan och knuffa den bakom stödjebenet så det bildar ett L.',
    instructions: [
      'Stå framför bollen.',
      'Dra bollen rakt bakåt med höger fotsula.',
      'Innan bollen passerar stödjebenet, vinkla höger vrist och peta den bakom vänster ben.',
      'Fånga upp med vänster fot.'
    ],
    tips: 'Träna båda fötterna för dubbel effekt!',
    badgeIcon: '📐',
    animationType: 'turn'
  },

  // GULDÖVNINGAR (LEVEL 7-9)
  {
    id: 'guld-1',
    title: 'Zidane Rouletta',
    category: 'guld',
    categoryLabel: '🥇 Guld - Dribblingar',
    difficultyColor: '#ffd700',
    targetReps: 20,
    targetSeconds: 60,
    xpReward: 350,
    coinReward: 90,
    shortDesc: 'Snurra 360 grader över bollen med båda fotsulorna i följd.',
    instructions: [
      'Driv mot bollen i medeltempo.',
      'Sätt första foten på bollen och hoppa runt 180 grader med kroppen.',
      'Sätt den andra foten på bollen och dra den med dig för att fullborda 360-snurren.'
    ],
    tips: 'Håll tyngdpunkten låg när du rullar över bollen!',
    badgeIcon: '🔮',
    animationType: 'dribble'
  },
  {
    id: 'guld-2',
    title: 'Elastico (Snake Touch)',
    category: 'guld',
    categoryLabel: '🥇 Guld - Dribblingar',
    difficultyColor: '#ffd700',
    targetReps: 20,
    targetSeconds: 45,
    xpReward: 380,
    coinReward: 100,
    shortDesc: 'Böj bollen snabbt utåt med utsidan och skär direkt tillbaka med insidan.',
    instructions: [
      'Led bollen med utsidan av vristen snett utåt i en snabb rörelse.',
      'Utan att släppa markkontakten helt, vrid vristen blixtsnabbt och dra bollen med insidan åt andra hållet.'
    ],
    tips: 'Detta kräver mycket mjukhet i vristen!',
    badgeIcon: '🐍',
    animationType: 'dribble'
  },

  // LEGENDAR (LEVEL 10+)
  {
    id: 'legendar-1',
    title: 'Around The World (ATW)',
    category: 'legendar',
    categoryLabel: '💎 Legendar - Freestyle',
    difficultyColor: '#00f0ff',
    targetReps: 10,
    targetSeconds: 60,
    xpReward: 600,
    coinReward: 200,
    shortDesc: 'Trixa bollen och gör ett snabbt varv runt den i luften innan nästa touch.',
    instructions: [
      'Börja med att trixa kontrollerat med dominanta foten.',
      'Ge bollen en lätt spinn inåt.',
      'Svep foten snabbt runt bollen i luften innan den faller ner.',
      'Fånga upp eller fortsätt trixa!'
    ],
    tips: 'Använd spänst från knät och håll bollen i midjehöjd!',
    badgeIcon: '🌍',
    animationType: 'freestyle'
  },
  {
    id: 'legendar-2',
    title: 'Rainbow Flick Master',
    category: 'legendar',
    categoryLabel: '💎 Legendar - Freestyle',
    difficultyColor: '#00f0ff',
    targetReps: 12,
    targetSeconds: 60,
    xpReward: 650,
    coinReward: 220,
    shortDesc: 'Kläm bollen mellan fötterna och rulla upp den för att snärta den över huvudet.',
    instructions: [
      'Placera bollen mellan dina hällar.',
      'Rulla bollen upp längs vadbenet med ena fotens insida.',
      'Snärta till med den andra fotens häl för att lyfta bollen i en båge över dig.'
    ],
    tips: 'Luta överkroppen en aning framåt när du snärtar!',
    badgeIcon: '🌈',
    animationType: 'freestyle'
  }
];
