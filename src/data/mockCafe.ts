import { MoodOption, CurrentCafeState, TimeSlot, CafeMood, Playlist } from '../types/cafe';

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

// Mock Playlists
export const mockPlaylists: Playlist[] = [
  {
    id: 'jazz',
    name: '차분한 재즈',
    genre: 'Jazz',
    color: '#3B82F6',
    icon: '🎷',
    songs: [
      {
        id: 'jazz1',
        title: 'Nocturne in E-flat major',
        artist: 'Bill Evans Trio',
        album: 'Portrait in Jazz',
        duration: '4:23',
        genre: 'Jazz',
        lyrics: ['부드러운 피아노 선율이', '밤의 고요를 채웁니다', '재즈의 명곡을 감상하세요'],
      },
      {
        id: 'jazz2',
        title: 'Blue in Green',
        artist: 'Miles Davis',
        album: 'Kind of Blue',
        duration: '5:27',
        genre: 'Jazz',
      },
      {
        id: 'jazz3',
        title: 'Take Five',
        artist: 'Dave Brubeck Quartet',
        duration: '5:24',
        genre: 'Jazz',
      },
    ],
  },
  {
    id: 'lofi',
    name: '집중 로파이',
    genre: 'Lo-fi',
    color: '#10B981',
    icon: '🎹',
    songs: [
      {
        id: 'lofi1',
        title: 'Midnight Study',
        artist: 'Chillhop Beats',
        duration: '3:15',
        genre: 'Lo-fi',
      },
      {
        id: 'lofi2',
        title: 'Coffee Shop Vibes',
        artist: 'Lo-fi Girl',
        duration: '2:48',
        genre: 'Lo-fi',
      },
      {
        id: 'lofi3',
        title: 'Rainy Day',
        artist: 'Homework Radio',
        duration: '4:02',
        genre: 'Lo-fi',
      },
    ],
  },
  {
    id: 'dance',
    name: '에너지 댄스',
    genre: 'Electronic',
    color: '#FF1B8D',
    icon: '🎵',
    songs: [
      {
        id: 'dance1',
        title: 'Midnight City',
        artist: 'M83',
        duration: '4:04',
        genre: 'Electronic',
      },
      {
        id: 'dance2',
        title: 'One More Time',
        artist: 'Daft Punk',
        duration: '5:20',
        genre: 'Electronic',
      },
      {
        id: 'dance3',
        title: 'Strobe',
        artist: 'deadmau5',
        duration: '10:37',
        genre: 'Electronic',
      },
    ],
  },
  {
    id: 'ballad',
    name: '감성 발라드',
    genre: 'Ballad',
    color: '#8B5CF6',
    icon: '🎸',
    songs: [
      {
        id: 'ballad1',
        title: '밤편지',
        artist: '아이유',
        duration: '4:16',
        genre: 'K-Ballad',
        lyrics: [
          '이 밤 그날의 반딧불을',
          '당신의 창 가까이 날려 보낼게요',
          '사랑한다는 말이에요',
        ],
      },
      {
        id: 'ballad2',
        title: 'Someone Like You',
        artist: 'Adele',
        duration: '4:45',
        genre: 'Ballad',
      },
      {
        id: 'ballad3',
        title: '좋니',
        artist: '윤종신',
        duration: '4:28',
        genre: 'K-Ballad',
      },
    ],
  },
];
