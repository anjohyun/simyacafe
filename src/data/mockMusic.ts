import {
  MusicPattern,
  PatternTemplate,
  MusicCreator,
  MusicBadge,
  SoundSample,
} from '../types/music';

export const availableMusicBadges: MusicBadge[] = [
  {
    id: 'first-beat',
    name: '첫 비트 메이커',
    icon: '🥁',
    description: '첫 번째 패턴을 만들었어요',
  },
  {
    id: 'remix-master',
    name: '리믹스 마스터',
    icon: '🎚️',
    description: '10개 이상의 리믹스를 만들었어요',
  },
  {
    id: 'weekly-dj',
    name: '주간 인기 DJ',
    icon: '🎧',
    description: '패턴이 주간 TOP 10에 선정되었어요',
  },
  {
    id: 'cafe-dj',
    name: '오늘의 DJ',
    icon: '🌟',
    description: '카페 라이브에서 플레이되었어요',
  },
  {
    id: 'midnight-producer',
    name: '심야 프로듀서',
    icon: '🌙',
    description: '자정 이후에 10개 이상의 패턴을 만들었어요',
  },
];

export const patternTemplates: PatternTemplate[] = [
  {
    id: 'kpop-energetic',
    name: 'K-POP 메이저',
    mood: 'kpop',
    description: '에너지 넘치는 신스 패턴',
    strudelCode: `// K-POP Energetic Synth Pattern
sound("bd sd, ~ bd sd ~")
  .bank("RolandTR909")
  .fast(2)
  .stack(
    sound("~ hh*8").gain(0.3),
    note("c4 eb4 g4 bb4")
      .s("sawtooth")
      .cutoff(1000)
      .resonance(10)
  )`,
    icon: '🎵',
    color: '#FF1B8D',
  },
  {
    id: 'ballad-emotional',
    name: '발라드 & R&B',
    mood: 'ballad',
    description: '느리고 감성적인 피아노와 베이스',
    strudelCode: `// Ballad Emotional Pattern
note("<c3 eb3 g3 bb3>")
  .s("piano")
  .slow(2)
  .stack(
    note("<c2 eb2 g2>")
      .s("bass")
      .slow(4),
    sound("~ sd ~ sd")
      .bank("RolandTR808")
      .gain(0.5)
  )`,
    icon: '🎸',
    color: '#8B5CF6',
  },
  {
    id: 'graffiti-techno',
    name: '그래피티 + 클럽',
    mood: 'graffiti',
    description: '테크노 비트와 808 베이스',
    strudelCode: `// Graffiti Techno Pattern
sound("bd*4, ~ cp ~ cp")
  .bank("RolandTR808")
  .speed(1.2)
  .stack(
    sound("hh*16").gain(0.2),
    note("c2*4")
      .s("bass")
      .lpf(sine.range(200, 2000))
  )`,
    icon: '🎨',
    color: '#FFE400',
  },
  {
    id: 'retro-lofi',
    name: '90년대 레트로',
    mood: 'retro',
    description: '로파이 힙합과 바이닐 크랙',
    strudelCode: `// 90s Retro Lo-fi Pattern
sound("bd ~ sd ~")
  .bank("RolandTR808")
  .slow(2)
  .stack(
    sound("~ hh ~ hh").gain(0.4),
    note("<c4 eb4 f4 g4>")
      .s("rhodes")
      .lpf(800)
      .room(0.5),
    sound("vinyl").gain(0.1)
  )`,
    icon: '🕹️',
    color: '#00FFC6',
  },
];

