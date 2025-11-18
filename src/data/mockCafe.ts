import { MoodOption, CurrentCafeState, TimeSlot, CafeMood } from '../types/cafe';

export const moodOptions: MoodOption[] = [
  {
    id: 'dance',
    label: '신나는 댄스',
    icon: '🎵',
    color: '#FF1B8D',
    description: '에너지 넘치는 댄스 음악으로 활기찬 분위기',
  },
  {
    id: 'conversation',
    label: '차분한 대화',
    icon: '🍷',
    color: '#3B82F6',
    description: '부드러운 재즈와 함께하는 편안한 대화',
  },
  {
    id: 'ballad',
    label: '감성적인 발라드',
    icon: '🎸',
    color: '#8B5CF6',
    description: '감성을 자극하는 발라드와 어쿠스틱',
  },
  {
    id: 'focus',
    label: '집중 작업 모드',
    icon: '🎹',
    color: '#10B981',
    description: '로파이, 앰비언트로 집중력 향상',
  },
  {
    id: 'freestyle',
    label: '자유로운 즉흥',
    icon: '🎭',
    color: '#FFE400',
    description: '라이브 즉흥 연주와 실험적인 사운드',
  },
];

export const initialCafeState: CurrentCafeState = {
  currentMood: 'conversation',
  djName: 'DJ Midnight',
  djAvatar: '🌙',
  currentSong: 'Nocturne in E-flat major',
  currentArtist: 'Bill Evans Trio',
  visitorCount: 24,
  lightingColor: '#3B82F6',
  musicGenre: 'Smooth Jazz',
  ambianceDescription: '따뜻한 조명 아래 부드러운 재즈 선율이 흐르는 아늑한 분위기',
};

export const timeSlots: TimeSlot[] = [
  { time: '20:00', available: true },
  { time: '21:00', available: true, waitTime: 15 },
  { time: '22:00', available: true },
  { time: '23:00', available: false },
  { time: '00:00', available: true, waitTime: 30 },
  { time: '01:00', available: true },
  { time: '02:00', available: true },
];

// Simulated initial votes
export const initialVotes: Record<CafeMood, number> = {
  dance: 15,
  conversation: 35,
  ballad: 20,
  focus: 18,
  freestyle: 12,
};
