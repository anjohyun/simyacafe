import { Event, EventStage } from '../types/event';

const getRandomMoodDistribution = () => ({
  creative: Math.floor(Math.random() * 30),
  social: Math.floor(Math.random() * 30),
  relaxed: Math.floor(Math.random() * 30),
  energetic: Math.floor(Math.random() * 30),
  contemplative: Math.floor(Math.random() * 30),
});

const generateMockAttendees = (count: number) => {
  const moods = ['creative', 'social', 'relaxed', 'energetic', 'contemplative'] as const;
  return Array.from({ length: count }, (_, i) => ({
    id: `attendee-${i}`,
    name: `참가자 ${i + 1}`,
    avatar: ['🌙', '⭐', '🌟', '✨', '💫', '🌈'][Math.floor(Math.random() * 6)],
    mood: moods[Math.floor(Math.random() * moods.length)]
  }));
};

export const mockEvents: Event[] = [
  // 1차 - Pet & Hobby meetups (Green)
  {
    id: 'evt-001',
    title: '🐾 심야 반려동물 집사 모임',
    stage: '1차' as EventStage,
    date: new Date(2025, 10, 20, 22, 0),
    startTime: '22:00',
    endTime: '24:00',
    location: '연결실 라운지',
    host: 'DJ Luna',
    description: '밤에 활동적인 반려동물과 함께 사는 집사들의 모임입니다. 밤샘 산책 팁, 야행성 반려동물 이야기를 나눠요.',
    currentAttendees: 12,
    maxCapacity: 15,
    attendees: generateMockAttendees(12),
    moodDistribution: getRandomMoodDistribution(),
  },
  {
    id: 'evt-002',
    title: '📚 심야 독서 클럽',
    stage: '1차' as EventStage,
    date: new Date(2025, 10, 22, 23, 0),
    startTime: '23:00',
    endTime: '01:00',
    location: '온라인 (Discord)',
    host: 'Book Owl',
    description: '밤에 책 읽기를 좋아하는 사람들의 모임. 이번 주제: 미스터리 소설',
    currentAttendees: 8,
    maxCapacity: 12,
    attendees: generateMockAttendees(8),
    moodDistribution: getRandomMoodDistribution(),
  },
  {
    id: 'evt-003',
    title: '🎮 레트로 게임의 밤',
    stage: '1차' as EventStage,
    date: new Date(2025, 10, 25, 21, 0),
    startTime: '21:00',
    endTime: '02:00',
    location: '게임 라운지',
    host: 'Pixel Master',
    description: '8비트, 16비트 시대의 추억의 게임들을 함께 즐겨요',
    currentAttendees: 15,
    maxCapacity: 20,
    attendees: generateMockAttendees(15),
    moodDistribution: getRandomMoodDistribution(),
  },

  // 2차 - Content creation workshops (Blue)
  {
    id: 'evt-004',
    title: '🎙️ 팟캐스트 제작 워크샵',
    stage: '2차' as EventStage,
    date: new Date(2025, 10, 21, 20, 0),
    startTime: '20:00',
    endTime: '23:00',
    location: '스튜디오 A',
    host: 'Voice Pro',
    description: '팟캐스트 기획부터 녹음, 편집까지 함께 배워요. 실제 에피소드를 만들어봅니다.',
    currentAttendees: 7,
    maxCapacity: 10,
    attendees: generateMockAttendees(7),
    moodDistribution: getRandomMoodDistribution(),
    requiresVipCode: true,
  },
  {
    id: 'evt-005',
    title: '📸 심야 사진 워크샵',
    stage: '2차' as EventStage,
    date: new Date(2025, 10, 23, 22, 0),
    startTime: '22:00',
    endTime: '03:00',
    location: '야외 촬영 (홍대 일대)',
    host: 'Night Shooter',
    description: '밤 풍경 사진 촬영 기법을 배우고 실습합니다. 카메라 또는 스마트폰 필수',
    currentAttendees: 9,
    maxCapacity: 12,
    attendees: generateMockAttendees(9),
    moodDistribution: getRandomMoodDistribution(),
    requiresVipCode: true,
  },
  {
    id: 'evt-006',
    title: '✍️ 글쓰기 워크샵: 밤의 이야기',
    stage: '2차' as EventStage,
    date: new Date(2025, 10, 27, 21, 30),
    startTime: '21:30',
    endTime: '00:30',
    location: '연결실 라이팅룸',
    host: 'Wordsmith',
    description: '밤에 떠오르는 이야기들을 글로 풀어내는 워크샵. 단편 소설, 에세이 환영',
    currentAttendees: 6,
    maxCapacity: 10,
    attendees: generateMockAttendees(6),
    moodDistribution: getRandomMoodDistribution(),
    requiresVipCode: true,
  },

  // 3차 - Late-night cafe open run (Pink)
  {
    id: 'evt-007',
    title: '🌙 심야 카페 오픈런',
    stage: '3차' as EventStage,
    date: new Date(2025, 10, 28, 23, 0),
    startTime: '23:00',
    endTime: '05:00',
    location: '연결실 카페',
    host: 'Night Curator',
    description: '매주 목요일 심야 카페 오픈런! DJ 세트, 즉흥 공연, 네트워킹',
    currentAttendees: 28,
    maxCapacity: 40,
    attendees: generateMockAttendees(28),
    moodDistribution: getRandomMoodDistribution(),
  },
  {
    id: 'evt-008',
    title: '🎵 Live DJ Night',
    stage: '3차' as EventStage,
    date: new Date(2025, 10, 30, 22, 0),
    startTime: '22:00',
    endTime: '04:00',
    location: '연결실 메인홀',
    host: 'DJ Midnight',
    description: '테크노와 하우스가 어우러진 특별한 밤. 2차 참가자 우선 입장',
    currentAttendees: 35,
    maxCapacity: 50,
    attendees: generateMockAttendees(35),
    moodDistribution: getRandomMoodDistribution(),
  },
];

// Helper function to get events by date
export const getEventsByDate = (date: Date): Event[] => {
  return mockEvents.filter(event =>
    event.date.getFullYear() === date.getFullYear() &&
    event.date.getMonth() === date.getMonth() &&
    event.date.getDate() === date.getDate()
  );
};

// Helper function to get events by stage
export const getEventsByStage = (stage: EventStage): Event[] => {
  return mockEvents.filter(event => event.stage === stage);
};