export const mockMusicPatterns: MusicPattern[] = [
  {
    id: 'pattern-001',
    title: '새벽 3시의 비트',
    description: '혼자 작업할 때 듣기 좋은 차분한 로파이 비트. 빗소리와 함께 들으면 더 좋아요.',
    strudelCode: patternTemplates[3].strudelCode,
    creatorId: 'user-music-001',
    creatorName: 'Midnight Producer',
    creatorAvatar: '🌙',
    mood: 'retro',
    listeningContext: ['alone', 'at-cafe'],
    instruments: ['drums', 'synth', 'ambient'],
    bpm: 85,
    difficulty: 'beginner',
    tags: ['lofi', 'chill', 'study', 'rain'],
    likes: 234,
    playCount: 1542,
    remixCount: 18,
    commentCount: 45,
    createdAt: new Date(2025, 10, 15, 3, 20),
    postedAtMidnight: true,
    isRemix: false,
  },
  {
    id: 'pattern-002',
    title: '클럽 가기 전 워밍업',
    description: '금요일 밤 파티 준비하면서 듣기 딱! 점점 빨라지는 비트가 포인트.',
    strudelCode: patternTemplates[2].strudelCode,
    creatorId: 'user-music-002',
    creatorName: 'DJ Neon',
    creatorAvatar: '💫',
    mood: 'graffiti',
    listeningContext: ['with-friends', 'at-cafe'],
    instruments: ['drums', 'bass', 'synth'],
    bpm: 128,
    difficulty: 'intermediate',
    tags: ['techno', 'club', 'energetic', '808'],
    likes: 567,
    playCount: 3241,
    remixCount: 42,
    commentCount: 89,
    createdAt: new Date(2025, 10, 13, 21, 45),
    isRemix: false,
  },
  {
    id: 'pattern-003',
    title: '비 오는 날의 발라드',
    description: '감성 한 스푼. 피아노 선율과 빗소리가 어우러져요. 술 한잔하면서 듣기 좋아요.',
    strudelCode: patternTemplates[1].strudelCode,
    creatorId: 'user-music-003',
    creatorName: 'Rainy Melody',
    creatorAvatar: '☔',
    mood: 'ballad',
    listeningContext: ['alone', 'with-drink'],
    instruments: ['synth', 'bass', 'ambient'],
    bpm: 72,
    difficulty: 'beginner',
    tags: ['ballad', 'emotional', 'piano', 'rain'],
    likes: 423,
    playCount: 2845,
    remixCount: 25,
    commentCount: 67,
    createdAt: new Date(2025, 10, 14, 1, 15),
    postedAtMidnight: true,
    isRemix: false,
  },
  {
    id: 'pattern-004',
    title: '새벽 러닝 플레이리스트',
    description: 'K-POP 느낌 나는 에너제틱한 비트! 달리면서 듣기 좋아요.',
    strudelCode: patternTemplates[0].strudelCode,
    creatorId: 'user-music-004',
    creatorName: 'Morning Runner',
    creatorAvatar: '🏃',
    mood: 'kpop',
    listeningContext: ['alone'],
    instruments: ['drums', 'synth'],
    bpm: 140,
    difficulty: 'intermediate',
    tags: ['kpop', 'energetic', 'workout', 'synth'],
    likes: 678,
    playCount: 4521,
    remixCount: 35,
    commentCount: 103,
    createdAt: new Date(2025, 10, 12, 6, 30),
    isRemix: false,
  },
  {
    id: 'pattern-005',
    title: '카페에서 듣는 재즈 힙합',
    description: '친구들이랑 수다 떨면서 듣기 좋은 재즈 힙합 비트. 새벽 3시의 비트를 리믹스했어요!',
    strudelCode: `${patternTemplates[3].strudelCode}
  .slow(1.2)
  .room(0.8)`,
    creatorId: 'user-music-005',
    creatorName: 'Jazz Lover',
    creatorAvatar: '🎷',
    mood: 'retro',
    listeningContext: ['at-cafe', 'with-friends'],
    instruments: ['drums', 'bass', 'ambient'],
    bpm: 95,
    difficulty: 'intermediate',
    tags: ['jazz', 'hiphop', 'cafe', 'chill'],
    likes: 345,
    playCount: 1876,
    remixCount: 12,
    commentCount: 34,
    createdAt: new Date(2025, 10, 16, 19, 40),
    originalPatternId: 'pattern-001',
    isRemix: true,
  },
  {
    id: 'pattern-006',
    title: '심야 작업 BGM',
    description: '코딩하거나 작업할 때 집중력 높여주는 앰비언트 비트. 반복적이지만 질리지 않아요.',
    strudelCode: `// Ambient Work BGM
note("<c3 eb3 g3>*2")
  .s("pad")
  .slow(4)
  .lpf(sine.range(400, 1200))
  .stack(
    sound("bd ~ ~ ~").gain(0.3),
    sound("~ ~ hh ~").gain(0.2)
  )`,
    creatorId: 'user-music-006',
    creatorName: 'Code Master',
    creatorAvatar: '💻',
    mood: 'retro',
    listeningContext: ['alone'],
    instruments: ['ambient', 'drums'],
    bpm: 60,
    difficulty: 'advanced',
    tags: ['ambient', 'focus', 'work', 'minimal'],
    likes: 456,
    playCount: 3214,
    remixCount: 8,
    commentCount: 52,
    createdAt: new Date(2025, 10, 11, 2, 50),
    postedAtMidnight: true,
    isRemix: false,
  },
];

export const mockMusicCreators: MusicCreator[] = [
  {
    userId: 'user-music-002',
    userName: 'DJ Neon',
    avatar: '💫',
    patternCount: 28,
    totalLikes: 5420,
    totalPlays: 34521,
    badges: [
      availableMusicBadges[0],
      availableMusicBadges[1],
      availableMusicBadges[2],
      availableMusicBadges[3],
    ],
    level: 8,
    rank: 1,
  },
  {
    userId: 'user-music-004',
    userName: 'Morning Runner',
    avatar: '🏃',
    patternCount: 22,
    totalLikes: 3845,
    totalPlays: 28453,
    badges: [availableMusicBadges[0], availableMusicBadges[2]],
    level: 7,
    rank: 2,
  },
  {
    userId: 'user-music-001',
    userName: 'Midnight Producer',
    avatar: '🌙',
    patternCount: 19,
    totalLikes: 3124,
    totalPlays: 21453,
    badges: [availableMusicBadges[0], availableMusicBadges[4]],
    level: 6,
    rank: 3,
  },
];

export const mockSoundSamples: SoundSample[] = [
  {
    id: 'sample-kick-001',
    name: '808 Kick',
    category: 'drums',
    audioUrl: '/samples/808-kick.wav',
    duration: '0:01',
    tags: ['kick', '808', 'bass'],
    usageCount: 1245,
  },
  {
    id: 'sample-snare-001',
    name: 'Crisp Snare',
    category: 'drums',
    audioUrl: '/samples/crisp-snare.wav',
    duration: '0:01',
    tags: ['snare', 'crispy', 'tight'],
    usageCount: 987,
  },
  {
    id: 'sample-synth-001',
    name: 'Warm Pad',
    category: 'synth',
    audioUrl: '/samples/warm-pad.wav',
    bpm: 120,
    key: 'C',
    duration: '4:00',
    tags: ['pad', 'ambient', 'warm'],
    usageCount: 654,
  },
  {
    id: 'sample-bass-001',
    name: 'Deep Bass',
    category: 'bass',
    audioUrl: '/samples/deep-bass.wav',
    bpm: 128,
    key: 'A',
    duration: '2:00',
    tags: ['bass', 'deep', 'sub'],
    usageCount: 823,
  },
];
