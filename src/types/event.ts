export type EventStage = '1차' | '2차' | '3차';

export interface MoodDistribution {
  'K-POP Major': number;
  'Ballad & R&B': number;
  'Graffiti + Club': number;
  '90s Retro': number;
}

export interface EventAttendee {
  id: string;
  name: string;
  mood: string;
  avatar: string; // emoji for now
}

export interface Event {
  id: string;
  title: string;
  stage: EventStage;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  host: string;
  description: string;
  currentAttendees: number;
  maxCapacity: number;
  attendees: EventAttendee[];
  moodDistribution: MoodDistribution;
  requiresVIP?: boolean;
  tags: string[];
}

export interface EventBooking {
  eventId: string;
  name: string;
  contact: string;
  expectations?: string;
  vipCode?: string;
}

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: '🐕 반려견 산책 모임',
    stage: '1차',
    date: new Date(2025, 10, 20, 15, 0), // Nov 20, 2025, 3:00 PM
    startTime: '15:00',
    endTime: '17:00',
    location: '한강공원 뚝섬유원지',
    host: '펫러버즈',
    description: '강아지와 함께하는 산책 모임입니다. 펫 매너를 지켜주세요!',
    currentAttendees: 8,
    maxCapacity: 12,
    attendees: [
      { id: '1', name: '지민', mood: 'K-POP Major', avatar: '👩' },
      { id: '2', name: '수현', mood: 'Ballad & R&B', avatar: '🧑' },
    ],
    moodDistribution: {
      'K-POP Major': 30,
      'Ballad & R&B': 40,
      'Graffiti + Club': 10,
      '90s Retro': 20,
    },
    tags: ['반려동물', '야외활동', '힐링'],
  },
  {
    id: '2',
    title: '🎬 단편영화 제작 워크샵',
    stage: '2차',
    date: new Date(2025, 10, 22, 19, 0), // Nov 22, 2025, 7:00 PM
    startTime: '19:00',
    endTime: '22:00',
    location: '홍대 스튜디오 A',
    host: 'DJ MOON',
    description: '함께 단편영화를 만들어봅니다. 기획부터 촬영까지!',
    currentAttendees: 5,
    maxCapacity: 8,
    attendees: [
      { id: '3', name: '민수', mood: 'Graffiti + Club', avatar: '👨' },
      { id: '4', name: '혜진', mood: '90s Retro', avatar: '👩' },
    ],
    moodDistribution: {
      'K-POP Major': 20,
      'Ballad & R&B': 20,
      'Graffiti + Club': 40,
      '90s Retro': 20,
    },
    requiresVIP: true,
    tags: ['영상제작', '창작', '협업'],
  },
  {
    id: '3',
    title: '🌙 심야 카페 오픈런',
    stage: '3차',
    date: new Date(2025, 10, 28, 23, 0), // Nov 28, 2025, 11:00 PM
    startTime: '23:00',
    endTime: '02:00',
    location: '연결실 카페 (홍대)',
    host: '연결실 운영진',
    description: '심야 카페에서 DJ 공연과 함께하는 특별한 밤',
    currentAttendees: 27,
    maxCapacity: 30,
    attendees: [
      { id: '5', name: '태양', mood: 'K-POP Major', avatar: '🧑' },
      { id: '6', name: '별', mood: 'Graffiti + Club', avatar: '👩' },
    ],
    moodDistribution: {
      'K-POP Major': 35,
      'Ballad & R&B': 15,
      'Graffiti + Club': 35,
      '90s Retro': 15,
    },
    requiresVIP: true,
    tags: ['DJ공연', '심야', '네트워킹'],
  },
  {
    id: '4',
    title: '📚 심야 독서 클럽',
    stage: '1차',
    date: new Date(2025, 10, 25, 21, 0), // Nov 25, 2025, 9:00 PM
    startTime: '21:00',
    endTime: '23:00',
    location: '연남동 북카페',
    host: '책벌레들',
    description: '이달의 책을 함께 읽고 토론합니다.',
    currentAttendees: 6,
    maxCapacity: 10,
    attendees: [],
    moodDistribution: {
      'K-POP Major': 10,
      'Ballad & R&B': 60,
      'Graffiti + Club': 10,
      '90s Retro': 20,
    },
    tags: ['독서', '토론', '힐링'],
  },
  {
    id: '5',
    title: '🎨 그라피티 아트 체험',
    stage: '1차',
    date: new Date(2025, 10, 23, 14, 0), // Nov 23, 2025, 2:00 PM
    startTime: '14:00',
    endTime: '18:00',
    location: '합정 아트 스튜디오',
    host: '스프레이킹',
    description: '실제 벽에 그라피티를 그려보는 체험',
    currentAttendees: 10,
    maxCapacity: 15,
    attendees: [],
    moodDistribution: {
      'K-POP Major': 20,
      'Ballad & R&B': 10,
      'Graffiti + Club': 50,
      '90s Retro': 20,
    },
    tags: ['아트', '체험', '창작'],
  },
];
