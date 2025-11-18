export interface Artwork {
  id: string;
  title: string;
  theme: string;
  description: string;
  moodKeywords: string[];
  color: string;
  imageUrl: string; // placeholder for now
}

export interface MoodSelection {
  artwork: Artwork;
  order: number; // 1-4
  weight: number; // percentage
}

export interface MoodProfile {
  primary: string;
  secondary: string;
  description: string;
  keywords: string[];
  compatibilityScore: Record<string, number>;
}

export interface QuizResult {
  selections: MoodSelection[];
  profile: MoodProfile;
  timestamp: number;
  matchCount: number; // mock number of people waiting
}

export const ARTWORKS: Artwork[] = [
  {
    id: 'kpop-major',
    title: 'K-POP Major',
    theme: '밝고 에너제틱한',
    description: '화려한 비주얼과 강렬한 에너지',
    moodKeywords: ['활기찬', '트렌디한', '역동적인', '화려한'],
    color: '#FF1B8D', // neon-pink
    imageUrl: '🎤',
  },
  {
    id: 'ballad-rnb',
    title: 'Ballad & R&B',
    theme: '따뜻하고 감성적인',
    description: '잔잔한 감성과 깊은 울림',
    moodKeywords: ['감성적인', '따뜻한', '차분한', '깊이있는'],
    color: '#FFE400', // electric-yellow
    imageUrl: '🎵',
  },
  {
    id: 'graffiti-club',
    title: 'Graffiti + Club',
    theme: '엣지있고 도시적인',
    description: '거칠고 자유로운 언더그라운드',
    moodKeywords: ['자유로운', '강렬한', '도시적인', '독창적인'],
    color: '#00FFC6', // mint
    imageUrl: '🎨',
  },
  {
    id: 'retro-90s',
    title: '90s Retro',
    theme: '향수를 불러일으키는',
    description: '아날로그 감성의 따뜻함',
    moodKeywords: ['향수어린', '아날로그', '레트로', '감각적인'],
    color: '#9333ea', // purple
    imageUrl: '📼',
  },
];

export const SELECTION_WEIGHTS = {
  1: 40,
  2: 30,
  3: 20,
  4: 10,
};
