// Firebase Timestamp type (compatible with Date)
type Timestamp = Date;

// ========== Multi-dimensional Taste Profile ==========

export interface UserTasteProfile {
  uid: string;

  // Multi-dimensional preferences
  preferences: {
    // 1. Content Categories (분야)
    categories: {
      music: { weight: number; subgenres: string[] };
      books: { weight: number; subgenres: string[] };
      visualArts: { weight: number; subgenres: string[] };
      food: { weight: number; subgenres: string[] };
    };

    // 2. Activity Preferences (활동 선호)
    activities: {
      music: string[]; // ['감상', '공연관람', '작곡', '플레이리스트제작', '노래부르기']
      books: string[]; // ['독서', '북토크', '필사', '서평작성', '작가교류']
      visualArts: string[]; // ['관람', '작품구매', '직접제작', '전시기획']
      food: string[]; // ['요리', '시식', '페어링', '리뷰작성']
    };

    // 3. Aesthetic Preferences (미학적 선호)
    aesthetics: {
      colors: string[]; // ['#FF1B8D', '#00FFC6', '#1A1A1A']
      tones: string[]; // ['따뜻한', '차가운', '중성적']
      moods: string[]; // ['몽환적', '강렬한', '차분한', '활기찬']
      eras: string[]; // ['90년대', '2000년대', '빈티지', '모던']
      trendSensitivity: number; // 0-100, 최신 트렌드 민감도
    };

    // 4. Social Preferences (사회적 선호)
    social: {
      groupSize: 'solo' | 'pair' | 'small' | 'party';
      alcoholPreference: 'yes' | 'no' | 'occasional';
      timeSlots: string[]; // ['evening', 'night', 'latenight', 'dawn']
      spacePreference: string[]; // ['window', 'corner', 'bar', 'terrace']
    };
  };

  // Mood Vector (from quiz)
  moodVector: {
    energy: number; // 0-100
    intimacy: number; // 0-100
    creativity: number; // 0-100
    nostalgia: number; // 0-100
    depth: number; // 0-100
    openness: number; // 0-100
  };

  // Behavioral Data (귀납적 학습용)
  behaviorHistory: {
    likedContent: string[]; // content IDs
    createdContent: string[]; // content IDs
    attendedEvents: string[]; // event IDs
    votingPatterns: MoodVote[]; // 무드 투표 기록
    visitFrequency: {
      total: number;
      lastVisit: Timestamp | Date;
      averageStayDuration: number; // minutes
    };
  };

  // ML-generated insights (optional, for v2)
  computedInsights?: {
    primaryPersona: string; // "심야 독서러", "레이브 키드" 등
    compatibleUsers: string[]; // similar user IDs
    recommendedContent: string[]; // content IDs
    lastUpdated: Timestamp | Date;
  };
}

// ========== Content Item ==========

export interface ContentItem {
  id: string;
  type: 'book' | 'music' | 'visualArt' | 'food' | 'venue';

  // Basic info
  title: string;
  creator: string; // author/artist/chef
  creatorUid: string; // who uploaded this
  coverImage: string;

  // Categorization
  category: string; // '소설', 'K-POP', '회화', '와인'
  subgenre: string[]; // ['추리', '심리스릴러']
  tags: string[]; // user-generated
  moodTags: string[]; // auto-generated from content

  // User's personal story
  story: {
    whyRecommend: string; // rich text
    keyQuote?: string; // for books
    emotionalImpact: string; // '위로', '설렘', '통찰'
    bestNightFor: string[]; // ['혼자', '술과함께', '비오는날']
  };

  // Multimedia
  voiceMemo?: string; // audio URL
  images?: string[]; // additional photos
  videoClip?: string; // for performances

  // Engagement
  likes: number;
  comments: number;
  remixes: number; // for music
  bookmarks: number;

  // Metadata
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  visibility: 'public' | 'followers' | 'private';
}

// ========== Points System ==========

export interface PointsTransaction {
  uid: string;
  type: 'online' | 'offline';
  action: string;
  points: number;
  timestamp: Timestamp | Date;
  metadata: {
    // Online actions
    contentId?: string; // what they interacted with
    voteType?: string; // mood vote
    curationType?: string; // playlist, night package

    // Offline actions
    visitId?: string; // cafe check-in ID
    eventId?: string; // event participation
    spaceRental?: string; // '방송실', '녹음부스'
    fbPurchase?: number; // F&B amount spent
  };
}

export const POINTS_CONFIG = {
  online: {
    moodQuizComplete: 100,
    contentUpload: 50,
    firstVoiceMemo: 30,
    dailyVote: 10,
    commentReceived: 5,
    likeReceived: 2,
    createNightPackage: 100,
    packageBooked: 20,
  },
  offline: {
    firstVisit: 200,
    eventParticipation: 150,
    spaceRentalPerHour: 50,
    fbSpendPer1000Won: 10,
    djSlotFilled: 500,
    curatorOfTheMonth: 1000,
  },
} as const;

// ========== Mood Vote ==========

export interface MoodVote {
  userId: string;
  contentId: string;
  mood: string;
  timestamp: Timestamp | Date;
}

// ========== Quiz Result ==========

export interface QuizResult {
  moodVector: {
    energy: number;
    intimacy: number;
    creativity: number;
    nostalgia: number;
    depth: number;
    openness: number;
  };
  selections: CategorySelection[];
  timestamp: Date;
  primaryPersona?: string;
}

export interface CategorySelection {
  categoryId: string;
  categoryTitle: string;
  categoryIcon: string;
  selections: {
    option: {
      id: string;
      emoji: string;
      title: string;
      subtitle?: string | null;
      description: string;
      tags: string[];
      moodScore: {
        energy: number;
        intimacy: number;
        creativity: number;
        nostalgia: number;
        depth: number;
        openness: number;
      };
    };
    order: number;
    weight: number;
  }[];
}
