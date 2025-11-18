export type BookMood = 'kpop' | 'ballad' | 'graffiti' | 'retro';
export type DrinkingPreference = 'with-alcohol' | 'non-alcohol' | 'both';
export type ReadingTime = 'evening' | 'late-night' | 'anytime';
export type NightType = 'with-drink' | 'quiet-night' | 'with-friends' | 'alone-time';

export interface BookAuthor {
  name: string;
  avatar?: string;
  userId: string;
  moodProfile?: BookMood;
}

export interface Book {
  id: string;
  isbn?: string;
  title: string;
  author: string;
  publisher: string;
  coverImage: string;
  coverColors?: {
    primary: string;
    secondary: string;
    gradient: string;
  };
}

export interface BookCard {
  id: string;
  book: Book;
  recommender: BookAuthor;

  // Personal story section
  whyRecommend: string;
  movingQuote: string;
  moodTags: BookMood[];
  nightType: NightType;
  drinkingPreference: DrinkingPreference;
  readingTime: ReadingTime;

  // AI-generated content
  aiSummary?: string;
  aiKeywords?: string[];
  recommendedFor?: string;
  matchingMusicGenre?: string;

  // Voice memo
  voiceMemoUrl?: string;
  voiceMemoDuration?: number;

  // Social engagement
  likes: number;
  commentCount: number;
  bookmarkCount: number;
  shareCount: number;

  // Metadata
  createdAt: Date;
  postedAtMidnight?: boolean;
}

export interface BookComment {
  id: string;
  bookCardId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: Date;
  replies?: BookComment[];
}

export interface BookFilter {
  mood?: BookMood[];
  drinkingPreference?: DrinkingPreference;
  readingTime?: ReadingTime;
  sortBy?: 'recent' | 'popular' | 'compatible';
}

export interface UserBookBadge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt?: Date;
}

export interface BookCurator {
  userId: string;
  userName: string;
  avatar: string;
  bookCount: number;
  totalLikes: number;
  badges: UserBookBadge[];
  rank?: number;
}

export interface CreateBookForm {
  // Book info
  isbn?: string;
  title: string;
  author: string;
  publisher: string;
  coverImage: File | string;

  // Personal story
  whyRecommend: string;
  movingQuote: string;
  moodTags: BookMood[];
  nightType: NightType;
  drinkingPreference: DrinkingPreference;
  readingTime: ReadingTime;

  // Optional voice memo
  voiceMemo?: Blob;
}
