export interface MoodScore {
  energy: number;      // 에너지 레벨 (조용함 ←→ 활발함)
  intimacy: number;    // 친밀도 (공적 ←→ 사적)
  creativity: number;  // 창의성 (전통적 ←→ 실험적)
  nostalgia: number;   // 시간성 (현대적 ←→ 복고적)
}

export interface MusicGenre {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  artists: string[];
  color: string;
  moodScore: MoodScore;
}

export const musicGenres: MusicGenre[] = [
  {
    id: 'kpop',
    emoji: '🎤',
    title: '에너지 폭발',
    subtitle: 'K-POP & Major Pop',
    description: '화려한 비주얼과 중독성 있는 비트',
    tags: ['에너지넘치는', '트렌디한', '밝은', '군중의열기'],
    artists: ['BTS', '블랙핑크', '아리아나 그란데'],
    color: '#FF1B8D',
    moodScore: { energy: 95, intimacy: 40, creativity: 60, nostalgia: 30 }
  },
  {
    id: 'ballad',
    emoji: '🎵',
    title: '감성 충만',
    subtitle: 'K-Ballad & Soul',
    description: '깊은 감정과 서정적인 멜로디',
    tags: ['감성적인', '진심어린', '울컥하는', '위로되는'],
    artists: ['백예린', '이무진', '폴킴'],
    color: '#8B5CF6',
    moodScore: { energy: 35, intimacy: 85, creativity: 45, nostalgia: 60 }
  },
  {
    id: 'rnb',
    emoji: '✨',
    title: '부드러운 그루브',
    subtitle: 'R&B & Neo-Soul',
    description: '매끄러운 보컬과 세련된 비트',
    tags: ['세련된', '감각적인', '도시적인', '섹시한'],
    artists: ['SZA', 'The Weeknd', '딘'],
    color: '#00FFC6',
    moodScore: { energy: 55, intimacy: 70, creativity: 65, nostalgia: 40 }
  },
  {
    id: 'jazz',
    emoji: '🎷',
    title: '재즈의 밤',
    subtitle: 'Jazz & Lounge',
    description: '즉흥연주와 우아한 분위기',
    tags: ['세련된', '지적인', '여유로운', '고급스러운'],
    artists: ['Chet Baker', 'Norah Jones', '나윤선'],
    color: '#FFE400',
    moodScore: { energy: 40, intimacy: 60, creativity: 80, nostalgia: 75 }
  },
  {
    id: 'indie',
    emoji: '🎸',
    title: '자유로운 영혼',
    subtitle: 'Indie & Alternative',
    description: '독립적이고 실험적인 사운드',
    tags: ['개성있는', '자유로운', '감각적인', '대안적인'],
    artists: ['잔나비', 'Arctic Monkeys', '김사월'],
    color: '#EC4899',
    moodScore: { energy: 65, intimacy: 55, creativity: 90, nostalgia: 50 }
  },
  {
    id: 'hiphop',
    emoji: '🎧',
    title: '리듬 앤 플로우',
    subtitle: 'Hip-Hop & Rap',
    description: '강렬한 비트와 메시지',
    tags: ['힙한', '카리스마', '자신감', '도전적인'],
    artists: ['Jay Park', 'Kendrick Lamar', '에픽하이'],
    color: '#F59E0B',
    moodScore: { energy: 85, intimacy: 45, creativity: 75, nostalgia: 35 }
  },
  {
    id: 'electronic',
    emoji: '🌈',
    title: '일렉트로닉 웨이브',
    subtitle: 'EDM & Electronic',
    description: '신디사이저와 디지털 비트',
    tags: ['미래적인', '몽환적인', '강렬한', '춤추고싶은'],
    artists: ['Calvin Harris', 'ODESZA', 'Peggy Gou'],
    color: '#06B6D4',
    moodScore: { energy: 90, intimacy: 30, creativity: 85, nostalgia: 25 }
  },
  {
    id: 'rock',
    emoji: '🤘',
    title: '록의 정석',
    subtitle: 'Rock & Punk',
    description: '기타 리프와 파워풀한 드럼',
    tags: ['강렬한', '반항적인', '열정적인', '거친'],
    artists: ['Foo Fighters', '너바나', '국카스텐'],
    color: '#EF4444',
    moodScore: { energy: 95, intimacy: 50, creativity: 70, nostalgia: 65 }
  },
  {
    id: 'citypop',
    emoji: '🌃',
    title: '도시의 밤',
    subtitle: 'City Pop & Synth',
    description: '80년대 감성의 신스팝',
    tags: ['복고적인', '낭만적인', '도시적인', '감각적인'],
    artists: ['Yubin', 'Mariya Takeuchi', '선우정아'],
    color: '#A855F7',
    moodScore: { energy: 60, intimacy: 65, creativity: 70, nostalgia: 90 }
  },
  {
    id: 'acoustic',
    emoji: '🪕',
    title: '어쿠스틱 감성',
    subtitle: 'Acoustic & Folk',
    description: '잔잔한 기타와 따뜻한 목소리',
    tags: ['따뜻한', '편안한', '자연스러운', '순수한'],
    artists: ['Ed Sheeran', '10cm', '정승환'],
    color: '#84CC16',
    moodScore: { energy: 30, intimacy: 80, creativity: 55, nostalgia: 55 }
  },
  {
    id: 'classical',
    emoji: '🎻',
    title: '클래식의 품격',
    subtitle: 'Classical & Orchestra',
    description: '오케스트라와 실내악',
    tags: ['우아한', '감동적인', '고전적인', '장엄한'],
    artists: ['Ludovico Einaudi', '윤이상', '조수미'],
    color: '#6366F1',
    moodScore: { energy: 45, intimacy: 50, creativity: 75, nostalgia: 85 }
  },
  {
    id: 'ost',
    emoji: '🎬',
    title: '영화 속 감동',
    subtitle: 'OST & Soundtrack',
    description: '영화와 드라마의 명곡들',
    tags: ['감동적인', '영화같은', '드라마틱한', '추억의'],
    artists: ['라라랜드', '인터스텔라', '도깨비 OST'],
    color: '#14B8A6',
    moodScore: { energy: 50, intimacy: 70, creativity: 65, nostalgia: 70 }
  }
];
